"""
Transacción cruzada entre motores de Bosque Cinema.

Evento de negocio: DEVOLUCIÓN DE UNA VENTA POR QUEJA.
Cuando un espectador se queja y el cine le devuelve el dinero, la misma
operación debe cambiar los dos motores:

  - PostgreSQL (Neon):  la venta pasa a ANULADA con el procedimiento
                        sp_anular_venta del Avance 1 (devuelve el valor).
  - MongoDB (Atlas):    se crea el reporte de la queja en reportes_incidentes,
                        con la compensación (REEMBOLSO) y el seguimiento.

No existe una transacción ACID que abarque los dos motores, así que se usa
este orden (transacción con compensación):

  1. PostgreSQL: se abre la transacción, se bloquea la venta (FOR UPDATE),
     se validan las reglas y se anula la venta SIN confirmar todavía.
  2. MongoDB:    se inserta el reporte de la queja (con reintentos por si
     Atlas está cambiando de nodo primario).
       - Si MongoDB falla  -> ROLLBACK en PostgreSQL. No cambia nada.
  3. PostgreSQL: COMMIT.
       - Si el COMMIT falla -> se borra en MongoDB el reporte insertado
                               (compensación). No cambia nada.

Así los dos motores quedan iguales: o los dos cambian o ninguno cambia.

Uso:
  python transaccion_cruzada.py 31 3 "La función empezó 20 minutos tarde"
       (id_venta, id_staff que atiende la queja, motivo)
  python transaccion_cruzada.py 31 3 "..." --simular-fallo-mongo
  python transaccion_cruzada.py 31 3 "..." --simular-fallo-postgres
"""

import datetime
import re
import sys
import time
from decimal import Decimal

import psycopg2
from pymongo.errors import AutoReconnect, DuplicateKeyError, PyMongoError

from casos_uso import NoEncontrado, ParametroInvalido, validar_id
from conexiones import conectar_mongo, conectar_postgres

ZONA_BOGOTA = datetime.timezone(datetime.timedelta(hours=-5))
CARGOS_QUE_ATIENDEN = ("TAQUILLERO", "ADMINISTRADOR")
REINTENTOS_MONGO = 3          # intentos si Atlas está haciendo failover
ESPERA_REINTENTO_SEG = 2      # 2 s, 4 s, ... entre intentos


# ---------------------------------------------------------------- errores

class ReglaNegocio(Exception):
    """La operación no cumple una regla del negocio (por ejemplo, venta ya anulada). HTTP 409."""


class FalloTransaccion(Exception):
    """Un motor falló y la operación se deshizo en los dos. HTTP 503."""


class Inconsistencia(Exception):
    """Un motor falló y la compensación también falló: hay que revisar a mano. HTTP 500."""


class SimulacionFallo(Exception):
    """Falla provocada a propósito para demostrar el ROLLBACK y la compensación."""


# ------------------------------------------------------------ PostgreSQL

def deshacer(conn):
    """ROLLBACK seguro: si la conexión ya se cayó, no hay nada que deshacer."""
    if conn is not None and not conn.closed:
        try:
            conn.rollback()
        except psycopg2.Error:
            pass


def anular_venta_postgres(cur, id_venta, id_staff):
    """
    Bloquea la venta, valida las reglas y la anula con sp_anular_venta.
    No hace COMMIT: eso se decide después de escribir en MongoDB.
    """
    cur.execute(
        """
        SELECT v.id_venta, v.id_espectador, v.estado, v.cantidad, v.precio_unitario,
               f.id_funcion, f.titulo_pelicula, f.id_sala
        FROM ventas v
        JOIN funciones f ON f.id_funcion = v.id_funcion
        WHERE v.id_venta = %s
        FOR UPDATE OF v
        """,
        (id_venta,),
    )
    fila = cur.fetchone()
    if fila is None:
        raise NoEncontrado(f"No existe la venta {id_venta} en PostgreSQL.")
    venta = dict(zip([c[0] for c in cur.description], fila))
    if venta["estado"] != "PAGADA":
        raise ReglaNegocio(f"La venta {id_venta} ya está {venta['estado']}; no se puede devolver dos veces.")

    cur.execute("SELECT cargo, activo FROM staff WHERE id_staff = %s", (id_staff,))
    staff = cur.fetchone()
    if staff is None:
        raise NoEncontrado(f"No existe el staff {id_staff} en PostgreSQL.")
    cargo, activo = staff
    if not activo:
        raise ReglaNegocio(f"El staff {id_staff} está inactivo.")
    if cargo not in CARGOS_QUE_ATIENDEN:
        raise ReglaNegocio(f"El staff {id_staff} es {cargo}; solo taquilleros o administradores hacen devoluciones.")

    # Procedimiento del Avance 1: cambia la venta a ANULADA y devuelve el valor.
    cur.execute("CALL sp_anular_venta(%s, NULL)", (id_venta,))
    valor = cur.fetchone()[0]
    venta["valor_devuelto"] = int(valor) if Decimal(valor) == Decimal(valor).to_integral_value() else float(valor)
    return venta


# ---------------------------------------------------------------- MongoDB

def siguiente_codigo(coleccion, anio):
    """Siguiente código INC-AAAA-NNN según el último que exista en la colección."""
    ultimo = coleccion.find_one(
        {"codigo": {"$regex": f"^INC-{anio}-"}}, {"codigo": 1}, sort=[("codigo", -1)]
    )
    numero = int(re.search(r"(\d+)$", ultimo["codigo"]).group(1)) + 1 if ultimo else 1
    return f"INC-{anio}-{numero:03d}"


def armar_reporte(venta, id_staff, motivo, ahora):
    """Documento de la queja con la misma estructura de reportes_incidentes (Avance 2)."""
    return {
        "tipo_incidente": "QUEJA_SERVICIO",
        "fecha_hora": ahora,
        "id_funcion": venta["id_funcion"],
        "id_sala": venta["id_sala"],
        "id_staff_reporta": id_staff,
        "prioridad": "MEDIA",
        "estado": "CERRADO",
        "descripcion": f"Devolución de la venta {venta['id_venta']} ({venta['titulo_pelicula']}) por queja del espectador.",
        "detalle": {
            "area": "TAQUILLA",
            "motivo": motivo,
            "id_espectador": venta["id_espectador"],
            "id_venta": venta["id_venta"],
            "compensacion": {"tipo": "REEMBOLSO", "valor": venta["valor_devuelto"]},
        },
        "seguimiento": [{
            "fecha": ahora,
            "id_staff": id_staff,
            "accion": f"Se anula la venta {venta['id_venta']} en PostgreSQL y se devuelven ${venta['valor_devuelto']}",
        }],
    }


def insertar_reporte_mongo(coleccion, reporte, anio):
    """
    Inserta el reporte. Si Atlas está cambiando de primario (AutoReconnect)
    reintenta con espera; si el código ya existe, toma el siguiente.
    """
    for intento in range(1, REINTENTOS_MONGO + 1):
        try:
            reporte["codigo"] = siguiente_codigo(coleccion, anio)
            coleccion.insert_one(reporte)
            return reporte
        except DuplicateKeyError:
            reporte.pop("_id", None)            # otro proceso tomó el código: se pide el siguiente
        except AutoReconnect:
            reporte.pop("_id", None)
            if intento == REINTENTOS_MONGO:
                raise
            time.sleep(ESPERA_REINTENTO_SEG * intento)
    raise FalloTransaccion("No se pudo asignar un código único al reporte en MongoDB.")


# ------------------------------------------------- transacción cruzada

def devolver_venta(id_venta, id_staff, motivo, simular=None):
    """
    Anula la venta en PostgreSQL y crea la queja con el reembolso en MongoDB,
    como una sola operación. Devuelve un diccionario listo para JSON.

    simular: None, "mongo" o "postgres" (solo para la demo del ROLLBACK y la compensación).
    """
    id_venta = validar_id(id_venta, "id_venta")
    id_staff = validar_id(id_staff, "id_staff")
    motivo = (motivo or "").strip()
    if len(motivo) < 5:
        raise ParametroInvalido("El motivo de la queja debe tener al menos 5 caracteres.")

    conn = None
    cliente = None
    insertado = None
    try:
        conn = conectar_postgres()            # psycopg2 abre la transacción sola (sin autocommit)
        cliente, db = conectar_mongo()
        incidentes = db["reportes_incidentes"]
        ahora = datetime.datetime.now(ZONA_BOGOTA).replace(microsecond=0)

        # 1) PostgreSQL: anular sin confirmar.
        with conn.cursor() as cur:
            venta = anular_venta_postgres(cur, id_venta, id_staff)

        # 2) MongoDB: crear la queja. Si falla, se hace ROLLBACK en PostgreSQL.
        reporte = armar_reporte(venta, id_staff, motivo, ahora)
        if simular == "mongo":
            # Valor de tipo texto: el $jsonSchema de la colección lo rechaza (falla real de Atlas).
            reporte["detalle"]["compensacion"]["valor"] = "dieciocho mil"
        try:
            insertado = insertar_reporte_mongo(incidentes, reporte, ahora.year)
        except PyMongoError as error:
            deshacer(conn)
            raise FalloTransaccion(
                f"MongoDB rechazó el reporte ({error}). Se hizo ROLLBACK: la venta {id_venta} sigue PAGADA."
            )

        # 3) PostgreSQL: confirmar. Si falla, se borra lo insertado en MongoDB (compensación).
        try:
            if simular == "postgres":
                raise SimulacionFallo("falla simulada de PostgreSQL justo antes del COMMIT")
            conn.commit()
        except (psycopg2.Error, SimulacionFallo) as error:
            deshacer(conn)
            try:
                incidentes.delete_one({"_id": insertado["_id"]})
            except PyMongoError as error_compensacion:
                raise Inconsistencia(
                    f"PostgreSQL falló ({error}) y no se pudo borrar el reporte {insertado['codigo']} "
                    f"en MongoDB ({error_compensacion}). Revisar a mano."
                )
            raise FalloTransaccion(
                f"PostgreSQL no confirmó la anulación ({error}). Se hizo ROLLBACK y se borró el reporte "
                f"{insertado['codigo']} de MongoDB (compensación): los dos motores quedan como estaban."
            )

        return {
            "transaccion": "Devolución de una venta por queja",
            "postgresql": {"id_venta": id_venta, "estado": "ANULADA", "valor_devuelto": venta["valor_devuelto"]},
            "mongodb": {
                "coleccion": "reportes_incidentes",
                "codigo": insertado["codigo"],
                "tipo_incidente": "QUEJA_SERVICIO",
                "compensacion": insertado["detalle"]["compensacion"],
            },
            "fecha": ahora.isoformat(),
        }
    except (psycopg2.Error, PyMongoError) as error:
        # Falla antes de escribir en MongoDB (conexión o validación en PostgreSQL).
        deshacer(conn)
        raise FalloTransaccion(f"No se completó la devolución; no se cambió nada en ningún motor ({error}).")
    except (ParametroInvalido, NoEncontrado, ReglaNegocio):
        deshacer(conn)
        raise
    finally:
        if conn is not None:
            conn.close()
        if cliente is not None:
            cliente.close()


# ------------------------------------------------------------- terminal

def main(argv):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass
    simular = None
    if "--simular-fallo-mongo" in argv:
        simular = "mongo"
    elif "--simular-fallo-postgres" in argv:
        simular = "postgres"
    args = [a for a in argv if not a.startswith("--")]
    if len(args) < 3:
        print(__doc__)
        return 1

    id_venta, id_staff, motivo = args[0], args[1], " ".join(args[2:])
    print(f"Devolución de la venta {id_venta} (staff {id_staff}): {motivo}")
    if simular:
        print(f"[DEMO] Se va a simular una falla en {simular.upper()}.")
    try:
        r = devolver_venta(id_venta, id_staff, motivo, simular)
    except ParametroInvalido as e:
        print(f"Dato inválido: {e}")
        return 2
    except NoEncontrado as e:
        print(f"No encontrado: {e}")
        return 3
    except ReglaNegocio as e:
        print(f"Regla de negocio: {e}")
        return 4
    except FalloTransaccion as e:
        print(f"Transacción deshecha: {e}")
        return 5
    except Inconsistencia as e:
        print(f"INCONSISTENCIA: {e}")
        return 6
    except RuntimeError as e:  # .env incompleto (config.validar_config)
        print(f"Error de configuración: {e}")
        return 7

    print("Transacción completada en los dos motores:")
    print(f"  [PostgreSQL] venta {r['postgresql']['id_venta']} -> {r['postgresql']['estado']} "
          f"· valor devuelto ${r['postgresql']['valor_devuelto']}")
    print(f"  [MongoDB]    {r['mongodb']['codigo']} en reportes_incidentes · "
          f"{r['mongodb']['tipo_incidente']} · compensación {r['mongodb']['compensacion']}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
