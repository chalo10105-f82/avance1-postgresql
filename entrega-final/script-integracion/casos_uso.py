"""
Casos de uso de integración de Bosque Cinema.

Cada caso de uso consulta PostgreSQL (Neon) y MongoDB (Atlas) y combina la
información usando los identificadores compartidos entre los dos motores
(id_funcion, id_sala, id_venta, id_espectador, id_staff y titulo_pelicula).

  1. funcion_completa(conn, db, id_funcion)
     Una función con su sala, ventas y ocupación (PostgreSQL), y con sus
     requisitos técnicos, sus reseñas y sus incidentes (MongoDB).
  2. pelicula_con_requisitos(conn, db, id_pelicula)
     La ficha técnica de una película (MongoDB), sus funciones y ventas
     (PostgreSQL), los requisitos técnicos de cada función (MongoDB) y el
     nombre del personal asignado (PostgreSQL).
  3. ventas_vs_incidentes_por_sala(conn, db, id_sala=None)
     Cruce de las ventas de cada sala (PostgreSQL) con sus incidentes
     (MongoDB).
  4. historial_espectador(conn, db, id_espectador)
     Las compras de un espectador (PostgreSQL), cada una con su reseña y su
     queja, si existen (MongoDB).

Todas las funciones solo leen datos y devuelven un diccionario listo para
convertir a JSON, así que la API (módulo de exposición) puede usarlas
directamente. Errores que lanzan:
  - ParametroInvalido: el dato de entrada no es válido      (HTTP 400)
  - NoEncontrado:      el registro no existe en la base       (HTTP 404)
  - psycopg2.Error / pymongo.errors.PyMongoError: falla de conexión o
    de consulta en uno de los motores                         (HTTP 503)
"""

import datetime
from decimal import Decimal

from conexiones import conectar_postgres, conectar_mongo


# ---------------------------------------------------------------- errores

class ParametroInvalido(ValueError):
    """El dato de entrada no es válido (por ejemplo, un id negativo)."""


class NoEncontrado(LookupError):
    """El registro pedido no existe en la base de datos."""


# ------------------------------------------------------------ utilidades

def validar_id(valor, nombre):
    """Convierte el id a entero positivo o lanza ParametroInvalido."""
    if isinstance(valor, bool):
        raise ParametroInvalido(f"{nombre} debe ser un número entero positivo.")
    try:
        numero = int(str(valor).strip())
    except (TypeError, ValueError):
        raise ParametroInvalido(f"{nombre} debe ser un número entero positivo; se recibió '{valor}'.")
    if numero <= 0:
        raise ParametroInvalido(f"{nombre} debe ser mayor que cero; se recibió {numero}.")
    return numero


def a_json(valor):
    """Convierte fechas, Decimal y ObjectId a tipos que se pueden pasar a JSON."""
    if isinstance(valor, dict):
        return {k: a_json(v) for k, v in valor.items() if k != "_id"}
    if isinstance(valor, (list, tuple)):
        return [a_json(v) for v in valor]
    if isinstance(valor, (datetime.datetime, datetime.date)):
        return valor.isoformat(timespec="minutes") if isinstance(valor, datetime.datetime) else valor.isoformat()
    if isinstance(valor, Decimal):
        return int(valor) if valor == valor.to_integral_value() else float(valor)
    return valor


def filas(cur, sql, params=None):
    """Ejecuta una consulta y devuelve las filas como diccionarios."""
    cur.execute(sql, params)
    columnas = [c[0] for c in cur.description]
    return [dict(zip(columnas, fila)) for fila in cur.fetchall()]


def porcentaje(parte, total):
    return round(100 * float(parte) / float(total), 1) if total else 0.0


def promedio(valores):
    valores = [v for v in valores if v is not None]
    return round(sum(valores) / len(valores), 2) if valores else None


def nombres_staff(cur, ids):
    """Devuelve {id_staff: 'Nombre Apellido (CARGO)'} para los ids pedidos."""
    ids = sorted({i for i in ids if i is not None})
    if not ids:
        return {}
    resultado = filas(
        cur,
        "SELECT id_staff, nombres || ' ' || apellidos AS nombre, cargo "
        "FROM staff WHERE id_staff = ANY(%s)",
        (ids,),
    )
    return {r["id_staff"]: f"{r['nombre']} ({r['cargo']})" for r in resultado}


# Ventas pagadas por función: boletas, ingresos y número de ventas.
SQL_VENTAS_FUNCION = """
    SELECT f.id_funcion,
           COALESCE(SUM(v.cantidad) FILTER (WHERE v.estado = 'PAGADA'), 0)                     AS boletas_vendidas,
           COALESCE(SUM(v.cantidad * v.precio_unitario) FILTER (WHERE v.estado = 'PAGADA'), 0) AS ingresos,
           COUNT(v.id_venta) FILTER (WHERE v.estado = 'PAGADA')                                AS ventas_pagadas,
           COUNT(v.id_venta) FILTER (WHERE v.estado = 'ANULADA')                               AS ventas_anuladas
    FROM funciones f
    LEFT JOIN ventas v ON v.id_funcion = f.id_funcion
"""


# ------------------------------------------------- caso de uso 1: función

def funcion_completa(conn, db, id_funcion):
    """Función con sala, ventas y ocupación (PostgreSQL) + requisitos, reseñas e incidentes (MongoDB)."""
    id_funcion = validar_id(id_funcion, "id_funcion")

    # 1) PostgreSQL: la función, su sala, su director y sus ventas.
    with conn.cursor() as cur:
        datos = filas(
            cur,
            """
            SELECT f.id_funcion, f.titulo_pelicula, f.clasificacion, f.formato, f.version_idioma,
                   f.fecha_hora_inicio, f.fecha_hora_fin, f.estado,
                   s.id_sala, s.nombre AS sala, s.tipo_sala, s.capacidad,
                   ad.nombres || ' ' || ad.apellidos AS director
            FROM funciones f
            JOIN salas s ON s.id_sala = f.id_sala
            JOIN actores_directores ad ON ad.id_actor_director = f.id_actor_director
            WHERE f.id_funcion = %s
            """,
            (id_funcion,),
        )
        if not datos:
            raise NoEncontrado(f"No existe la función {id_funcion} en PostgreSQL.")
        funcion = datos[0]
        ventas = filas(cur, SQL_VENTAS_FUNCION + " WHERE f.id_funcion = %s GROUP BY f.id_funcion", (id_funcion,))[0]

        # 2) MongoDB: requisitos técnicos y reseñas de la misma función (id_funcion).
        requisitos = db["requisitos_proyeccion"].find_one({"id_funcion": id_funcion})
        resenas = list(
            db["resenas_peliculas"]
            .find({"id_funcion": id_funcion, "estado": "PUBLICADA"},
                  {"_id": 0, "id_venta": 1, "id_espectador": 1, "calificacion": 1, "texto": 1,
                   "fecha_resena": 1, "respuesta_empresa": 1})
            .sort("fecha_resena", -1)
        )
        incidentes = list(
            db["reportes_incidentes"]
            .find({"id_funcion": id_funcion},
                  {"_id": 0, "codigo": 1, "tipo_incidente": 1, "prioridad": 1, "estado": 1,
                   "descripcion": 1, "fecha_hora": 1})
            .sort("fecha_hora", 1)
        )

        # 3) PostgreSQL otra vez: nombres del personal que MongoDB solo guarda por id_staff.
        personal = nombres_staff(cur, [p["id_staff"] for p in (requisitos or {}).get("personal_asignado", [])])

    boletas = int(ventas["boletas_vendidas"])
    return a_json({
        "caso_de_uso": "Función con sus requisitos técnicos, reseñas e incidentes",
        "funcion": funcion,
        "ventas_postgresql": {
            "boletas_vendidas": boletas,
            "ingresos": ventas["ingresos"],
            "ventas_pagadas": ventas["ventas_pagadas"],
            "ventas_anuladas": ventas["ventas_anuladas"],
            "ocupacion_pct": porcentaje(boletas, funcion["capacidad"]),
        },
        "requisitos_mongodb": None if requisitos is None else {
            "caracteristicas_especiales": requisitos.get("caracteristicas_especiales", []),
            "requisitos": requisitos.get("requisitos", []),
            "personal_asignado": [
                {"id_staff": p["id_staff"], "cargo": p.get("cargo"),
                 "nombre": personal.get(p["id_staff"], "(no existe en PostgreSQL)")}
                for p in requisitos.get("personal_asignado", [])
            ],
            "verificacion_aprobada": (requisitos.get("verificacion") or {}).get("aprobado"),
        },
        "resenas_mongodb": {
            "cantidad": len(resenas),
            "calificacion_promedio": promedio([r.get("calificacion") for r in resenas]),
            "resenas": resenas,
        },
        "incidentes_mongodb": incidentes,
    })


# ------------------------------------------------ caso de uso 2: película

def pelicula_con_requisitos(conn, db, id_pelicula):
    """Ficha (MongoDB) + funciones y ventas (PostgreSQL) + requisitos por función (MongoDB)."""
    id_pelicula = validar_id(id_pelicula, "id_pelicula")

    # 1) MongoDB: la ficha técnica de la película.
    ficha = db["fichas_tecnicas_peliculas"].find_one(
        {"id_pelicula": id_pelicula},
        {"_id": 0, "id_pelicula": 1, "titulo_pelicula": 1, "estado": 1, "genero": 1,
         "anio_estreno": 1, "pais_origen": 1, "idioma_original": 1, "versiones": 1, "sinopsis": 1},
    )
    if ficha is None:
        raise NoEncontrado(f"No existe la película {id_pelicula} en MongoDB (fichas_tecnicas_peliculas).")

    with conn.cursor() as cur:
        # 2) PostgreSQL: las funciones de esa película (se cruzan por titulo_pelicula) con sus ventas.
        funciones = filas(
            cur,
            """
            SELECT f.id_funcion, f.fecha_hora_inicio, f.formato, f.version_idioma, f.estado,
                   s.id_sala, s.nombre AS sala, s.capacidad,
                   vf.boletas_vendidas, vf.ingresos
            FROM funciones f
            JOIN salas s ON s.id_sala = f.id_sala
            JOIN (""" + SQL_VENTAS_FUNCION + """ GROUP BY f.id_funcion) vf ON vf.id_funcion = f.id_funcion
            WHERE f.titulo_pelicula = %s
            ORDER BY f.fecha_hora_inicio
            """,
            (ficha["titulo_pelicula"],),
        )

        # 3) MongoDB: los requisitos técnicos de esas funciones, en una sola consulta.
        ids_funciones = [f["id_funcion"] for f in funciones]
        requisitos = {
            r["id_funcion"]: r
            for r in db["requisitos_proyeccion"].find({"id_funcion": {"$in": ids_funciones}})
        } if ids_funciones else {}

        # 4) PostgreSQL: nombres del personal asignado en MongoDB.
        personal = nombres_staff(
            cur, [p["id_staff"] for r in requisitos.values() for p in r.get("personal_asignado", [])]
        )

    detalle = []
    for f in funciones:
        req = requisitos.get(f["id_funcion"])
        detalle.append({
            **f,
            "ocupacion_pct": porcentaje(f["boletas_vendidas"], f["capacidad"]),
            "requisitos_mongodb": None if req is None else {
                "caracteristicas_especiales": req.get("caracteristicas_especiales", []),
                "requisitos": [f"{r['categoria']}: {r['descripcion']}" for r in req.get("requisitos", [])],
                "personal_asignado": [personal.get(p["id_staff"], f"id_staff {p['id_staff']}")
                                      for p in req.get("personal_asignado", [])],
            },
        })

    return a_json({
        "caso_de_uso": "Película con sus funciones y requisitos técnicos",
        "ficha_mongodb": ficha,
        "resumen": {
            "funciones_programadas": len(funciones),
            "funciones_sin_requisitos": [f["id_funcion"] for f in funciones if f["id_funcion"] not in requisitos],
            "boletas_vendidas": sum(int(f["boletas_vendidas"]) for f in funciones),
            "ingresos": sum(f["ingresos"] for f in funciones),
        },
        "funciones": detalle,
    })


# ------------------------------------------ caso de uso 3: ventas vs incidentes

def ventas_vs_incidentes_por_sala(conn, db, id_sala=None):
    """Ventas por sala (PostgreSQL) cruzadas con los incidentes de cada sala (MongoDB)."""
    if id_sala is not None:
        id_sala = validar_id(id_sala, "id_sala")

    # 1) PostgreSQL: funciones, boletas, ingresos y ocupación promedio por sala.
    with conn.cursor() as cur:
        salas = filas(
            cur,
            """
            SELECT s.id_sala, s.nombre AS sala, s.tipo_sala, s.capacidad, s.estado,
                   COUNT(vf.id_funcion)                    AS funciones,
                   COALESCE(SUM(vf.boletas_vendidas), 0)   AS boletas_vendidas,
                   COALESCE(SUM(vf.ingresos), 0)           AS ingresos,
                   COALESCE(ROUND(AVG(100.0 * vf.boletas_vendidas / s.capacidad), 1), 0) AS ocupacion_promedio_pct
            FROM salas s
            LEFT JOIN funciones f ON f.id_sala = s.id_sala AND f.estado <> 'CANCELADA'
            LEFT JOIN (""" + SQL_VENTAS_FUNCION + """ GROUP BY f.id_funcion) vf ON vf.id_funcion = f.id_funcion
            WHERE (%s::int IS NULL OR s.id_sala = %s::int)
            GROUP BY s.id_sala, s.nombre, s.tipo_sala, s.capacidad, s.estado
            ORDER BY s.id_sala
            """,
            (id_sala, id_sala),
        )
    if id_sala is not None and not salas:
        raise NoEncontrado(f"No existe la sala {id_sala} en PostgreSQL.")

    # 2) MongoDB: incidentes agrupados por sala y tipo, con los minutos de interrupción.
    filtro = {"id_sala": id_sala} if id_sala is not None else {}
    grupos = db["reportes_incidentes"].aggregate([
        {"$match": filtro},
        {"$group": {
            "_id": {"id_sala": "$id_sala", "tipo": "$tipo_incidente"},
            "cantidad": {"$sum": 1},
            "abiertos": {"$sum": {"$cond": [{"$in": ["$estado", ["ABIERTO", "EN_PROCESO"]]}, 1, 0]}},
            "minutos_interrupcion": {"$sum": {"$ifNull": ["$detalle.minutos_interrupcion", 0]}},
        }},
        {"$sort": {"_id.id_sala": 1}},
    ])
    incidentes = {}
    for g in grupos:
        sala = incidentes.setdefault(g["_id"]["id_sala"], {"total": 0, "abiertos": 0, "minutos_interrupcion": 0, "por_tipo": {}})
        sala["total"] += g["cantidad"]
        sala["abiertos"] += g["abiertos"]
        sala["minutos_interrupcion"] += g["minutos_interrupcion"]
        sala["por_tipo"][g["_id"]["tipo"]] = g["cantidad"]

    # 3) Cruce: indicador de incidentes por cada 100 boletas vendidas.
    resultado = []
    for s in salas:
        inc = incidentes.get(s["id_sala"], {"total": 0, "abiertos": 0, "minutos_interrupcion": 0, "por_tipo": {}})
        boletas = int(s["boletas_vendidas"])
        resultado.append({
            **s,
            "incidentes_mongodb": inc,
            "incidentes_por_100_boletas": round(100 * inc["total"] / boletas, 1) if boletas else None,
        })
    resultado.sort(key=lambda r: (r["incidentes_por_100_boletas"] is None, -(r["incidentes_por_100_boletas"] or 0)))

    return a_json({
        "caso_de_uso": "Cruce de ventas con incidentes por sala",
        "salas": resultado,
        "sala_mas_critica": resultado[0]["sala"] if resultado and resultado[0]["incidentes_mongodb"]["total"] else None,
    })


# ------------------------------------------- caso de uso 4: espectador

def historial_espectador(conn, db, id_espectador):
    """Compras del espectador (PostgreSQL), cada una con su reseña y su queja (MongoDB)."""
    id_espectador = validar_id(id_espectador, "id_espectador")

    # 1) PostgreSQL: datos del espectador y sus compras.
    with conn.cursor() as cur:
        datos = filas(
            cur,
            "SELECT id_espectador, nombres || ' ' || apellidos AS nombre, correo, fecha_registro "
            "FROM espectadores WHERE id_espectador = %s",
            (id_espectador,),
        )
        if not datos:
            raise NoEncontrado(f"No existe el espectador {id_espectador} en PostgreSQL.")
        compras = filas(
            cur,
            """
            SELECT v.id_venta, v.fecha_venta, v.cantidad, v.precio_unitario,
                   v.cantidad * v.precio_unitario AS total, v.metodo_pago, v.estado,
                   f.id_funcion, f.titulo_pelicula, f.fecha_hora_inicio, s.nombre AS sala
            FROM ventas v
            JOIN funciones f ON f.id_funcion = v.id_funcion
            JOIN salas s ON s.id_sala = f.id_sala
            WHERE v.id_espectador = %s
            ORDER BY v.fecha_venta
            """,
            (id_espectador,),
        )

    # 2) MongoDB: sus reseñas y las quejas que lo mencionan.
    resenas = list(db["resenas_peliculas"].find(
        {"id_espectador": id_espectador},
        {"_id": 0, "id_venta": 1, "titulo_pelicula": 1, "calificacion": 1, "texto": 1, "estado": 1, "fecha_resena": 1},
    ))
    quejas = list(db["reportes_incidentes"].find(
        {"tipo_incidente": "QUEJA_SERVICIO", "detalle.id_espectador": id_espectador},
        {"_id": 0, "codigo": 1, "fecha_hora": 1, "estado": 1, "descripcion": 1, "detalle": 1},
    ))

    # 3) Cruce por id_venta: cada compra con su reseña y su queja.
    resena_por_venta = {r["id_venta"]: r for r in resenas}
    queja_por_venta = {q["detalle"].get("id_venta"): q for q in quejas if q["detalle"].get("id_venta")}
    for c in compras:
        c["resena_mongodb"] = resena_por_venta.get(c["id_venta"])
        c["queja_mongodb"] = queja_por_venta.get(c["id_venta"])

    ids_ventas = {c["id_venta"] for c in compras}
    return a_json({
        "caso_de_uso": "Historial del espectador con sus reseñas y quejas",
        "espectador": datos[0],
        "resumen": {
            "compras": len(compras),
            "boletas": sum(c["cantidad"] for c in compras if c["estado"] == "PAGADA"),
            "total_pagado": sum(c["total"] for c in compras if c["estado"] == "PAGADA"),
            "resenas": len(resenas),
            "calificacion_promedio": promedio([r.get("calificacion") for r in resenas]),
            "quejas": len(quejas),
        },
        "compras": compras,
        "quejas_sin_venta_asociada": [q for q in quejas if q["detalle"].get("id_venta") not in ids_ventas],
    })


# ------------------------------------------------------------ conexión

CASOS = {
    "funcion": funcion_completa,
    "pelicula": pelicula_con_requisitos,
    "salas": ventas_vs_incidentes_por_sala,
    "espectador": historial_espectador,
}


def ejecutar(nombre, *args):
    """Abre las dos conexiones, ejecuta un caso de uso y las cierra siempre."""
    if nombre not in CASOS:
        raise ParametroInvalido(f"Caso de uso desconocido: '{nombre}'. Opciones: {', '.join(CASOS)}.")
    conn = None
    cliente = None
    try:
        conn = conectar_postgres()
        cliente, db = conectar_mongo()
        return CASOS[nombre](conn, db, *args)
    finally:
        if conn is not None:
            conn.close()
        if cliente is not None:
            cliente.close()
