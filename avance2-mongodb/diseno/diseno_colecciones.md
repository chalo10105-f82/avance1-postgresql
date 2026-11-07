# Diseño de colecciones — Avance 2 (MongoDB)

**Cine:** Bosque Cinema · **Base de datos MongoDB:** `bosque_cinema` · **Grupo de 5 integrantes**

Este documento define las 4 colecciones de la capa documental: sus campos, cómo se conectan con
PostgreSQL (Avance 1) y por qué cada dato va embebido o referenciado.

| Integrante | Responsabilidad | Dónde mirar |
| --- | --- | --- |
| **Juliana** | Diseño de las 4 colecciones (este documento), diagrama de arquitectura políglota y PDF final | Todo el documento |
| **David** | `01_creacion_colecciones.js` (`$jsonSchema` en las 4 e índices) y justificación ACID/BASE/CAP con caso de trade-off | Secciones 1, 6 y 7 |
| **Gonzalo** | Datos de `fichas_tecnicas_peliculas` y `requisitos_proyeccion` en `02_datos_prueba.js` | Secciones 1, 2, 3 y 8 |
| **Julián** | Datos de `resenas_peliculas` y `reportes_incidentes` en `02_datos_prueba.js` | Secciones 1, 4, 5 y 8 |
| **Juan** | Consultas en `03_consultas.js` | Sección 9 |

### Lo que no podemos repetir del Avance 1 (retroalimentación del profesor)

1. **Commits:** cada uno hace sus propios commits, desde su cuenta y en su rama, con mensajes descriptivos.
2. **Evidencias:** cada captura muestra el **comando ejecutado y su resultado juntos**, legible, recortada y
   igual al script que está en el repositorio. Enviar las capturas a Juliana a más tardar el **lunes 9**.
3. **Scripts limpios:** se ejecutan sin errores ni advertencias, desde una base vacía y también si se
   ejecutan dos veces.
4. **Índices:** incluirlos en el script 01 y mostrarlos en una captura.
5. **Resultados lógicos:** revisar que cada consulta dé un resultado que tenga sentido (orden, valores vacíos).

---

## 1. Criterio general

| Pregunta | Decisión |
| --- | --- |
| ¿Qué queda en PostgreSQL? | Lo transaccional y con reglas fuertes: salas, funciones, ventas, espectadores, staff, contratos, actores/directores. Necesita ACID (no vender dos veces la misma silla, no cobrar a medias). |
| ¿Qué va a MongoDB? | Información de estructura variable, texto libre o alto volumen que no participa en transacciones de dinero: fichas técnicas, requisitos de proyección, reseñas e incidentes. |
| ¿Cuándo **embebemos**? | Cuando el dato hijo no tiene sentido sin el padre, son pocos (decenas como máximo), casi siempre se leen juntos y casi no cambian. |
| ¿Cuándo **referenciamos**? | Cuando el dato tiene vida propia (se consulta solo), son muchos (cientos o miles), cambia seguido, o ya existe en PostgreSQL (fuente de verdad). Guardamos solo el identificador compartido. |

Para cada dato nos hicimos las dos preguntas vistas en clase (semana 12):
**¿Voy a usar este dato siempre junto al padre?** → si sí, embebido.
**¿Este dato cambia mucho o crece sin parar?** → si sí, aparte.

**Embeber también es una decisión de ACID:** MongoDB garantiza ACID a nivel de un solo documento. Lo que
debe actualizarse junto (por ejemplo, el estado de un incidente y su seguimiento) queda en el mismo
documento, y así se cambia en una sola operación atómica: o se hace completa o no se hace.

**No se copian en MongoDB datos que ya están en PostgreSQL** (nombres de espectadores, precios,
horarios). Solo se guarda el id. Así evitamos dos versiones distintas del mismo dato.

### Identificador de película

En PostgreSQL **no existe una tabla de películas**: el título está como texto en
`funciones.titulo_pelicula`. Por eso cada película se identifica con dos campos:

- `titulo_pelicula` → enlace actual con `funciones.titulo_pelicula` (debe escribirse **exactamente igual**, con tildes).
- `id_pelicula` → entero reservado para la futura tabla `peliculas` de la Entrega Final.

Esto responde a la retroalimentación del Avance 1: el profesor señaló una dependencia transitiva en
`funciones` (la clasificación depende del título) y sugirió separar la película en su propia tabla. El
`id_pelicula` deja lista esa corrección: cuando exista la tabla `peliculas`, las colecciones ya tienen
el identificador con el que se van a conectar.

### Tabla de referencia: las 16 películas con funciones en PostgreSQL

| id_pelicula | titulo_pelicula | Clasif. | Formato | Versión | id_actor_director | Duración (min) | id_funcion |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | La Ruta del Colibrí | T | 2D | DOBLADA | 3 | 95 | 1, 19 |
| 2 | Noche en Villa Esperanza | +15 | 2D | SUBTITULADA | 5 | 112 | 2 |
| 3 | Papá en Apuros | +7 | 2D | DOBLADA | 7 | 98 | 3, 20 |
| 4 | Galaxia Nómada | +7 | 3D | DOBLADA | 8 | 104 | 4, 30 |
| 5 | Océano Profundo | +12 | 3D | SUBTITULADA | 9 | 132 | 5, 22 |
| 6 | Aventuras en el Bosque Encantado | T | 3D | DOBLADA | 14 | 88 | 6, 31 |
| 7 | El Jardín de Cristal | +12 | 2D | SUBTITULADA | 2 | 121 | 7, 25 |
| 8 | Tormenta Roja | +18 | 2D | SUBTITULADA | 11 | 126 | 8, 24 |
| 9 | Código Aurora | +12 | 3D | SUBTITULADA | 10 | 115 | 9, 16 (cancelada), 26, 32 |
| 10 | Cenizas de Julio | +15 | 2D | SUBTITULADA | 6 | 109 | 10, 29 |
| 11 | El Silencio del Valle | +18 | 2D | SUBTITULADA | 4 | 117 | 11, 27 |
| 12 | Mi Abuela la Hechicera | T | 2D | DOBLADA | 15 | 92 | 12, 28 |
| 13 | Rumbo a Marte | +7 | 3D | DOBLADA | 12 | 110 | 13, 21 |
| 14 | Dragones del Alba | +7 | 3D | DOBLADA | 17 | 101 | 14, 23 |
| 15 | Duelo en la Frontera | +15 | 2D | SUBTITULADA | 13 | 128 | 15, 18 |
| 16 | Latidos | +12 | 2D | SUBTITULADA | 16 | 106 | 17 |

La duración sale de `fecha_hora_fin - fecha_hora_inicio` de cada función.
Los `id_pelicula` 17 a 30 se usan para **próximos estrenos** (películas sin funciones todavía).

---

## 2. Colección `fichas_tecnicas_peliculas`

**Contenido:** elenco, duración por versión, idiomas, subtítulos y clasificación por país.
**Por qué MongoDB:** cada película tiene una estructura distinta (unas tienen 2 versiones y otras 1,
unas se clasifican en 2 países y otras en 5, algunas tienen premios o saga). En PostgreSQL esto
obligaría a crear varias tablas auxiliares o columnas casi siempre vacías.
**Cantidad:** 30 documentos = 16 películas en cartelera + 14 próximos estrenos.

| Campo | Tipo | Oblig. | Embebido / Referenciado | Conexión con PostgreSQL |
| --- | --- | --- | --- | --- |
| `id_pelicula` | int | Sí | — | Identificador compartido (futura tabla `peliculas`) |
| `titulo_pelicula` | string | Sí | — | `funciones.titulo_pelicula` |
| `estado` | string: `EN_CARTELERA`, `PROXIMO_ESTRENO` | Sí | — | — |
| `genero` | array de string | Sí | Embebido | — |
| `sinopsis` | string | Sí | — | — |
| `anio_estreno` | int | Sí | — | — |
| `pais_origen` | string | Sí | — | — |
| `elenco` | array de objetos | Sí | **Embebido** | Cada `id_actor_director` → `actores_directores` |
| `elenco[].id_actor_director` | int | Sí | Referencia | `actores_directores.id_actor_director` |
| `elenco[].rol` | string: `DIRECTOR`, `PROTAGONISTA`, `REPARTO` | Sí | — | — |
| `elenco[].personaje` | string | No (no aplica a directores) | — | — |
| `elenco[].principal` | bool | Sí | — | `true` para quien está en `funciones.id_actor_director` |
| `versiones` | array de objetos | Sí | **Embebido** | Coincide con `funciones.formato` y `funciones.version_idioma` |
| `versiones[].formato` | string: `2D`, `3D` | Sí | — | — |
| `versiones[].version_idioma` | string: `DOBLADA`, `SUBTITULADA`, `ORIGINAL` | Sí | — | — |
| `versiones[].duracion_min` | int | Sí | — | — |
| `idioma_original` | string | Sí | — | — |
| `idiomas_audio` | array de string | Sí | Embebido | — |
| `subtitulos` | array de string | No | Embebido | — |
| `clasificacion_por_pais` | array de objetos `{pais, clasificacion}` | Sí | **Embebido** | La de Colombia debe coincidir con `funciones.clasificacion` |
| `premios` | array de string | No | Embebido | — |
| `saga` | objeto `{nombre, numero}` | No | Embebido | — |

**Justificación de embebido vs. referenciado**

- **`elenco` embebido:** se muestra siempre junto con la ficha, es una lista corta (5 a 10 personas) y el
  personaje solo tiene sentido dentro de esa película. Pero de cada persona se guarda **solo el id**,
  porque el nombre y la nacionalidad ya viven en `actores_directores` (PostgreSQL es la fuente de verdad).
- **`versiones`, `idiomas` y `clasificacion_por_pais` embebidos:** pertenecen solo a esta película, son
  pocos y nunca se consultan por separado. Usamos arrays de objetos (y no un objeto con claves por país)
  para poder filtrar con `"clasificacion_por_pais.pais": "CO"` y usar `$unwind` en las consultas.
- **Reseñas NO embebidas aquí:** crecen sin límite (ver sección 4).

**Reglas de datos**

- La clasificación de Colombia (`pais: "CO"`) y las versiones deben coincidir con la tabla de la sección 1.
- El `id_actor_director` de `funciones` va en el elenco con `principal: true`.
- Usar solo `id_actor_director` activos: 1–28 y 32 (**no** 29, 30, 31, que están inactivos).
- Los 14 próximos estrenos usan `id_pelicula` 17–30 y como persona principal ids 18–28 y 32 (activos sin funciones).
- No todas las fichas llevan los campos opcionales: así se ve la estructura variable.

**Ejemplo**

```javascript
{
  id_pelicula: 9,
  titulo_pelicula: "Código Aurora",
  estado: "EN_CARTELERA",
  genero: ["Ciencia ficción", "Suspenso"],
  sinopsis: "Una programadora descubre que una inteligencia artificial prepara un apagón global.",
  anio_estreno: 2026,
  pais_origen: "México",
  elenco: [
    { id_actor_director: 21, rol: "DIRECTOR", principal: false },
    { id_actor_director: 10, rol: "PROTAGONISTA", personaje: "Aurora Valdés", principal: true },
    { id_actor_director: 19, rol: "REPARTO", personaje: "Iván Rosales", principal: false }
  ],
  versiones: [
    { formato: "3D", version_idioma: "SUBTITULADA", duracion_min: 115 }
  ],
  idioma_original: "Inglés",
  idiomas_audio: ["Inglés"],
  subtitulos: ["Español"],
  clasificacion_por_pais: [
    { pais: "CO", clasificacion: "+12" },
    { pais: "MX", clasificacion: "B" },
    { pais: "ES", clasificacion: "+12" }
  ],
  premios: ["Mejor efectos visuales — Festival de Cine de Guadalajara 2026"]
}
```

---

