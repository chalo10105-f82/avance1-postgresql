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

## 3. Colección `requisitos_proyeccion`

**Contenido:** requerimientos técnicos de cada función especial (3D, subtitulada, sala VIP, familiar).
**Por qué MongoDB:** los requisitos cambian por completo según el formato. Una función 3D necesita gafas
y calibración del proyector; una subtitulada necesita archivo de subtítulos y sincronización; una función
VIP necesita servicio a la silla. En una tabla relacional serían columnas casi siempre vacías.
**Cantidad:** 1 documento por función, excepto la 16 (cancelada) → 31 documentos posibles (mínimo 30).

> **Nota:** las salas de Bosque Cinema son 2D, 3D y VIP. **No hay IMAX ni Dolby Atmos**, así que no se
> usan requisitos de esos formatos: contradirían los datos de PostgreSQL.

| Campo | Tipo | Oblig. | Embebido / Referenciado | Conexión con PostgreSQL |
| --- | --- | --- | --- | --- |
| `id_funcion` | int (único) | Sí | **Referencia** | `funciones.id_funcion` |
| `id_sala` | int | Sí | **Referencia** | `salas.id_sala` (la sala real de esa función) |
| `caracteristicas_especiales` | array de string: `3D`, `SUBTITULADA`, `SALA_VIP`, `FUNCION_FAMILIAR` | Sí | Embebido | Se deduce de `funciones.formato`, `version_idioma` y `id_sala` |
| `requisitos` | array de objetos | Sí | **Embebido** | — |
| `requisitos[].categoria` | string: `PROYECCION`, `AUDIO`, `SUBTITULOS`, `SALA`, `ATENCION` | Sí | — | — |
| `requisitos[].descripcion` | string | Sí | — | — |
| `requisitos[].…` | campos libres según la categoría | No | — | Ej.: `cantidad`, `nivel_db`, `archivo`, `idioma` |
| `personal_asignado` | array de `{id_staff, cargo}` | Sí | Referencia | `staff.id_staff` (cargo y sala deben coincidir) |
| `verificacion` | objeto `{id_staff, fecha, aprobado, observaciones}` | No | **Embebido** | `staff.id_staff` |

**Cómo asignar `caracteristicas_especiales`**

- `3D`: funciones con formato 3D (4, 5, 6, 9, 13, 14, 21, 22, 23, 26, 30, 31, 32).
- `SUBTITULADA`: funciones con versión subtitulada.
- `SALA_VIP`: funciones en la sala 3 Guayacán (7, 8, 9, 24, 25, 26).
- `FUNCION_FAMILIAR`: funciones clasificación T o +7 dobladas (volumen moderado, luz tenue de seguridad).

**Justificación de embebido vs. referenciado**

- **Colección aparte (no embebida en la ficha de la película):** los requisitos son de cada función, no de
  la película, y los consultan equipos distintos (proyección, encargados de sala) por su cuenta.
- **`requisitos` embebido:** son la razón de ser del documento, se leen siempre juntos y son pocos por función.
- **`id_funcion`, `id_sala` y `id_staff` referenciados:** esos datos viven en PostgreSQL y cambian allá
  (por ejemplo, si una función se cancela). Copiarlos aquí generaría inconsistencias.
- **`verificacion` embebida:** es una sola por función y no tiene sentido fuera de ella.

**Personal por sala (de la tabla `staff`)**

| Sala | Encargado | Aseo | Proyeccionista |
| --- | --- | --- | --- |
| 1 Roble (2D) | 13 | 18 | 23 |
| 2 Cedro (3D) | 14 | 19 | 24 |
| 3 Guayacán (VIP) | 15 | 20 | 25 |
| 4 Ceiba (2D) | 16 | 21 | 26 |
| 5 Sauce (3D) | 17 | 22 | 27 |

**Ejemplo**

```javascript
{
  id_funcion: 9,
  id_sala: 3,
  caracteristicas_especiales: ["3D", "SUBTITULADA", "SALA_VIP"],
  requisitos: [
    { categoria: "PROYECCION", descripcion: "Proyector en modo estereoscópico calibrado", brillo_min_lumenes: 14000 },
    { categoria: "SALA", descripcion: "Gafas 3D desinfectadas", cantidad: 40 },
    { categoria: "SUBTITULOS", descripcion: "Archivo de subtítulos sincronizado", idioma: "Español", archivo: "codigo_aurora_es.srt" },
    { categoria: "ATENCION", descripcion: "Servicio de comida a la silla durante la función" }
  ],
  personal_asignado: [
    { id_staff: 25, cargo: "PROYECCIONISTA" },
    { id_staff: 15, cargo: "ENCARGADO_SALA" }
  ],
  verificacion: {
    id_staff: 25,
    fecha: ISODate("2026-10-03T18:15:00-05:00"),
    aprobado: true,
    observaciones: "Calibración 3D sin novedades"
  }
}
```

---

## 4. Colección `resenas_peliculas`

**Contenido:** texto libre, calificación, fecha y respuesta de la empresa.
**Por qué MongoDB:** volumen alto (cada espectador puede escribir muchas) y esquema poco uniforme
(unas tienen respuesta, etiquetas o votos y otras no).
**Cantidad:** 30 documentos.

| Campo | Tipo | Oblig. | Embebido / Referenciado | Conexión con PostgreSQL |
| --- | --- | --- | --- | --- |
| `id_venta` | int (único) | Sí | **Referencia** | `ventas.id_venta` (prueba que compró la boleta) |
| `id_espectador` | int | Sí | **Referencia** | `espectadores.id_espectador` |
| `id_funcion` | int | Sí | **Referencia** | `funciones.id_funcion` |
| `id_pelicula` | int | Sí | Referencia | `fichas_tecnicas_peliculas.id_pelicula` |
| `titulo_pelicula` | string | Sí | — | `funciones.titulo_pelicula` |
| `calificacion` | int de 1 a 5 | Sí | — | — |
| `texto` | string | Sí | — | — |
| `fecha_resena` | date | Sí | — | Posterior a `funciones.fecha_hora_fin` |
| `estado` | string: `PUBLICADA`, `OCULTA`, `EN_REVISION` | Sí | — | — |
| `etiquetas` | array de string | No | Embebido | — |
| `votos_utiles` | int | No | — | — |
| `respuesta_empresa` | objeto `{id_staff, texto, fecha}` | No | **Embebido** | `staff.id_staff` (administrador 1 o 2) |

**Justificación de embebido vs. referenciado**

- **Colección aparte (no embebida en la ficha):** las reseñas crecen sin límite. Si se guardaran dentro de
  la ficha técnica, el documento crecería indefinidamente hacia el límite de 16 MB de MongoDB y cada nueva
  reseña reescribiría la ficha completa. Además se consultan por separado (por película, por calificación).
- **`id_venta`, `id_espectador`, `id_funcion` referenciados:** son datos de PostgreSQL. La referencia a la
  venta asegura que solo opina quien compró.
- **`respuesta_empresa` embebida:** es una sola por reseña, opcional, y solo tiene sentido junto a ella.

**Reglas de datos**

- Solo se reseñan **ventas PAGADAS de funciones FINALIZADAS: `id_venta` 1 a 34**. La 35 está ANULADA y
  las 36–45 son de funciones que aún no ocurren.
- Una reseña por venta. El `id_espectador` y el `id_funcion` deben ser los de esa venta.
- `fecha_resena` posterior a la función; `respuesta_empresa.fecha` posterior a la reseña.
- Variar calificaciones (no todas 4 o 5) para que las consultas den resultados interesantes.

**Ejemplo** (venta 21: espectador 23, función 9)

```javascript
{
  id_venta: 21,
  id_espectador: 23,
  id_funcion: 9,
  id_pelicula: 9,
  titulo_pelicula: "Código Aurora",
  calificacion: 4,
  texto: "Muy buenos efectos en 3D, aunque el final se sintió apresurado.",
  fecha_resena: ISODate("2026-10-04T10:20:00-05:00"),
  estado: "PUBLICADA",
  etiquetas: ["efectos", "3D"],
  respuesta_empresa: {
    id_staff: 1,
    texto: "¡Gracias, Gabriela! Nos alegra que disfrutaras la experiencia en sala VIP.",
    fecha: ISODate("2026-10-05T09:00:00-05:00")
  }
}
```

---

## 5. Colección `reportes_incidentes`

**Contenido:** fallas técnicas, quejas de servicio e incidentes de seguridad.
**Por qué MongoDB:** cada tipo de incidente necesita campos distintos. Una falla técnica registra el
equipo y los minutos de interrupción; una queja registra el espectador y la compensación; un incidente de
seguridad registra las personas involucradas y si se llamó a la policía.
**Cantidad:** 30 documentos (sugerido: 10 de cada tipo).

**Campos comunes a todos los tipos**

| Campo | Tipo | Oblig. | Embebido / Referenciado | Conexión con PostgreSQL |
| --- | --- | --- | --- | --- |
| `codigo` | string (único), ej. `INC-2026-001` | Sí | — | — |
| `tipo_incidente` | string: `FALLA_TECNICA`, `QUEJA_SERVICIO`, `SEGURIDAD` | Sí | — | — |
| `fecha_hora` | date | Sí | — | Dentro del horario de la función |
| `id_funcion` | int | No (puede ocurrir fuera de una función) | **Referencia** | `funciones.id_funcion` |
| `id_sala` | int | Sí (lo necesita el panel de incidentes por sala de la Entrega Final) | **Referencia** | `salas.id_sala` (la sala de esa función) |
| `id_staff_reporta` | int | Sí | **Referencia** | `staff.id_staff` |
| `prioridad` | string: `BAJA`, `MEDIA`, `ALTA`, `CRITICA` | Sí | — | — |
| `estado` | string: `ABIERTO`, `EN_PROCESO`, `CERRADO` | Sí | — | — |
| `descripcion` | string | Sí | — | — |
| `detalle` | objeto (cambia según el tipo) | Sí | **Embebido** | — |
| `seguimiento` | array de `{fecha, id_staff, accion}` | No | **Embebido** | `staff.id_staff` |

**Campos de `detalle` según el tipo**

| `tipo_incidente` | Campos obligatorios de `detalle` | Opcionales | Quién reporta (cargo) |
| --- | --- | --- | --- |
| `FALLA_TECNICA` | `equipo` (`PROYECTOR`, `SONIDO`, `PANTALLA`, `CLIMATIZACION`, `ILUMINACION`), `minutos_interrupcion` (int) | `requirio_reprogramacion` (bool), `repuesto` | Proyeccionista de esa sala (23–27) |
| `QUEJA_SERVICIO` | `area` (`TAQUILLA`, `DULCERIA`, `SALA`, `ASEO`), `motivo` | `id_espectador`, `id_venta`, `compensacion` `{tipo, valor}` | Encargado de sala (13–17), taquillero (3–7) o dulcería (8–11) |
| `SEGURIDAD` | `subtipo` (`ROBO`, `ALTERCADO`, `EMERGENCIA_MEDICA`, `EVACUACION`, `GRABACION_ILEGAL`), `autoridades_notificadas` (bool) | `personas_involucradas` (int), `acciones_tomadas` (array) | Seguridad (28 mañana, 29 tarde, 30 noche) |

**Justificación de embebido vs. referenciado**

- **`detalle` embebido:** es justamente lo que varía entre tipos y solo pertenece a ese reporte.
- **`seguimiento` embebido:** cada reporte tiene pocas acciones (2 a 5), se leen siempre con el reporte y
  terminan cuando el incidente se cierra (crecimiento acotado). Además, al cerrar un incidente se cambia
  `estado` y se agrega la acción final en un solo `updateOne` (`$set` + `$push`): ACID a nivel de documento.
- **Colección aparte:** estructura variable y alto volumen; se consultan por tipo, por sala y por fecha.
- **`id_funcion`, `id_sala`, `id_staff_reporta`, `id_espectador`, `id_venta` referenciados:** son datos de PostgreSQL.

**Reglas de datos**

- Usar funciones que ya ocurrieron (1–15). Si se pone `id_funcion`, el `id_sala` debe ser la sala de esa función.
- El cargo de quien reporta debe ser coherente con el tipo (tabla de arriba). No usar el `id_staff` 12 (retirado).
- En quejas con `id_venta`, el `id_espectador` debe ser el de esa venta.

**Ejemplos (uno de cada tipo)**

```javascript
// Falla técnica — función 11, sala 4 Ceiba, proyeccionista 26
{
  codigo: "INC-2026-001",
  tipo_incidente: "FALLA_TECNICA",
  fecha_hora: ISODate("2026-10-01T21:40:00-05:00"),
  id_funcion: 11,
  id_sala: 4,
  id_staff_reporta: 26,
  prioridad: "ALTA",
  estado: "CERRADO",
  descripcion: "El proyector se apagó por sobrecalentamiento a mitad de la función.",
  detalle: { equipo: "PROYECTOR", minutos_interrupcion: 12, requirio_reprogramacion: false },
  seguimiento: [
    { fecha: ISODate("2026-10-01T21:45:00-05:00"), id_staff: 26, accion: "Reinicio del proyector" },
    { fecha: ISODate("2026-10-02T10:00:00-05:00"), id_staff: 1,  accion: "Se programa mantenimiento preventivo" }
  ]
}

// Queja de servicio — función 8, venta 18 (espectador 12)
{
  codigo: "INC-2026-002",
  tipo_incidente: "QUEJA_SERVICIO",
  fecha_hora: ISODate("2026-10-02T20:50:00-05:00"),
  id_funcion: 8,
  id_sala: 3,
  id_staff_reporta: 15,
  prioridad: "MEDIA",
  estado: "CERRADO",
  descripcion: "El pedido de comida a la silla llegó después de iniciada la película.",
  detalle: {
    area: "SALA",
    motivo: "Demora en el servicio VIP",
    id_espectador: 12,
    id_venta: 18,
    compensacion: { tipo: "BONO_DULCERIA", valor: 15000 }
  }
}

// Seguridad — función 2, sala 1 Roble, seguridad turno noche
{
  codigo: "INC-2026-003",
  tipo_incidente: "SEGURIDAD",
  fecha_hora: ISODate("2026-09-27T19:35:00-05:00"),
  id_funcion: 2,
  id_sala: 1,
  id_staff_reporta: 30,
  prioridad: "ALTA",
  estado: "CERRADO",
  descripcion: "Un asistente grababa la película con el celular.",
  detalle: {
    subtipo: "GRABACION_ILEGAL",
    autoridades_notificadas: false,
    personas_involucradas: 1,
    acciones_tomadas: ["Se pidió borrar el video", "Se acompañó a la persona fuera de la sala"]
  }
}
```

---
