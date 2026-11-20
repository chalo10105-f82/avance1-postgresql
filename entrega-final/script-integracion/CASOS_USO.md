# Casos de uso de integración

Responsable: María Juliana Sánchez Zarate

Los casos de uso usan la conexión de `conexiones.py` (PostgreSQL en Neon y MongoDB en Atlas) y cruzan la información de los dos motores con los identificadores compartidos del diseño del Avance 2.

| # | Caso de uso | PostgreSQL aporta | MongoDB aporta | Se cruzan por |
|---|---|---|---|---|
| 1 | Función con sus requisitos técnicos, reseñas e incidentes | Función, sala, director, boletas vendidas, ingresos y ocupación; nombres del personal | Requisitos de proyección, personal asignado, reseñas publicadas e incidentes de la función | `id_funcion`, `id_staff` |
| 2 | Película con sus funciones y requisitos técnicos | Funciones de la película, sala, ventas y ocupación; nombres del personal | Ficha técnica y requisitos de cada función | `titulo_pelicula`, `id_funcion`, `id_staff` |
| 3 | Cruce de ventas con incidentes por sala | Funciones, boletas, ingresos y ocupación promedio por sala | Incidentes por sala y tipo, abiertos y minutos de interrupción | `id_sala` |
| 4 | Historial del espectador con sus reseñas y quejas | Datos del espectador y sus compras | Reseñas del espectador y quejas que lo mencionan | `id_espectador`, `id_venta` |

El caso 3 calcula un indicador que ninguno de los dos motores tiene por separado: **incidentes por cada 100 boletas vendidas**, para saber qué sala tiene más problemas en proporción a su público.

## Flujo de cada consulta

1. Se abren las dos conexiones (`conectar_postgres()` y `conectar_mongo()`).
2. Se consulta el motor que tiene el dato de partida. Si el registro no existe, se responde "no encontrado" sin consultar el otro motor.
3. Con los identificadores obtenidos se consulta el otro motor. Cuando hay varios ids se usa una sola consulta (`$in` en MongoDB, `ANY(%s)` en PostgreSQL), no una por id.
4. Se combinan los resultados en Python y se cierran las dos conexiones, también cuando hay un error.

Las consultas son de solo lectura y usan parámetros (`%s`), nunca texto concatenado, para evitar inyección SQL.

## Ejecución

```
pip install -r requirements.txt
python ejecutar_casos_uso.py todos              # los 4 casos con valores de ejemplo
python ejecutar_casos_uso.py funcion 5
python ejecutar_casos_uso.py pelicula 1
python ejecutar_casos_uso.py salas              # todas las salas (o: salas 4)
python ejecutar_casos_uso.py espectador 21
python ejecutar_casos_uso.py funcion 5 --json   # respuesta completa en JSON
```

Valores recomendados para la demo: la función 5 (dos reseñas dicen que se cortó el sonido y MongoDB tiene el incidente INC-2026-002 de esa función) y el espectador 21 (su reseña de 2/5 dice que la sala estaba sucia y tiene la queja INC-2026-015 sobre la misma venta).

## Uso desde la API

Cada caso de uso es una función de `casos_uso.py` que recibe la conexión de PostgreSQL, la base de MongoDB y el id, y devuelve un diccionario listo para JSON. También se puede usar `ejecutar("funcion", 5)`, que abre y cierra las conexiones.

| Error | Cuándo ocurre | Código HTTP sugerido |
|---|---|---|
| `ParametroInvalido` | El id no es un entero positivo (`abc`, `-3`, `0`) o el caso no existe | 400 |
| `NoEncontrado` | La función, película, sala o espectador no existe | 404 |
| `psycopg2.Error` | Falla la conexión o la consulta en PostgreSQL | 503 |
| `pymongo.errors.PyMongoError` | Falla la conexión o la consulta en MongoDB | 503 |
| `RuntimeError` | Falta una variable en el archivo `.env` | 500 |
