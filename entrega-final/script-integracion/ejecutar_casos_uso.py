"""
Ejecuta los casos de uso de integración desde la terminal.

Uso:
  python ejecutar_casos_uso.py funcion 5        # caso 1: función con requisitos y reseñas
  python ejecutar_casos_uso.py pelicula 1       # caso 2: película con funciones y requisitos
  python ejecutar_casos_uso.py salas            # caso 3: ventas vs incidentes de todas las salas
  python ejecutar_casos_uso.py salas 4          #          ... o de una sola sala
  python ejecutar_casos_uso.py espectador 21    # caso 4: historial del espectador
  python ejecutar_casos_uso.py todos            # los 4 casos con valores de ejemplo

Agregue --json al final para ver la respuesta completa en JSON (la misma que
usaría la API).
"""

import json
import sys

import psycopg2
from pymongo.errors import PyMongoError

from casos_uso import ejecutar, ParametroInvalido, NoEncontrado

EJEMPLOS = [("funcion", 5), ("pelicula", 1), ("salas", None), ("espectador", 21)]


def pesos(valor):
    return f"${valor:,.0f}".replace(",", ".")


def linea(texto=""):
    print(texto)


def titulo(texto):
    linea()
    linea("=" * 78)
    linea(texto)
    linea("=" * 78)


def mostrar_funcion(r):
    f, v = r["funcion"], r["ventas_postgresql"]
    titulo(f"CASO 1 · Función {f['id_funcion']}: {f['titulo_pelicula']} (requisitos, reseñas e incidentes)")
    linea("[PostgreSQL] funcion, sala y ventas")
    linea(f"  {f['fecha_hora_inicio']} · {f['sala']} ({f['tipo_sala']}, capacidad {f['capacidad']}) · "
          f"{f['formato']} {f['version_idioma']} · {f['estado']}")
    linea(f"  Director: {f['director']}")
    linea(f"  Boletas vendidas: {v['boletas_vendidas']} de {f['capacidad']} ({v['ocupacion_pct']} %) · "
          f"Ingresos: {pesos(v['ingresos'])} · Ventas anuladas: {v['ventas_anuladas']}")
    req = r["requisitos_mongodb"]
    linea("[MongoDB] requisitos_proyeccion (id_funcion)")
    if req is None:
        linea("  Esta función no tiene requisitos registrados.")
    else:
        linea(f"  Características: {', '.join(req['caracteristicas_especiales'])} · "
              f"Verificación aprobada: {'sí' if req['verificacion_aprobada'] else 'no'}")
        for q in req["requisitos"]:
            linea(f"  - {q['categoria']}: {q['descripcion']}")
        linea("  Personal asignado (nombres traídos de PostgreSQL):")
        for p in req["personal_asignado"]:
            linea(f"    · id_staff {p['id_staff']}: {p['nombre']}")
    res = r["resenas_mongodb"]
    linea(f"[MongoDB] resenas_peliculas (id_funcion): {res['cantidad']} publicadas · "
          f"promedio {res['calificacion_promedio'] if res['calificacion_promedio'] is not None else '-'}")
    for x in res["resenas"]:
        linea(f"  {'★' * x['calificacion']}{'☆' * (5 - x['calificacion'])} venta {x['id_venta']}: {x['texto']}")
        if x.get("respuesta_empresa"):
            linea(f"      Respuesta del cine: {x['respuesta_empresa']['texto']}")
    inc = r["incidentes_mongodb"]
    linea(f"[MongoDB] reportes_incidentes (id_funcion): {len(inc)}")
    for x in inc:
        linea(f"  {x['codigo']} · {x['tipo_incidente']} · {x['prioridad']} · {x['estado']}: {x['descripcion']}")


def mostrar_pelicula(r):
    p, s = r["ficha_mongodb"], r["resumen"]
    titulo(f"CASO 2 · Película {p['id_pelicula']}: {p['titulo_pelicula']}")
    linea("[MongoDB] fichas_tecnicas_peliculas")
    linea(f"  {', '.join(p['genero'])} · {p['pais_origen']} {p['anio_estreno']} · {p['estado']}")
    linea("  Versiones: " + ", ".join(f"{x['formato']} {x['version_idioma']} ({x['duracion_min']} min)"
                                       for x in p.get("versiones", [])))
    linea(f"[PostgreSQL] funciones con el mismo titulo_pelicula: {s['funciones_programadas']} · "
          f"boletas {s['boletas_vendidas']} · ingresos {pesos(s['ingresos'])}")
    if not r["funciones"]:
        linea("  Esta película no tiene funciones en PostgreSQL (por ejemplo, un próximo estreno).")
    for f in r["funciones"]:
        linea(f"  Función {f['id_funcion']} · {f['fecha_hora_inicio']} · {f['sala']} · {f['formato']} "
              f"{f['version_idioma']} · {f['estado']} · ocupación {f['ocupacion_pct']} %")
        req = f["requisitos_mongodb"]
        if req is None:
            linea("    [MongoDB] sin requisitos registrados")
            continue
        linea(f"    [MongoDB] {', '.join(req['caracteristicas_especiales'])}")
        for q in req["requisitos"]:
            linea(f"      - {q}")
        linea(f"      Personal: {'; '.join(req['personal_asignado'])}")


def mostrar_salas(r):
    titulo("CASO 3 · Ventas (PostgreSQL) vs incidentes (MongoDB) por sala")
    linea(f"{'Sala':<16}{'Func.':>6}{'Boletas':>9}{'Ingresos':>13}{'Ocup.%':>8}"
          f"{'Incid.':>8}{'Abiert.':>8}{'Min.int.':>9}{'x100 bol.':>10}")
    for s in r["salas"]:
        i = s["incidentes_mongodb"]
        x100 = "-" if s["incidentes_por_100_boletas"] is None else s["incidentes_por_100_boletas"]
        linea(f"{s['sala'][:15]:<16}{s['funciones']:>6}{s['boletas_vendidas']:>9}{pesos(s['ingresos']):>13}"
              f"{float(s['ocupacion_promedio_pct']):>8.1f}{i['total']:>8}{i['abiertos']:>8}{i['minutos_interrupcion']:>9}{x100:>10}")
    linea()
    for s in r["salas"]:
        tipos = ", ".join(f"{k} {v}" for k, v in s["incidentes_mongodb"]["por_tipo"].items()) or "sin incidentes"
        linea(f"  {s['sala']}: {tipos}")
    if r["sala_mas_critica"]:
        linea(f"\nSala con más incidentes por cada 100 boletas vendidas: {r['sala_mas_critica']}")


def mostrar_espectador(r):
    e, s = r["espectador"], r["resumen"]
    titulo(f"CASO 4 · Espectador {e['id_espectador']}: {e['nombre']}")
    linea(f"[PostgreSQL] {s['compras']} compras · {s['boletas']} boletas · pagado {pesos(s['total_pagado'])}")
    linea(f"[MongoDB] {s['resenas']} reseñas (promedio {s['calificacion_promedio'] or '-'}) · {s['quejas']} queja(s)")
    for c in r["compras"]:
        linea(f"  Venta {c['id_venta']} · {c['fecha_venta']} · {c['titulo_pelicula']} · {c['sala']} · "
              f"{c['cantidad']} boleta(s) · {pesos(c['total'])} · {c['estado']}")
        if c["resena_mongodb"]:
            x = c["resena_mongodb"]
            linea(f"      Reseña ({x['estado']}): {x['calificacion']}/5 · {x['texto']}")
        if c["queja_mongodb"]:
            q = c["queja_mongodb"]
            linea(f"      Queja {q['codigo']} ({q['estado']}): {q['detalle'].get('motivo', q['descripcion'])}")
    for q in r["quejas_sin_venta_asociada"]:
        linea(f"  Queja sin venta asociada {q['codigo']} ({q['estado']}): {q['descripcion']}")


MOSTRAR = {"funcion": mostrar_funcion, "pelicula": mostrar_pelicula,
           "salas": mostrar_salas, "espectador": mostrar_espectador}


def correr(caso, valor, como_json):
    args = [] if valor is None else [valor]
    resultado = ejecutar(caso, *args)
    if como_json:
        print(json.dumps(resultado, ensure_ascii=False, indent=2))
    else:
        MOSTRAR[caso](resultado)


def main(argv):
    try:  # la consola de Windows a veces no muestra tildes ni estrellas
        sys.stdout.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass
    como_json = "--json" in argv
    argv = [a for a in argv if a != "--json"]
    if not argv or argv[0] in ("-h", "--help", "ayuda"):
        print(__doc__)
        return 0
    caso = argv[0]
    try:
        if caso == "todos":
            for nombre, valor in EJEMPLOS:
                correr(nombre, valor, como_json)
        else:
            if caso not in MOSTRAR:
                raise ParametroInvalido(f"Caso de uso desconocido: '{caso}'. Opciones: {', '.join(MOSTRAR)}, todos.")
            if caso != "salas" and len(argv) < 2:
                raise ParametroInvalido(f"Falta el id. Ejemplo: python ejecutar_casos_uso.py {caso} 5")
            correr(caso, argv[1] if len(argv) > 1 else None, como_json)
        return 0
    except ParametroInvalido as e:
        print(f"Dato inválido: {e}")
        return 2
    except NoEncontrado as e:
        print(f"No encontrado: {e}")
        return 3
    except psycopg2.Error as e:
        print(f"Error de PostgreSQL (Neon): {str(e).strip()}")
        return 4
    except PyMongoError as e:
        print(f"Error de MongoDB (Atlas): {e}")
        return 5
    except RuntimeError as e:  # .env incompleto (config.validar_config)
        print(f"Error de configuración: {e}")
        return 6


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
