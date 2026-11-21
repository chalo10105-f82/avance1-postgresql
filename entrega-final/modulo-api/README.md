# Módulo de exposición · Bosque Cinema

API REST (FastAPI) y página de demostración que **exponen el script de integración del equipo**
(`../script-integracion`). La API no repite lógica: llama a `casos_uso.py` y `transaccion_cruzada.py`,
que se conectan a **PostgreSQL (Neon)** y **MongoDB (Atlas)** con el `.env` de esa carpeta.

```
entrega-final/
├── script-integracion/     ← casos_uso.py, transaccion_cruzada.py, .env
└── modulo-api/             ← esta carpeta
    ├── app/                (main.py = rutas, errores.py = manejo de errores, integracion.py = puente)
    ├── static/index.html   (página de demo)
    ├── postman/            (colección con pruebas)
    └── requirements.txt
```

## Cómo ejecutarlo

```bash
cd entrega-final/modulo-api
python3 -m venv .venv && source .venv/bin/activate     # opcional pero recomendado
pip install -r requirements.txt
uvicorn app.main:app --reload
```

1. El archivo `.env` debe existir en `script-integracion/` (`POSTGRES_URL`, `MONGO_URL`, `MONGO_DB`). Es el mismo que ya usan los demás scripts.
2. Abrir **http://localhost:8000** (demo) o **http://localhost:8000/docs** (Swagger, para probar cada endpoint).
3. Si `script-integracion` está en otra ruta: `export SCRIPT_INTEGRACION=/ruta/a/script-integracion`.

## Endpoints

| Método y ruta | Qué hace | Función del script |
|---|---|---|
| `GET /salud` | Prueba PostgreSQL y MongoDB | — |
| `GET /funciones/{id}` | Caso 1: función + ventas (PG) + requisitos, reseñas, incidentes (Mongo) | `funcion_completa` |
| `GET /peliculas/{id}` | Caso 2: película + funciones (PG) + ficha y requisitos (Mongo) | `pelicula_con_requisitos` |
| `GET /salas/incidentes?id_sala=` | Caso 3: ventas vs incidentes por sala (sin `id_sala` = todas) | `ventas_vs_incidentes_por_sala` |
| `GET /espectadores/{id}/historial` | Caso 4: compras (PG) + reseñas y quejas (Mongo) | `historial_espectador` |
| `POST /ventas/{id}/devolucion` | Transacción cruzada: anula la venta (PG) y crea la queja con reembolso (Mongo) | `devolver_venta` |

Cuerpo del `POST`: `{"id_staff": 3, "motivo": "Pantalla sin imagen durante la función."}`.
Parámetro opcional `?simular=mongo` o `?simular=postgres` (solo demo): fuerza una falla para mostrar el ROLLBACK o la compensación.

## Manejo de errores

Todo error sale con el mismo formato y el código HTTP correcto, nunca con un traceback:

```json
{"error": {"codigo": "NO_ENCONTRADO", "mensaje": "No existe el staff 9999 en PostgreSQL.", "detalle": null}}
```

| HTTP | `codigo` | Cuándo |
|---|---|---|
| 400 | `PARAMETRO_INVALIDO` | id no numérico o ≤ 0, motivo de menos de 5 caracteres |
| 404 | `NO_ENCONTRADO` | la función, película, sala, espectador, venta o staff no existe |
| 404 / 405 | `RUTA_NO_ENCONTRADA` / `METODO_NO_PERMITIDO` | ruta o método equivocado |
| 409 | `REGLA_DE_NEGOCIO` | venta ya anulada, staff sin permiso, regla de un trigger |
| 422 | `DATOS_INVALIDOS` | cuerpo incompleto, tipo incorrecto, JSON mal formado, `simular` inválido |
| 500 | `CONFIGURACION_FALTANTE` | falta una variable del `.env` |
| 500 | `INCONSISTENCIA_ENTRE_MOTORES` | falló una compensación: hay que revisar a mano |
| 503 | `POSTGRES_NO_DISPONIBLE` / `MONGO_NO_DISPONIBLE` | un motor no responde |
| 503 | `TRANSACCION_REVERTIDA` | la devolución falló y se deshizo en ambos motores |

## Postman

Importar `postman/bosque_cinema_api.postman_collection.json` (variable `baseUrl` = `http://localhost:8000`).
Son 29 peticiones con pruebas automáticas (casos felices y de error). La carpeta 5 modifica datos y debe correrse en orden;
para repetirla hay que volver a cargar los datos de prueba (`02_datos_prueba.sql`).

## Guion para la sustentación (5 minutos)

1. `GET /salud` → los dos motores conectados.
2. Caso 1 con función **5** → mostrar qué viene de PostgreSQL y qué de MongoDB.
3. Caso 4 con espectador **21** → compras (PG) junto a su queja `INC-2026-015` (Mongo).
4. Error: `GET /funciones/9999` → 404 con JSON claro; `GET /funciones/abc` → 400.
5. Devolución de la venta **31** (staff 3) → 201 con los dos motores confirmados.
6. Repetir la misma → 409 (ya anulada).
7. Venta **32** con `simular=postgres` → 503, la venta sigue PAGADA y el reporte de Mongo se borró (compensación).
8. Venta **33** con `simular=mongo` → 503, ROLLBACK: la venta sigue PAGADA.
