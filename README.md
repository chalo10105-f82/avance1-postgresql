# Bosque Cinema · Bases de Datos 2 · Grupo 4

Proyecto de la asignatura **Bases de Datos 2** (Universidad El Bosque). Sistema de información de una cadena de cine construido en tres fases con **persistencia políglota**: PostgreSQL para lo transaccional y MongoDB para lo documental, integrados con un módulo en Python.

## Empresa de cine: Bosque Cinema

Bosque Cinema es una cadena de cine con cinco salas que llevan nombres de árboles: **Roble, Cedro, Guayacán, Ceiba y Sauce**. Ofrece funciones en formatos 2D, 3D y VIP, dobladas o subtituladas. El sistema gestiona la programación de funciones, la venta de boletas con control de la capacidad de cada sala, los espectadores, el personal y sus contratos, y además las fichas técnicas de las películas, los requisitos de proyección, las reseñas del público y los reportes de incidentes.

## Grupo 4

- Gonzalo Alberto Ayala Almeciga
- David Felipe Millan Castañeda
- María Juliana Sánchez Zarate
- Julián David Aguilera Parraga

Docente: Francisco Rafael Barguil Vanegas.

## Estructura del repositorio

```
avance1-postgresql/
├── scripts/                      Fase 1 · PostgreSQL (01 a 05 y pruebas de evidencias)
├── modelo-ER/                    Fase 1 · modelo entidad-relación
├── modelo-relacional/            Fase 1 · modelo relacional en 3FN
├── evidencias/                   Fase 1 · evidencias del Avance 1 y de sus correcciones
├── avance2-mongodb/              Fase 2 · MongoDB
│   ├── diseno/                   diseño de las 4 colecciones (embebido vs referenciado)
│   ├── diagrama-arquitectura-poliglota/
│   ├── scripts/                  01_creacion_colecciones.js, 02_datos_prueba.js, 03_consultas.js
│   ├── teoria/                   justificación ACID, BASE y CAP
│   └── evidencias/
└── entrega-final/                Fase 3 · integración funcional
    ├── script-integracion/       conexiones, casos de uso y transacción cruzada (Python)
    ├── modulo-api/               API FastAPI, página de demostración y colección Postman
    ├── evidencias/
    ├── informe-final-consolidado.pdf
    └── portafolio-individual/    reflexión individual de cada integrante
```

## Fase 1 · Núcleo relacional en PostgreSQL (Avance 1)

Base `bosque_cinema` en **PostgreSQL (Neon)**: 8 tablas (salas, funciones, ventas, espectadores, staff, contratos, tipos_boleta y actores_directores), 8 índices, 8 triggers, 4 procedimientos almacenados y consultas analíticas.

**Ejecución:** en el SQL Editor de Neon (o con `psql`), sobre una base vacía, ejecutar en orden:

```
scripts/01_creacion_tablas.sql      tablas, restricciones e índices
scripts/02_datos_prueba.sql         datos de prueba (se puede volver a ejecutar)
scripts/03_triggers.sql             8 triggers de reglas de negocio
scripts/04_procedimientos.sql       4 procedimientos almacenados
scripts/05_consultas.sql            consultas analíticas
scripts/pruebas_evidencias_avance1.sql   pruebas de triggers (cada una en BEGIN/ROLLBACK) y llamadas a los procedimientos
```

## Fase 2 · Capa documental en MongoDB (Avance 2)

Base `bosque_cinema` en **MongoDB Atlas** (cluster BosqueCinemaCluster): 4 colecciones con `$jsonSchema` (fichas_tecnicas_peliculas, requisitos_proyeccion, resenas_peliculas y reportes_incidentes), con al menos 30 documentos cada una y conectadas a PostgreSQL por identificadores compartidos (`id_funcion`, `id_sala`, `id_venta`, `id_espectador`, `id_staff`, `titulo_pelicula`).

**Ejecución:** con `mongosh` conectado al cluster de Atlas (o desde la shell de MongoDB Compass), en orden:

```
mongosh "<cadena de conexión de Atlas>" --file avance2-mongodb/scripts/01_creacion_colecciones.js
mongosh "<cadena de conexión de Atlas>" --file avance2-mongodb/scripts/02_datos_prueba.js
mongosh "<cadena de conexión de Atlas>" --file avance2-mongodb/scripts/03_consultas.js
```

## Fase 3 · Integración funcional (Entrega final)

Módulo en **Python** conectado al mismo tiempo a PostgreSQL y MongoDB: 4 casos de uso de integración, una transacción cruzada entre motores (devolución de una venta por queja, con ROLLBACK y compensación) y una API REST con página de demostración y colección de Postman, con manejo de errores.

**Requisitos:** Python 3.10 o superior (probado con 3.13) y acceso a internet. En MongoDB Atlas, la IP del equipo debe estar autorizada en *Network Access*.

**1. Configurar las conexiones.** En `entrega-final/script-integracion/`, copiar `.env.example` como `.env` y completar:

```
POSTGRES_URL=postgresql://<usuario>:<contraseña>@<host de Neon>/bosque_cinema?sslmode=require
MONGO_URL=mongodb+srv://<usuario>:<contraseña>@<cluster de Atlas>/
MONGO_DB=bosque_cinema
```

El archivo `.env` contiene contraseñas y **no se sube al repositorio** (está en `.gitignore`).

**2. Script de integración, casos de uso y transacción cruzada:**

```
cd entrega-final/script-integracion
pip install -r requirements.txt
python main.py                                   # prueba las dos conexiones al mismo tiempo
python ejecutar_casos_uso.py todos               # los 4 casos de uso
python ejecutar_casos_uso.py funcion 5           # también: pelicula 1, salas, espectador 21
python transaccion_cruzada.py 32 3 "La función empezó 20 minutos tarde"
```

La transacción cruzada modifica datos reales: la venta queda anulada y no se puede devolver otra vez. Para probar sin cambiar datos se usan `--simular-fallo-mongo` y `--simular-fallo-postgres`.

**3. API y página de demostración:**

```
cd entrega-final/modulo-api
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Abrir **http://localhost:8000** (página de demostración) o **http://localhost:8000/docs** (documentación de la API). La colección de Postman está en `entrega-final/modulo-api/postman/`.

## Documentación

- Informe final consolidado: [`entrega-final/informe-final-consolidado.pdf`](entrega-final/informe-final-consolidado.pdf)
- Casos de uso: [`entrega-final/script-integracion/CASOS_USO.md`](entrega-final/script-integracion/CASOS_USO.md)
- Transacción cruzada: [`entrega-final/script-integracion/TRANSACCION_CRUZADA.md`](entrega-final/script-integracion/TRANSACCION_CRUZADA.md)
- API: [`entrega-final/modulo-api/README.md`](entrega-final/modulo-api/README.md)
- Diseño de colecciones: [`avance2-mongodb/diseno/diseno_colecciones.md`](avance2-mongodb/diseno/diseno_colecciones.md)
