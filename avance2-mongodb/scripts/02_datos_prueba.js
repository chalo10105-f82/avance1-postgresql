// 02_datos_prueba.js
// Bosque Cinema - Avance 2 (MongoDB)
// Datos de prueba de las 4 colecciones. Cada integrante escribe SOLO en sus secciones.
// Se puede ejecutar varias veces: vacía con deleteMany({}) (no con drop(), para no perder el $jsonSchema).
// Requiere haber ejecutado antes 01_creacion_colecciones.js

db = db.getSiblingDB("bosque_cinema");


// =====================================================================
// SECCIÓN 1 · fichas_tecnicas_peliculas  (Gonzalo)
// 30 documentos: 16 en cartelera (ids 1-16) + 14 próximos estrenos (ids 17-30)
// =====================================================================
db.fichas_tecnicas_peliculas.deleteMany({});
db.fichas_tecnicas_peliculas.insertMany([
  {
    id_pelicula: 1,
    titulo_pelicula: "La Ruta del Colibrí",
    estado: "EN_CARTELERA",
    genero: ["Animación", "Familiar", "Aventura"],
    sinopsis: "Un colibrí diminuto emprende un viaje desde los Andes hasta la selva para devolver el color a las flores de su valle.",
    anio_estreno: 2025,
    pais_origen: "Francia",
    elenco: [
      { id_actor_director: 4, rol: "DIRECTOR", principal: false },
      { id_actor_director: 3, rol: "PROTAGONISTA", personaje: "Zafiro", principal: true },
      { id_actor_director: 5, rol: "REPARTO", personaje: "Tía Gaviota", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "DOBLADA", duracion_min: 95 }
    ],
    idioma_original: "Francés",
    idiomas_audio: ["Español", "Francés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "T" },
      { pais: "MX", clasificacion: "A" },
      { pais: "ES", clasificacion: "TP" },
      { pais: "AR", clasificacion: "ATP" },
      { pais: "BR", clasificacion: "L" }
    ],
    premios: ["Premio del Público — Festival de Annecy 2025"]
  },
  {
    id_pelicula: 2,
    titulo_pelicula: "Noche en Villa Esperanza",
    estado: "EN_CARTELERA",
    genero: ["Drama", "Suspenso"],
    sinopsis: "Durante un apagón en un barrio de Salvador, tres vecinos descubren un secreto que los une para siempre.",
    anio_estreno: 2025,
    pais_origen: "Brasil",
    elenco: [
      { id_actor_director: 4, rol: "DIRECTOR", principal: false },
      { id_actor_director: 5, rol: "PROTAGONISTA", personaje: "Marina Duarte", principal: true },
      { id_actor_director: 20, rol: "REPARTO", personaje: "Teodoro", principal: false },
      { id_actor_director: 26, rol: "REPARTO", personaje: "Inspector Paiva", principal: false },
      { id_actor_director: 27, rol: "REPARTO", personaje: "Doña Nelly", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 112 }
    ],
    idioma_original: "Portugués",
    idiomas_audio: ["Portugués"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" },
      { pais: "MX", clasificacion: "B15" },
      { pais: "BR", clasificacion: "14" },
      { pais: "AR", clasificacion: "+16" }
    ],
    premios: ["Mejor guion — Festival de Cine de Gramado 2025"]
  },
  {
    id_pelicula: 3,
    titulo_pelicula: "Papá en Apuros",
    estado: "EN_CARTELERA",
    genero: ["Comedia", "Familiar"],
    sinopsis: "Un padre primerizo intenta organizar la fiesta de cumpleaños de su hija en un solo fin de semana y todo sale mal.",
    anio_estreno: 2026,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 6, rol: "DIRECTOR", principal: false },
      { id_actor_director: 7, rol: "PROTAGONISTA", personaje: "Daniel Ortega", principal: true },
      { id_actor_director: 16, rol: "REPARTO", personaje: "Sofía", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "DOBLADA", duracion_min: 98 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "US", clasificacion: "PG" }
    ]
  },
  {
    id_pelicula: 4,
    titulo_pelicula: "Galaxia Nómada",
    estado: "EN_CARTELERA",
    genero: ["Ciencia ficción", "Aventura", "Animación"],
    sinopsis: "Una tripulación de exploradores huérfanos viaja entre galaxias buscando un planeta donde pueda crecer su jardín flotante.",
    anio_estreno: 2026,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 23, rol: "DIRECTOR", principal: false },
      { id_actor_director: 8, rol: "PROTAGONISTA", personaje: "Capitana Ilya", principal: true },
      { id_actor_director: 10, rol: "REPARTO", personaje: "Robo-Pip", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 104 },
      { formato: "2D", version_idioma: "DOBLADA", duracion_min: 103 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "ES", clasificacion: "+7" },
      { pais: "US", clasificacion: "PG" },
      { pais: "BR", clasificacion: "10" }
    ],
    saga: { nombre: "Crónicas del Jardín Estelar", numero: 2 }
  },
  {
    id_pelicula: 5,
    titulo_pelicula: "Océano Profundo",
    estado: "EN_CARTELERA",
    genero: ["Aventura", "Drama"],
    sinopsis: "Una bióloga marina desciende a una fosa abisal para rescatar a su hermano y encuentra una civilización inesperada.",
    anio_estreno: 2026,
    pais_origen: "Reino Unido",
    elenco: [
      { id_actor_director: 9, rol: "DIRECTOR", principal: true },
      { id_actor_director: 19, rol: "PROTAGONISTA", personaje: "Dra. Helena Marsh", principal: false },
      { id_actor_director: 10, rol: "REPARTO", personaje: "Tomás Marsh", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "SUBTITULADA", duracion_min: 132 },
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 132 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Inglés"],
    subtitulos: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+12" },
      { pais: "MX", clasificacion: "B" },
      { pais: "ES", clasificacion: "+12" },
      { pais: "US", clasificacion: "PG-13" }
    ],
    premios: ["Mejor fotografía submarina — Festival de Sitges 2026"]
  },
  {
    id_pelicula: 6,
    titulo_pelicula: "Aventuras en el Bosque Encantado",
    estado: "EN_CARTELERA",
    genero: ["Fantasía", "Familiar", "Animación"],
    sinopsis: "Tres amigos animales atraviesan un bosque lleno de criaturas mágicas para salvar el árbol más antiguo.",
    anio_estreno: 2026,
    pais_origen: "Canadá",
    elenco: [
      { id_actor_director: 14, rol: "DIRECTOR", principal: true },
      { id_actor_director: 12, rol: "PROTAGONISTA", personaje: "Bruno el Zorro", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 88 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "T" },
      { pais: "MX", clasificacion: "A" }
    ],
    saga: { nombre: "Bosque Encantado", numero: 1 }
  },
  {
    id_pelicula: 7,
    titulo_pelicula: "El Jardín de Cristal",
    estado: "EN_CARTELERA",
    genero: ["Drama", "Romance"],
    sinopsis: "En Kioto, una restauradora de invernaderos y un arquitecto jubilado reconstruyen un jardín destruido por una tormenta.",
    anio_estreno: 2025,
    pais_origen: "Japón",
    elenco: [
      { id_actor_director: 2, rol: "DIRECTOR", principal: true },
      { id_actor_director: 22, rol: "PROTAGONISTA", personaje: "Haruka Mori", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 121 }
    ],
    idioma_original: "Japonés",
    idiomas_audio: ["Japonés"],
    subtitulos: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+12" },
      { pais: "MX", clasificacion: "B" },
      { pais: "ES", clasificacion: "+12" }
    ],
    premios: ["Premio del Jurado — Festival de Cine de Tokio 2025", "Mejor actriz — Festival de San Sebastián 2025"]
  },
  {
    id_pelicula: 8,
    titulo_pelicula: "Tormenta Roja",
    estado: "EN_CARTELERA",
    genero: ["Acción", "Thriller"],
    sinopsis: "Una agente encubierta debe frenar un atentado durante el festival más grande de la ciudad antes de que caiga la noche.",
    anio_estreno: 2026,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 18, rol: "DIRECTOR", principal: false },
      { id_actor_director: 11, rol: "PROTAGONISTA", personaje: "Agente Valeria Cruz", principal: true },
      { id_actor_director: 13, rol: "REPARTO", personaje: "Comisario Duarte", principal: false },
      { id_actor_director: 24, rol: "REPARTO", personaje: "Marcus Hale", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 126 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Inglés"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+18" },
      { pais: "MX", clasificacion: "C" },
      { pais: "ES", clasificacion: "+18" },
      { pais: "US", clasificacion: "R" }
    ]
  },
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
  },
  {
    id_pelicula: 10,
    titulo_pelicula: "Cenizas de Julio",
    estado: "EN_CARTELERA",
    genero: ["Drama"],
    sinopsis: "Un pueblo del Pirineo vive el julio más difícil de su historia, cuando un incendio forestal obliga a todos a decidir si se quedan o se van.",
    anio_estreno: 2025,
    pais_origen: "España",
    elenco: [
      { id_actor_director: 6, rol: "DIRECTOR", principal: true },
      { id_actor_director: 25, rol: "PROTAGONISTA", personaje: "Marta Vidal", principal: false },
      { id_actor_director: 16, rol: "REPARTO", personaje: "Jaume Serra", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 109 }
    ],
    idioma_original: "Catalán",
    idiomas_audio: ["Catalán"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" },
      { pais: "MX", clasificacion: "B15" },
      { pais: "ES", clasificacion: "+16" }
    ]
  },
  {
    id_pelicula: 11,
    titulo_pelicula: "El Silencio del Valle",
    estado: "EN_CARTELERA",
    genero: ["Terror", "Suspenso"],
    sinopsis: "Cuando una familia se muda a un valle sin sonido, descubre que cada ruido atrae algo que vive bajo la niebla.",
    anio_estreno: 2026,
    pais_origen: "Irlanda",
    elenco: [
      { id_actor_director: 4, rol: "DIRECTOR", principal: true },
      { id_actor_director: 15, rol: "PROTAGONISTA", personaje: "Clara Brennan", principal: false },
      { id_actor_director: 22, rol: "REPARTO", personaje: "Liam Brennan", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 117 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Inglés"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+18" },
      { pais: "MX", clasificacion: "C" },
      { pais: "US", clasificacion: "R" }
    ]
  },
  {
    id_pelicula: 12,
    titulo_pelicula: "Mi Abuela la Hechicera",
    estado: "EN_CARTELERA",
    genero: ["Comedia", "Fantasía", "Familiar"],
    sinopsis: "Una niña descubre que su abuela es una hechicera retirada y juntas deben vencer un hechizo que enreda a todo el barrio.",
    anio_estreno: 2025,
    pais_origen: "Italia",
    elenco: [
      { id_actor_director: 32, rol: "DIRECTOR", principal: false },
      { id_actor_director: 15, rol: "PROTAGONISTA", personaje: "Nonna Carmela", principal: true },
      { id_actor_director: 8, rol: "REPARTO", personaje: "Giulia", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "DOBLADA", duracion_min: 92 }
    ],
    idioma_original: "Italiano",
    idiomas_audio: ["Español", "Italiano"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "T" },
      { pais: "ES", clasificacion: "TP" }
    ]
  },
  {
    id_pelicula: 13,
    titulo_pelicula: "Rumbo a Marte",
    estado: "EN_CARTELERA",
    genero: ["Ciencia ficción", "Aventura"],
    sinopsis: "Seis estudiantes seleccionados para la primera misión escolar a Marte deben improvisar cuando fallan los sistemas de la nave.",
    anio_estreno: 2026,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 2, rol: "DIRECTOR", principal: false },
      { id_actor_director: 12, rol: "PROTAGONISTA", personaje: "Capitán Nico Rivas", principal: true },
      { id_actor_director: 3, rol: "REPARTO", personaje: "Dra. Park", principal: false },
      { id_actor_director: 20, rol: "REPARTO", personaje: "Piloto Eli", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 110 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "ES", clasificacion: "+7" },
      { pais: "US", clasificacion: "PG" },
      { pais: "AR", clasificacion: "ATP" }
    ]
  },
  {
    id_pelicula: 14,
    titulo_pelicula: "Dragones del Alba",
    estado: "EN_CARTELERA",
    genero: ["Fantasía", "Aventura", "Animación"],
    sinopsis: "Una joven domadora hereda el último huevo de dragón y debe cruzar las montañas del este antes del amanecer del solsticio.",
    anio_estreno: 2026,
    pais_origen: "Corea del Sur",
    elenco: [
      { id_actor_director: 21, rol: "DIRECTOR", principal: false },
      { id_actor_director: 17, rol: "PROTAGONISTA", personaje: "Yuna", principal: true },
      { id_actor_director: 26, rol: "REPARTO", personaje: "Maestro Baek", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 101 },
      { formato: "2D", version_idioma: "DOBLADA", duracion_min: 101 }
    ],
    idioma_original: "Coreano",
    idiomas_audio: ["Español", "Coreano"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "ES", clasificacion: "+7" },
      { pais: "US", clasificacion: "PG" }
    ],
    saga: { nombre: "Dragones del Alba", numero: 1 }
  },
  {
    id_pelicula: 15,
    titulo_pelicula: "Duelo en la Frontera",
    estado: "EN_CARTELERA",
    genero: ["Western", "Drama"],
    sinopsis: "Dos viejos pistoleros enemigos deben escoltar juntos a una niña a través del desierto hasta la frontera.",
    anio_estreno: 2025,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 4, rol: "DIRECTOR", principal: false },
      { id_actor_director: 13, rol: "PROTAGONISTA", personaje: "Jack Maddox", principal: true },
      { id_actor_director: 28, rol: "REPARTO", personaje: "Sheriff Tate", principal: false },
      { id_actor_director: 24, rol: "REPARTO", personaje: "Ana Luz", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 128 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Inglés"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" },
      { pais: "MX", clasificacion: "B15" },
      { pais: "US", clasificacion: "R" }
    ],
    premios: ["Mejor banda sonora — Festival de Cine de Almería 2025"]
  },
  {
    id_pelicula: 16,
    titulo_pelicula: "Latidos",
    estado: "EN_CARTELERA",
    genero: ["Drama", "Romance"],
    sinopsis: "Una cardióloga y un violinista sordo se conocen en un hospital y descubren que sus ritmos se parecen más de lo que creen.",
    anio_estreno: 2026,
    pais_origen: "Francia",
    elenco: [
      { id_actor_director: 6, rol: "DIRECTOR", principal: false },
      { id_actor_director: 16, rol: "PROTAGONISTA", personaje: "Dra. Élodie Roux", principal: true },
      { id_actor_director: 27, rol: "REPARTO", personaje: "Étienne", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 106 }
    ],
    idioma_original: "Francés",
    idiomas_audio: ["Francés"],
    subtitulos: ["Español", "Francés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+12" },
      { pais: "MX", clasificacion: "B" },
      { pais: "ES", clasificacion: "+12" }
    ]
  },
  {
    id_pelicula: 17,
    titulo_pelicula: "Sombras de Zipaquirá",
    estado: "PROXIMO_ESTRENO",
    genero: ["Suspenso", "Drama"],
    sinopsis: "Un geólogo que investiga una mina de sal encuentra un mapa que revela un crimen enterrado hace treinta años.",
    anio_estreno: 2026,
    pais_origen: "Colombia",
    elenco: [
      { id_actor_director: 18, rol: "DIRECTOR", principal: true },
      { id_actor_director: 5, rol: "PROTAGONISTA", personaje: "Gabriel Ocampo", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 108 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    subtitulos: ["Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" },
      { pais: "MX", clasificacion: "B15" }
    ]
  },
  {
    id_pelicula: 18,
    titulo_pelicula: "Ritmo de Barrio",
    estado: "PROXIMO_ESTRENO",
    genero: ["Comedia", "Musical"],
    sinopsis: "Un grupo de vecinos monta una orquesta de salsa para salvar la casa cultural de su barrio.",
    anio_estreno: 2026,
    pais_origen: "Colombia",
    elenco: [
      { id_actor_director: 11, rol: "DIRECTOR", principal: false },
      { id_actor_director: 19, rol: "PROTAGONISTA", personaje: "Chucho Valencia", principal: true },
      { id_actor_director: 27, rol: "REPARTO", personaje: "Doña Ligia", principal: false },
      { id_actor_director: 24, rol: "REPARTO", personaje: "El Profe", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 99 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "AR", clasificacion: "ATP" }
    ]
  },
  {
    id_pelicula: 19,
    titulo_pelicula: "Última Parada",
    estado: "PROXIMO_ESTRENO",
    genero: ["Thriller"],
    sinopsis: "En el último bus nocturno de Medellín, cinco desconocidos descubren que alguno de ellos no debería estar a bordo.",
    anio_estreno: 2026,
    pais_origen: "Colombia",
    elenco: [
      { id_actor_director: 14, rol: "DIRECTOR", principal: false },
      { id_actor_director: 20, rol: "PROTAGONISTA", personaje: "Laura Mejía", principal: true },
      { id_actor_director: 28, rol: "REPARTO", personaje: "El Conductor", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 102 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" }
    ]
  },
  {
    id_pelicula: 20,
    titulo_pelicula: "El Faro del Fin del Mundo",
    estado: "PROXIMO_ESTRENO",
    genero: ["Drama", "Misterio"],
    sinopsis: "Una farera solitaria en la Patagonia recibe cada noche una señal de auxilio que nadie más puede escuchar.",
    anio_estreno: 2026,
    pais_origen: "Chile",
    elenco: [
      { id_actor_director: 21, rol: "DIRECTOR", principal: true },
      { id_actor_director: 3, rol: "PROTAGONISTA", personaje: "Isidora Fuentes", principal: false },
      { id_actor_director: 10, rol: "REPARTO", personaje: "Mateo", principal: false },
      { id_actor_director: 16, rol: "REPARTO", personaje: "Dra. Salas", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 114 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    subtitulos: ["Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+12" },
      { pais: "MX", clasificacion: "B" },
      { pais: "AR", clasificacion: "+13" },
      { pais: "ES", clasificacion: "+12" }
    ],
    premios: ["Selección oficial — Festival de Cine de Valdivia 2026"]
  },
  {
    id_pelicula: 21,
    titulo_pelicula: "Camino a Casa",
    estado: "PROXIMO_ESTRENO",
    genero: ["Drama", "Familiar"],
    sinopsis: "Un niño de Oaxaca recorre el país en autobús para reencontrarse con su madre antes de Navidad.",
    anio_estreno: 2026,
    pais_origen: "México",
    elenco: [
      { id_actor_director: 11, rol: "DIRECTOR", principal: false },
      { id_actor_director: 22, rol: "PROTAGONISTA", personaje: "Tomasito", principal: true },
      { id_actor_director: 28, rol: "REPARTO", personaje: "Doña Remedios", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 96 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "AR", clasificacion: "ATP" }
    ]
  },
  {
    id_pelicula: 22,
    titulo_pelicula: "Reyes de la Arena",
    estado: "PROXIMO_ESTRENO",
    genero: ["Acción", "Aventura"],
    sinopsis: "Dos clanes rivales compiten por el control de un oasis en el desierto más peligroso del planeta.",
    anio_estreno: 2027,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 23, rol: "DIRECTOR", principal: true },
      { id_actor_director: 15, rol: "PROTAGONISTA", personaje: "Zara Khalil", principal: false },
      { id_actor_director: 5, rol: "REPARTO", personaje: "Rey Tariq", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "SUBTITULADA", duracion_min: 138 },
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 138 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Inglés"],
    subtitulos: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+12" },
      { pais: "MX", clasificacion: "B" },
      { pais: "ES", clasificacion: "+12" },
      { pais: "US", clasificacion: "PG-13" },
      { pais: "BR", clasificacion: "12" },
      { pais: "AR", clasificacion: "+13" }
    ],
    saga: { nombre: "Reyes de la Arena", numero: 3 }
  },
  {
    id_pelicula: 23,
    titulo_pelicula: "Constelación Perdida",
    estado: "PROXIMO_ESTRENO",
    genero: ["Ciencia ficción", "Drama"],
    sinopsis: "La única superviviente de una nave a la deriva se comunica con la Tierra a través de una constelación que ya no existe.",
    anio_estreno: 2026,
    pais_origen: "Reino Unido",
    elenco: [
      { id_actor_director: 23, rol: "DIRECTOR", principal: false },
      { id_actor_director: 24, rol: "PROTAGONISTA", personaje: "Comandante Ada Reyes", principal: true },
      { id_actor_director: 7, rol: "REPARTO", personaje: "Voz de la Base", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 119 },
      { formato: "3D", version_idioma: "SUBTITULADA", duracion_min: 119 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Español", "Inglés"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+12" },
      { pais: "US", clasificacion: "PG-13" },
      { pais: "ES", clasificacion: "+12" },
      { pais: "MX", clasificacion: "B" }
    ]
  },
  {
    id_pelicula: 24,
    titulo_pelicula: "Marea Alta",
    estado: "PROXIMO_ESTRENO",
    genero: ["Drama", "Romance"],
    sinopsis: "En un pueblo pesquero del Río de la Plata, dos hermanos enamorados de la misma mujer enfrentan la pesca de su vida.",
    anio_estreno: 2026,
    pais_origen: "Argentina",
    elenco: [
      { id_actor_director: 14, rol: "DIRECTOR", principal: false },
      { id_actor_director: 25, rol: "PROTAGONISTA", personaje: "Bruno Maidana", principal: true },
      { id_actor_director: 8, rol: "REPARTO", personaje: "Elena", principal: false },
      { id_actor_director: 17, rol: "REPARTO", personaje: "Don Aníbal", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 111 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" },
      { pais: "MX", clasificacion: "B15" },
      { pais: "ES", clasificacion: "+16" }
    ]
  },
  {
    id_pelicula: 25,
    titulo_pelicula: "La Casa del Eco",
    estado: "PROXIMO_ESTRENO",
    genero: ["Terror"],
    sinopsis: "Una familia hereda un caserón de Galicia donde cada habitación repite, un día después, lo que se dijo en ella.",
    anio_estreno: 2026,
    pais_origen: "España",
    elenco: [
      { id_actor_director: 3, rol: "DIRECTOR", principal: false },
      { id_actor_director: 26, rol: "PROTAGONISTA", personaje: "Lucía Barrios", principal: true },
      { id_actor_director: 19, rol: "REPARTO", personaje: "Ramón", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 104 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    subtitulos: ["Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+18" },
      { pais: "ES", clasificacion: "+18" },
      { pais: "MX", clasificacion: "C" },
      { pais: "US", clasificacion: "R" }
    ],
    premios: ["Premio Méliès de Plata — Festival de Sitges 2026"]
  },
  {
    id_pelicula: 26,
    titulo_pelicula: "Pequeños Gigantes",
    estado: "PROXIMO_ESTRENO",
    genero: ["Animación", "Familiar", "Aventura"],
    sinopsis: "Un grupo de insectos del jardín se une para proteger su colonia de un niño con una lupa demasiado curiosa.",
    anio_estreno: 2026,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 2, rol: "DIRECTOR", principal: false },
      { id_actor_director: 27, rol: "PROTAGONISTA", personaje: "Hormiga Lola", principal: true },
      { id_actor_director: 13, rol: "REPARTO", personaje: "Escarabajo Don Teo", principal: false },
      { id_actor_director: 11, rol: "REPARTO", personaje: "Abeja Reina", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 94 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Español", "Inglés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "T" },
      { pais: "MX", clasificacion: "A" },
      { pais: "ES", clasificacion: "TP" },
      { pais: "US", clasificacion: "G" },
      { pais: "AR", clasificacion: "ATP" },
      { pais: "BR", clasificacion: "L" }
    ],
    saga: { nombre: "Pequeños Gigantes", numero: 2 }
  },
  {
    id_pelicula: 27,
    titulo_pelicula: "Fuego Cruzado",
    estado: "PROXIMO_ESTRENO",
    genero: ["Acción", "Crimen"],
    sinopsis: "Un negociador de rehenes tiene seis horas para evitar una masacre en el centro de Nueva York.",
    anio_estreno: 2026,
    pais_origen: "Estados Unidos",
    elenco: [
      { id_actor_director: 3, rol: "DIRECTOR", principal: false },
      { id_actor_director: 28, rol: "PROTAGONISTA", personaje: "Detective Ray Calloway", principal: true },
      { id_actor_director: 10, rol: "REPARTO", personaje: "Sara Whitman", principal: false },
      { id_actor_director: 24, rol: "REPARTO", personaje: "El Fantasma", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "SUBTITULADA", duracion_min: 122 }
    ],
    idioma_original: "Inglés",
    idiomas_audio: ["Inglés"],
    subtitulos: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+18" },
      { pais: "MX", clasificacion: "C" },
      { pais: "US", clasificacion: "R" }
    ]
  },
  {
    id_pelicula: 28,
    titulo_pelicula: "Sueño de Papel",
    estado: "PROXIMO_ESTRENO",
    genero: ["Animación", "Fantasía"],
    sinopsis: "Una ilustradora descubre que sus dibujos cobran vida cada vez que se queda dormida sobre el escritorio.",
    anio_estreno: 2026,
    pais_origen: "Japón",
    elenco: [
      { id_actor_director: 32, rol: "DIRECTOR", principal: true },
      { id_actor_director: 13, rol: "PROTAGONISTA", personaje: "Mika", principal: false },
      { id_actor_director: 15, rol: "REPARTO", personaje: "Papelito", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "DOBLADA", duracion_min: 89 }
    ],
    idioma_original: "Japonés",
    idiomas_audio: ["Español", "Japonés"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "US", clasificacion: "PG" },
      { pais: "ES", clasificacion: "+7" }
    ]
  },
  {
    id_pelicula: 29,
    titulo_pelicula: "Eclipse en el Páramo",
    estado: "PROXIMO_ESTRENO",
    genero: ["Drama", "Suspenso"],
    sinopsis: "En el páramo de Sumapaz, un eclipse total reabre la desaparición de un campesino ocurrida hace veinte años.",
    anio_estreno: 2026,
    pais_origen: "Colombia",
    elenco: [
      { id_actor_director: 18, rol: "DIRECTOR", principal: true },
      { id_actor_director: 20, rol: "PROTAGONISTA", personaje: "Ramiro Cuervo", principal: false },
      { id_actor_director: 22, rol: "REPARTO", personaje: "Fiscal Duque", principal: false }
    ],
    versiones: [
      { formato: "2D", version_idioma: "ORIGINAL", duracion_min: 123 }
    ],
    idioma_original: "Español",
    idiomas_audio: ["Español"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+15" },
      { pais: "MX", clasificacion: "B15" },
      { pais: "ES", clasificacion: "+16" }
    ],
    premios: ["Premio Fénix a Mejor Ópera Prima — 2026"]
  },
  {
    id_pelicula: 30,
    titulo_pelicula: "Los Guardianes del Río",
    estado: "PROXIMO_ESTRENO",
    genero: ["Aventura", "Familiar", "Animación"],
    sinopsis: "Tres hermanos indígenas del Amazonas buscan el espíritu del río para que vuelva a correr limpio.",
    anio_estreno: 2026,
    pais_origen: "Brasil",
    elenco: [
      { id_actor_director: 9, rol: "DIRECTOR", principal: false },
      { id_actor_director: 20, rol: "PROTAGONISTA", personaje: "Kauê", principal: true },
      { id_actor_director: 16, rol: "REPARTO", personaje: "Anciana Iara", principal: false }
    ],
    versiones: [
      { formato: "3D", version_idioma: "DOBLADA", duracion_min: 97 }
    ],
    idioma_original: "Portugués",
    idiomas_audio: ["Español", "Portugués"],
    clasificacion_por_pais: [
      { pais: "CO", clasificacion: "+7" },
      { pais: "MX", clasificacion: "A" },
      { pais: "ES", clasificacion: "+7" },
      { pais: "BR", clasificacion: "10" }
    ],
    saga: { nombre: "Guardianes del Río", numero: 1 }
  }
]);
print("fichas_tecnicas_peliculas: " + db.fichas_tecnicas_peliculas.countDocuments({}) + " documentos");


// =====================================================================
// SECCIÓN 2 · requisitos_proyeccion  (Gonzalo)
// 31 documentos: una por función, excepto la función 16 (CANCELADA)
// id_sala e id_funcion coinciden con la tabla funciones de PostgreSQL
// =====================================================================
db.requisitos_proyeccion.deleteMany({});
db.requisitos_proyeccion.insertMany([
  {
    id_funcion: 1,
    id_sala: 1,
    caracteristicas_especiales: ["FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 13, fecha: ISODate("2026-09-27T14:15:00-05:00"), aprobado: true, observaciones: "Revisión completa sin novedades" }
  },
  {
    id_funcion: 2,
    id_sala: 1,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 15 años", edad_minima: 15 }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 13, fecha: ISODate("2026-09-27T18:15:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 3,
    id_sala: 1,
    caracteristicas_especiales: ["FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 13, fecha: ISODate("2026-10-03T15:15:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 4,
    id_sala: 2,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 100, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 14, cargo: "ENCARGADO_SALA" },
      { id_staff: 19, cargo: "ASEO" },
      { id_staff: 24, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 14, fecha: ISODate("2026-09-26T14:45:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 5,
    id_sala: 2,
    caracteristicas_especiales: ["3D", "SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 100, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" }
    ],
    personal_asignado: [
      { id_staff: 14, cargo: "ENCARGADO_SALA" },
      { id_staff: 19, cargo: "ASEO" },
      { id_staff: 24, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 14, fecha: ISODate("2026-09-26T18:45:00-05:00"), aprobado: false, observaciones: "Faltaban 6 gafas 3D; se repusieron antes de abrir puertas y la función inició a tiempo" }
  },
  {
    id_funcion: 6,
    id_sala: 2,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 100, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 14, cargo: "ENCARGADO_SALA" },
      { id_staff: 19, cargo: "ASEO" },
      { id_staff: 24, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 14, fecha: ISODate("2026-10-04T13:15:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 7,
    id_sala: 3,
    caracteristicas_especiales: ["SUBTITULADA", "SALA_VIP"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 5.1 ajustado para sala de 40 butacas", canales: "5.1", volumen_maximo_db: 85 },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Butacas reclinables limpias y servicio de mesa listo; aforo máximo de la sala", aforo_maximo: 40 }
    ],
    personal_asignado: [
      { id_staff: 15, cargo: "ENCARGADO_SALA" },
      { id_staff: 20, cargo: "ASEO" },
      { id_staff: 25, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 15, fecha: ISODate("2026-09-28T17:15:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 8,
    id_sala: 3,
    caracteristicas_especiales: ["SUBTITULADA", "SALA_VIP"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 5.1 ajustado para sala de 40 butacas", canales: "5.1", volumen_maximo_db: 85 },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Butacas reclinables limpias y servicio de mesa listo; aforo máximo de la sala", aforo_maximo: 40 },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 18 años", edad_minima: 18 }
    ],
    personal_asignado: [
      { id_staff: 15, cargo: "ENCARGADO_SALA" },
      { id_staff: 20, cargo: "ASEO" },
      { id_staff: 25, cargo: "PROYECCIONISTA" },
      { id_staff: 30, cargo: "SEGURIDAD" }
    ],
    verificacion: { id_staff: 15, fecha: ISODate("2026-10-02T19:45:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 9,
    id_sala: 3,
    caracteristicas_especiales: ["3D", "SUBTITULADA", "SALA_VIP"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 40, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 5.1 ajustado para sala de 40 butacas", canales: "5.1", volumen_maximo_db: 85 },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Butacas reclinables limpias y servicio de mesa listo; aforo máximo de la sala", aforo_maximo: 40 }
    ],
    personal_asignado: [
      { id_staff: 15, cargo: "ENCARGADO_SALA" },
      { id_staff: 20, cargo: "ASEO" },
      { id_staff: 25, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 15, fecha: ISODate("2026-10-03T18:15:00-05:00"), aprobado: true, observaciones: "Revisión completa sin novedades" }
  },
  {
    id_funcion: 10,
    id_sala: 4,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 15 años", edad_minima: 15 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 16, fecha: ISODate("2026-09-29T17:45:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 11,
    id_sala: 4,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 18 años", edad_minima: 18 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" },
      { id_staff: 30, cargo: "SEGURIDAD" }
    ],
    verificacion: { id_staff: 16, fecha: ISODate("2026-10-01T20:15:00-05:00"), aprobado: false, observaciones: "Ruido en el canal izquierdo; el proyeccionista lo corrigió antes de iniciar" }
  },
  {
    id_funcion: 12,
    id_sala: 4,
    caracteristicas_especiales: ["FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 16, fecha: ISODate("2026-10-04T10:15:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 13,
    id_sala: 5,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 90, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 17, cargo: "ENCARGADO_SALA" },
      { id_staff: 22, cargo: "ASEO" },
      { id_staff: 27, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 17, fecha: ISODate("2026-10-03T16:15:00-05:00"), aprobado: true, observaciones: "Revisión completa sin novedades" }
  },
  {
    id_funcion: 14,
    id_sala: 5,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 90, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 17, cargo: "ENCARGADO_SALA" },
      { id_staff: 22, cargo: "ASEO" },
      { id_staff: 27, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 17, fecha: ISODate("2026-10-04T15:15:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 15,
    id_sala: 4,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 15 años", edad_minima: 15 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" }
    ],
    verificacion: { id_staff: 16, fecha: ISODate("2026-10-06T13:45:00-05:00"), aprobado: true }
  },
  {
    id_funcion: 17,
    id_sala: 1,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 18,
    id_sala: 1,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 15 años", edad_minima: 15 }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 19,
    id_sala: 1,
    caracteristicas_especiales: ["FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 20,
    id_sala: 1,
    caracteristicas_especiales: ["FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 13, cargo: "ENCARGADO_SALA" },
      { id_staff: 18, cargo: "ASEO" },
      { id_staff: 23, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 21,
    id_sala: 2,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 100, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 14, cargo: "ENCARGADO_SALA" },
      { id_staff: 19, cargo: "ASEO" },
      { id_staff: 24, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 22,
    id_sala: 2,
    caracteristicas_especiales: ["3D", "SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 100, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" }
    ],
    personal_asignado: [
      { id_staff: 14, cargo: "ENCARGADO_SALA" },
      { id_staff: 19, cargo: "ASEO" },
      { id_staff: 24, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 23,
    id_sala: 2,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 100, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 14, cargo: "ENCARGADO_SALA" },
      { id_staff: 19, cargo: "ASEO" },
      { id_staff: 24, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 24,
    id_sala: 3,
    caracteristicas_especiales: ["SUBTITULADA", "SALA_VIP"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 5.1 ajustado para sala de 40 butacas", canales: "5.1", volumen_maximo_db: 85 },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Butacas reclinables limpias y servicio de mesa listo; aforo máximo de la sala", aforo_maximo: 40 },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 18 años", edad_minima: 18 }
    ],
    personal_asignado: [
      { id_staff: 15, cargo: "ENCARGADO_SALA" },
      { id_staff: 20, cargo: "ASEO" },
      { id_staff: 25, cargo: "PROYECCIONISTA" },
      { id_staff: 28, cargo: "SEGURIDAD" }
    ]
  },
  {
    id_funcion: 25,
    id_sala: 3,
    caracteristicas_especiales: ["SUBTITULADA", "SALA_VIP"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 5.1 ajustado para sala de 40 butacas", canales: "5.1", volumen_maximo_db: 85 },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Butacas reclinables limpias y servicio de mesa listo; aforo máximo de la sala", aforo_maximo: 40 }
    ],
    personal_asignado: [
      { id_staff: 15, cargo: "ENCARGADO_SALA" },
      { id_staff: 20, cargo: "ASEO" },
      { id_staff: 25, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 26,
    id_sala: 3,
    caracteristicas_especiales: ["3D", "SUBTITULADA", "SALA_VIP"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 40, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 5.1 ajustado para sala de 40 butacas", canales: "5.1", volumen_maximo_db: 85 },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Butacas reclinables limpias y servicio de mesa listo; aforo máximo de la sala", aforo_maximo: 40 }
    ],
    personal_asignado: [
      { id_staff: 15, cargo: "ENCARGADO_SALA" },
      { id_staff: 20, cargo: "ASEO" },
      { id_staff: 25, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 27,
    id_sala: 4,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 18 años", edad_minima: 18 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" },
      { id_staff: 28, cargo: "SEGURIDAD" }
    ]
  },
  {
    id_funcion: 28,
    id_sala: 4,
    caracteristicas_especiales: ["FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 29,
    id_sala: 4,
    caracteristicas_especiales: ["SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector digital 4K con lámpara revisada y enfoque verificado antes de abrir puertas", resolucion: "4K" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" },
      { categoria: "ATENCION", descripcion: "Verificar documento de identidad en el ingreso; público mayor de 15 años", edad_minima: 15 }
    ],
    personal_asignado: [
      { id_staff: 16, cargo: "ENCARGADO_SALA" },
      { id_staff: 21, cargo: "ASEO" },
      { id_staff: 26, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 30,
    id_sala: 5,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 90, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SALA", descripcion: "Temperatura de la sala entre 21 y 23 grados antes del ingreso del público", temperatura_c: 22 },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 17, cargo: "ENCARGADO_SALA" },
      { id_staff: 22, cargo: "ASEO" },
      { id_staff: 27, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 31,
    id_sala: 5,
    caracteristicas_especiales: ["3D", "FUNCION_FAMILIAR"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 90, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "ATENCION", descripcion: "Reservar filas preferenciales para menores acompañados y permitir ingreso con cochecitos", edad_maxima_sugerida: 12 }
    ],
    personal_asignado: [
      { id_staff: 17, cargo: "ENCARGADO_SALA" },
      { id_staff: 22, cargo: "ASEO" },
      { id_staff: 27, cargo: "PROYECCIONISTA" }
    ]
  },
  {
    id_funcion: 32,
    id_sala: 5,
    caracteristicas_especiales: ["3D", "SUBTITULADA"],
    requisitos: [
      { categoria: "PROYECCION", descripcion: "Proyector con sistema 3D activo calibrado y gafas desinfectadas para todo el aforo", gafas_requeridas: 90, tecnologia: "3D activo" },
      { categoria: "AUDIO", descripcion: "Sonido envolvente 7.1 con prueba de canales antes de la función", canales: "7.1" },
      { categoria: "SUBTITULOS", descripcion: "Subtítulos en español sincronizados con el archivo de la película", idioma: "Español", tamano_fuente: "mediano" }
    ],
    personal_asignado: [
      { id_staff: 17, cargo: "ENCARGADO_SALA" },
      { id_staff: 22, cargo: "ASEO" },
      { id_staff: 27, cargo: "PROYECCIONISTA" }
    ]
  }
]);
print("requisitos_proyeccion: " + db.requisitos_proyeccion.countDocuments({}) + " documentos");


// =====================================================================
// SECCIÓN 3 · resenas_peliculas  (Julián)
// =====================================================================
db.resenas_peliculas.deleteMany({});

db.resenas_peliculas.insertMany([
  {
    id_venta: 1,
    id_espectador: 18,
    id_funcion: 1,
    id_pelicula: 1,
    titulo_pelicula: "La Ruta del Colibrí",
    calificacion: 5,
    texto: "Muy bonita para ver en familia, a mis sobrinos les encantó.",
    fecha_resena: ISODate("2026-09-27T18:10:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["familiar"],
    votos_utiles: 4
  },
  {
    id_venta: 2,
    id_espectador: 6,
    id_funcion: 1,
    id_pelicula: 1,
    titulo_pelicula: "La Ruta del Colibrí",
    calificacion: 3,
    texto: "La película estaba bien, pero la fila en taquilla fue muy larga y entramos tarde.",
    fecha_resena: ISODate("2026-09-27T21:00:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 1,
      texto: "Gracias por contarnos, Sebastián. Vamos a abrir otra taquilla los fines de semana.",
      fecha: ISODate("2026-09-28T09:30:00-05:00")
    }
  },
  {
    id_venta: 3,
    id_espectador: 1,
    id_funcion: 2,
    id_pelicula: 2,
    titulo_pelicula: "Noche en Villa Esperanza",
    calificacion: 4,
    texto: "Buena historia y los actores muy bien. Los subtítulos se leían bien.",
    fecha_resena: ISODate("2026-09-28T08:45:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["drama", "subtitulada"]
  },
  {
    id_venta: 4,
    id_espectador: 22,
    id_funcion: 2,
    id_pelicula: 2,
    titulo_pelicula: "Noche en Villa Esperanza",
    calificacion: 2,
    texto: "Se me hizo muy lenta, casi me duermo en la mitad.",
    fecha_resena: ISODate("2026-09-28T12:00:00-05:00"),
    estado: "PUBLICADA",
    votos_utiles: 1
  },
  {
    id_venta: 5,
    id_espectador: 7,
    id_funcion: 3,
    id_pelicula: 3,
    titulo_pelicula: "Papá en Apuros",
    calificacion: 5,
    texto: "Me reí toda la película, muy buena comedia.",
    fecha_resena: ISODate("2026-10-03T19:20:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["comedia"],
    votos_utiles: 6
  },
  {
    id_venta: 6,
    id_espectador: 19,
    id_funcion: 3,
    id_pelicula: 3,
    titulo_pelicula: "Papá en Apuros",
    calificacion: 4,
    texto: "Divertida, aunque el sonido se cortó un momento.",
    fecha_resena: ISODate("2026-10-03T20:05:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 2,
      texto: "Gracias, Sofía. Ya revisamos el sonido de la sala 1.",
      fecha: ISODate("2026-10-04T10:00:00-05:00")
    }
  },
  {
    id_venta: 7,
    id_espectador: 20,
    id_funcion: 4,
    id_pelicula: 4,
    titulo_pelicula: "Galaxia Nómada",
    calificacion: 5,
    texto: "El 3D se veía increíble, valió la pena.",
    fecha_resena: ISODate("2026-09-26T18:30:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["3D", "efectos"],
    votos_utiles: 8
  },
  {
    id_venta: 8,
    id_espectador: 8,
    id_funcion: 4,
    id_pelicula: 4,
    titulo_pelicula: "Galaxia Nómada",
    calificacion: 3,
    texto: "La película bien, pero las crispetas estaban frías.",
    fecha_resena: ISODate("2026-09-26T19:00:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 1,
      texto: "Hola, Andrés. Lamentamos lo de las crispetas, ya hablamos con el personal de dulcería.",
      fecha: ISODate("2026-09-27T10:15:00-05:00")
    }
  },
  {
    id_venta: 10,
    id_espectador: 3,
    id_funcion: 5,
    id_pelicula: 5,
    titulo_pelicula: "Océano Profundo",
    calificacion: 4,
    texto: "Muy buena aunque un poco larga. El sonido se cortó unos minutos.",
    fecha_resena: ISODate("2026-09-27T09:00:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["3D"]
  },
  {
    id_venta: 11,
    id_espectador: 10,
    id_funcion: 5,
    id_pelicula: 5,
    titulo_pelicula: "Océano Profundo",
    calificacion: 1,
    texto: "Muy aburrida y encima se dañó el sonido. No la recomiendo.",
    fecha_resena: ISODate("2026-09-27T11:30:00-05:00"),
    estado: "PUBLICADA",
    votos_utiles: 2
  },
  {
    id_venta: 12,
    id_espectador: 27,
    id_funcion: 5,
    id_pelicula: 5,
    titulo_pelicula: "Océano Profundo",
    calificacion: 5,
    texto: "Las escenas debajo del agua en 3D son lo mejor de la película.",
    fecha_resena: ISODate("2026-09-28T15:00:00-05:00"),
    estado: "PUBLICADA"
  },
  {
    id_venta: 13,
    id_espectador: 21,
    id_funcion: 6,
    id_pelicula: 6,
    titulo_pelicula: "Aventuras en el Bosque Encantado",
    calificacion: 2,
    texto: "A los niños les gustó, pero la sala estaba sucia cuando entramos.",
    fecha_resena: ISODate("2026-10-04T17:00:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["aseo"],
    respuesta_empresa: {
      id_staff: 2,
      texto: "Hola, Salomé. Tienes razón, ya reforzamos el aseo entre funciones.",
      fecha: ISODate("2026-10-05T09:00:00-05:00")
    }
  },
  {
    id_venta: 14,
    id_espectador: 28,
    id_funcion: 6,
    id_pelicula: 6,
    titulo_pelicula: "Aventuras en el Bosque Encantado",
    calificacion: 4,
    texto: "Buena para niños pequeños, el 3D les encantó.",
    fecha_resena: ISODate("2026-10-04T18:20:00-05:00"),
    estado: "PUBLICADA"
  },
  {
    id_venta: 15,
    id_espectador: 13,
    id_funcion: 7,
    id_pelicula: 7,
    titulo_pelicula: "El Jardín de Cristal",
    calificacion: 5,
    texto: "La sala VIP es muy cómoda y la película es hermosa.",
    fecha_resena: ISODate("2026-09-28T22:00:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["VIP"],
    votos_utiles: 3
  },
  {
    id_venta: 16,
    id_espectador: 24,
    id_funcion: 7,
    id_pelicula: 7,
    titulo_pelicula: "El Jardín de Cristal",
    calificacion: 3,
    texto: "La historia está bien, pero hacía mucho calor en la sala.",
    fecha_resena: ISODate("2026-09-29T08:30:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 1,
      texto: "Gracias, Alejandro. Ese día falló el aire acondicionado y ya se arregló.",
      fecha: ISODate("2026-09-29T14:00:00-05:00")
    }
  },
  {
    id_venta: 18,
    id_espectador: 12,
    id_funcion: 8,
    id_pelicula: 8,
    titulo_pelicula: "Tormenta Roja",
    calificacion: 2,
    texto: "Pedí comida a la silla y llegó cuando la película ya había empezado.",
    fecha_resena: ISODate("2026-10-03T09:15:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 1,
      texto: "Hola, Felipe. Te pedimos disculpas, por eso te dimos un bono de dulcería.",
      fecha: ISODate("2026-10-03T12:00:00-05:00")
    }
  },
  {
    id_venta: 19,
    id_espectador: 29,
    id_funcion: 8,
    id_pelicula: 8,
    titulo_pelicula: "Tormenta Roja",
    calificacion: 5,
    texto: "Mucha acción, de las mejores películas que he visto este año.",
    fecha_resena: ISODate("2026-10-03T10:00:00-05:00"),
    estado: "PUBLICADA",
    votos_utiles: 5
  },
  {
    id_venta: 20,
    id_espectador: 9,
    id_funcion: 8,
    id_pelicula: 8,
    titulo_pelicula: "Tormenta Roja",
    calificacion: 4,
    texto: "Buena película, pero dos personas estaban discutiendo atrás.",
    fecha_resena: ISODate("2026-10-03T13:40:00-05:00"),
    estado: "PUBLICADA"
  },
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
      texto: "Gracias, Gabriela. Nos alegra que disfrutaras la experiencia en sala VIP.",
      fecha: ISODate("2026-10-05T09:00:00-05:00")
    }
  },
  {
    id_venta: 22,
    id_espectador: 30,
    id_funcion: 9,
    id_pelicula: 9,
    titulo_pelicula: "Código Aurora",
    calificacion: 3,
    texto: "Al principio el 3D se veía desenfocado, después lo arreglaron.",
    fecha_resena: ISODate("2026-10-04T15:00:00-05:00"),
    estado: "EN_REVISION"
  },
  {
    id_venta: 23,
    id_espectador: 4,
    id_funcion: 10,
    id_pelicula: 10,
    titulo_pelicula: "Cenizas de Julio",
    calificacion: 2,
    texto: "Unas personas estaban haciendo ruido y nadie del cine les dijo nada.",
    fecha_resena: ISODate("2026-09-30T08:00:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 2,
      texto: "Gracias por avisarnos, Mateo. Vamos a pedir al personal que esté más pendiente.",
      fecha: ISODate("2026-09-30T15:30:00-05:00")
    }
  },
  {
    id_venta: 24,
    id_espectador: 25,
    id_funcion: 10,
    id_pelicula: 10,
    titulo_pelicula: "Cenizas de Julio",
    calificacion: 4,
    texto: "Película muy emotiva. Sonó una alarma pero salimos rápido y todo salió bien.",
    fecha_resena: ISODate("2026-09-30T19:00:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["drama"]
  },
  {
    id_venta: 26,
    id_espectador: 11,
    id_funcion: 11,
    id_pelicula: 11,
    titulo_pelicula: "El Silencio del Valle",
    calificacion: 2,
    texto: "El proyector se apagó en la mitad y nadie explicó qué estaba pasando.",
    fecha_resena: ISODate("2026-10-02T09:00:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 1,
      texto: "Hola, Mariana. Fue una falla del proyector, por eso te dimos una boleta de cortesía.",
      fecha: ISODate("2026-10-02T11:00:00-05:00")
    }
  },
  {
    id_venta: 27,
    id_espectador: 15,
    id_funcion: 11,
    id_pelicula: 11,
    titulo_pelicula: "El Silencio del Valle",
    calificacion: 1,
    texto: "Pésimo todo, el que atendía la sala era un inútil.",
    fecha_resena: ISODate("2026-10-02T10:30:00-05:00"),
    estado: "OCULTA"
  },
  {
    id_venta: 28,
    id_espectador: 18,
    id_funcion: 12,
    id_pelicula: 12,
    titulo_pelicula: "Mi Abuela la Hechicera",
    calificacion: 5,
    texto: "Muy divertida, la vi con mi abuela y nos encantó.",
    fecha_resena: ISODate("2026-10-04T14:00:00-05:00"),
    estado: "PUBLICADA",
    votos_utiles: 2
  },
  {
    id_venta: 29,
    id_espectador: 26,
    id_funcion: 12,
    id_pelicula: 12,
    titulo_pelicula: "Mi Abuela la Hechicera",
    calificacion: 4,
    texto: "Bonita para ver en familia. Lo malo es que en taquilla no recibían tarjeta.",
    fecha_resena: ISODate("2026-10-04T15:30:00-05:00"),
    estado: "PUBLICADA"
  },
  {
    id_venta: 30,
    id_espectador: 5,
    id_funcion: 13,
    id_pelicula: 13,
    titulo_pelicula: "Rumbo a Marte",
    calificacion: 3,
    texto: "Buena película, pero el combo me llegó sin la bebida.",
    fecha_resena: ISODate("2026-10-03T20:00:00-05:00"),
    estado: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 2,
      texto: "Gracias, Isabella. Ya hablamos con dulcería para que no vuelva a pasar.",
      fecha: ISODate("2026-10-04T09:00:00-05:00")
    }
  },
  {
    id_venta: 32,
    id_espectador: 21,
    id_funcion: 13,
    id_pelicula: 13,
    titulo_pelicula: "Rumbo a Marte",
    calificacion: 5,
    texto: "Me encantó, los efectos en 3D son muy buenos.",
    fecha_resena: ISODate("2026-10-04T08:00:00-05:00"),
    estado: "PUBLICADA",
    etiquetas: ["3D", "efectos"]
  },
  {
    id_venta: 33,
    id_espectador: 17,
    id_funcion: 14,
    id_pelicula: 14,
    titulo_pelicula: "Dragones del Alba",
    calificacion: 4,
    texto: "Los dragones en 3D se ven muy reales.",
    fecha_resena: ISODate("2026-10-04T19:30:00-05:00"),
    estado: "PUBLICADA",
    votos_utiles: 1
  },
  {
    id_venta: 34,
    id_espectador: 32,
    id_funcion: 14,
    id_pelicula: 14,
    titulo_pelicula: "Dragones del Alba",
    calificacion: 1,
    texto: "La función se retrasó casi 40 minutos por un daño del proyector.",
    fecha_resena: ISODate("2026-10-04T20:00:00-05:00"),
    estado: "EN_REVISION"
  }
]);

print("resenas_peliculas: " + db.resenas_peliculas.countDocuments({}) + " documentos");


// =====================================================================
// SECCIÓN 4 · reportes_incidentes  (Julián)
// =====================================================================
db.reportes_incidentes.deleteMany({});

db.reportes_incidentes.insertMany([
  // Fallas técnicas (las reporta el proyeccionista de la sala)
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
      { fecha: ISODate("2026-10-02T10:00:00-05:00"), id_staff: 1, accion: "Se programa mantenimiento preventivo" }
    ]
  },
  {
    codigo: "INC-2026-002",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-09-26T20:15:00-05:00"),
    id_funcion: 5,
    id_sala: 2,
    id_staff_reporta: 24,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Se cortó el sonido de la sala durante unos minutos.",
    detalle: { equipo: "SONIDO", minutos_interrupcion: 5 },
    seguimiento: [
      { fecha: ISODate("2026-09-26T20:20:00-05:00"), id_staff: 24, accion: "Se reinició el amplificador" }
    ]
  },
  {
    codigo: "INC-2026-003",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-03T19:20:00-05:00"),
    id_funcion: 9,
    id_sala: 3,
    id_staff_reporta: 25,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "La imagen 3D se veía desenfocada al inicio de la película.",
    detalle: { equipo: "PROYECTOR", minutos_interrupcion: 4, requirio_reprogramacion: false },
    seguimiento: [
      { fecha: ISODate("2026-10-03T19:24:00-05:00"), id_staff: 25, accion: "Se volvió a calibrar el modo 3D" }
    ]
  },
  {
    codigo: "INC-2026-004",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-09-28T18:50:00-05:00"),
    id_funcion: 7,
    id_sala: 3,
    id_staff_reporta: 25,
    prioridad: "BAJA",
    estado: "CERRADO",
    descripcion: "El aire acondicionado dejó de enfriar y la sala se calentó.",
    detalle: { equipo: "CLIMATIZACION", minutos_interrupcion: 0, repuesto: "Filtro del aire acondicionado" },
    seguimiento: [
      { fecha: ISODate("2026-09-29T09:00:00-05:00"), id_staff: 2, accion: "Técnico cambia el filtro del aire" }
    ]
  },
  {
    codigo: "INC-2026-005",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-03T17:45:00-05:00"),
    id_funcion: 13,
    id_sala: 5,
    id_staff_reporta: 27,
    prioridad: "BAJA",
    estado: "CERRADO",
    descripcion: "Las luces del pasillo se encendieron solas durante la película.",
    detalle: { equipo: "ILUMINACION", minutos_interrupcion: 3 }
  },
  {
    codigo: "INC-2026-006",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-04T16:20:00-05:00"),
    id_funcion: 14,
    id_sala: 5,
    id_staff_reporta: 27,
    prioridad: "CRITICA",
    estado: "CERRADO",
    descripcion: "Se fundió la lámpara del proyector y hubo que cambiarla.",
    detalle: {
      equipo: "PROYECTOR",
      minutos_interrupcion: 35,
      requirio_reprogramacion: true,
      repuesto: "Lámpara del proyector"
    },
    seguimiento: [
      { fecha: ISODate("2026-10-04T16:25:00-05:00"), id_staff: 27, accion: "Se avisa al encargado de sala" },
      { fecha: ISODate("2026-10-04T16:55:00-05:00"), id_staff: 27, accion: "Se cambia la lámpara y se reanuda la función" }
    ]
  },
  {
    codigo: "INC-2026-007",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-03T16:40:00-05:00"),
    id_funcion: 3,
    id_sala: 1,
    id_staff_reporta: 23,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "El parlante izquierdo dejó de sonar.",
    detalle: { equipo: "SONIDO", minutos_interrupcion: 7 },
    seguimiento: [
      { fecha: ISODate("2026-10-03T16:47:00-05:00"), id_staff: 23, accion: "Se ajustó el cable del parlante" }
    ]
  },
  {
    codigo: "INC-2026-008",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-06T15:10:00-05:00"),
    id_funcion: 15,
    id_sala: 4,
    id_staff_reporta: 26,
    prioridad: "BAJA",
    estado: "EN_PROCESO",
    descripcion: "Se soltó un borde de la pantalla y se ve una arruga.",
    detalle: { equipo: "PANTALLA", minutos_interrupcion: 0 },
    seguimiento: [
      { fecha: ISODate("2026-10-07T09:00:00-05:00"), id_staff: 2, accion: "Se pide visita del técnico de pantallas" }
    ]
  },
  {
    codigo: "INC-2026-009",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-05T10:30:00-05:00"),
    id_sala: 2,
    id_staff_reporta: 24,
    prioridad: "MEDIA",
    estado: "EN_PROCESO",
    descripcion: "En la revisión de la mañana el aire acondicionado no encendió.",
    detalle: { equipo: "CLIMATIZACION", minutos_interrupcion: 0 }
  },
  {
    codigo: "INC-2026-010",
    tipo_incidente: "FALLA_TECNICA",
    fecha_hora: ISODate("2026-10-07T10:00:00-05:00"),
    id_sala: 1,
    id_staff_reporta: 23,
    prioridad: "ALTA",
    estado: "ABIERTO",
    descripcion: "Las luces de emergencia de la sala no prenden.",
    detalle: { equipo: "ILUMINACION", minutos_interrupcion: 0 }
  },

  // Quejas de servicio
  {
    codigo: "INC-2026-011",
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
  },
  {
    codigo: "INC-2026-012",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-09-27T15:05:00-05:00"),
    id_funcion: 1,
    id_sala: 1,
    id_staff_reporta: 3,
    prioridad: "BAJA",
    estado: "CERRADO",
    descripcion: "El espectador entró tarde a la función por la fila de la taquilla.",
    detalle: { area: "TAQUILLA", motivo: "Fila muy larga", id_espectador: 6, id_venta: 2 },
    seguimiento: [
      { fecha: ISODate("2026-09-28T09:30:00-05:00"), id_staff: 1, accion: "Se decide abrir otra taquilla los fines de semana" }
    ]
  },
  {
    codigo: "INC-2026-013",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-09-26T15:40:00-05:00"),
    id_funcion: 4,
    id_sala: 2,
    id_staff_reporta: 8,
    prioridad: "BAJA",
    estado: "CERRADO",
    descripcion: "El espectador dice que las crispetas estaban frías.",
    detalle: {
      area: "DULCERIA",
      motivo: "Producto en mal estado",
      id_espectador: 8,
      id_venta: 8,
      compensacion: { tipo: "CAMBIO_PRODUCTO", valor: 9000 }
    }
  },
  {
    codigo: "INC-2026-014",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-09-29T19:10:00-05:00"),
    id_funcion: 10,
    id_sala: 4,
    id_staff_reporta: 16,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Un espectador se queja porque otros hacían ruido y nadie los calló.",
    detalle: { area: "SALA", motivo: "Ruido de otros espectadores", id_espectador: 4, id_venta: 23 },
    seguimiento: [
      { fecha: ISODate("2026-09-29T19:15:00-05:00"), id_staff: 16, accion: "Se pidió silencio a las personas" }
    ]
  },
  {
    codigo: "INC-2026-015",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-10-04T14:10:00-05:00"),
    id_funcion: 6,
    id_sala: 2,
    id_staff_reporta: 14,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "La sala tenía restos de comida de la función anterior.",
    detalle: {
      area: "ASEO",
      motivo: "Sala sucia",
      id_espectador: 21,
      id_venta: 13,
      compensacion: { tipo: "BONO_DULCERIA", valor: 10000 }
    },
    seguimiento: [
      { fecha: ISODate("2026-10-04T14:15:00-05:00"), id_staff: 19, accion: "Aseo limpia la zona de la sala" },
      { fecha: ISODate("2026-10-05T09:00:00-05:00"), id_staff: 2, accion: "Se agrega una revisión de aseo entre funciones" }
    ]
  },
  {
    codigo: "INC-2026-016",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-10-04T11:05:00-05:00"),
    id_funcion: 12,
    id_sala: 4,
    id_staff_reporta: 4,
    prioridad: "BAJA",
    estado: "EN_PROCESO",
    descripcion: "En taquilla no se podía pagar con tarjeta.",
    detalle: { area: "TAQUILLA", motivo: "Datáfono dañado", id_espectador: 26 }
  },
  {
    codigo: "INC-2026-017",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-10-03T17:10:00-05:00"),
    id_funcion: 13,
    id_sala: 5,
    id_staff_reporta: 9,
    prioridad: "BAJA",
    estado: "CERRADO",
    descripcion: "Al combo le faltaba la bebida.",
    detalle: {
      area: "DULCERIA",
      motivo: "Pedido incompleto",
      id_espectador: 5,
      id_venta: 30,
      compensacion: { tipo: "REPOSICION", valor: 6000 }
    }
  },
  {
    codigo: "INC-2026-018",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-10-01T21:55:00-05:00"),
    id_funcion: 11,
    id_sala: 4,
    id_staff_reporta: 16,
    prioridad: "ALTA",
    estado: "CERRADO",
    descripcion: "No se avisó a los espectadores qué pasaba cuando se apagó el proyector.",
    detalle: {
      area: "SALA",
      motivo: "Falta de información durante la falla",
      id_espectador: 11,
      id_venta: 26,
      compensacion: { tipo: "BOLETA_CORTESIA", valor: 18000 }
    },
    seguimiento: [
      { fecha: ISODate("2026-10-02T10:00:00-05:00"), id_staff: 1, accion: "Se entrega boleta de cortesía" }
    ]
  },
  {
    codigo: "INC-2026-019",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-10-04T16:30:00-05:00"),
    id_funcion: 14,
    id_sala: 5,
    id_staff_reporta: 17,
    prioridad: "ALTA",
    estado: "CERRADO",
    descripcion: "El espectador se queja porque la función se retrasó por el daño del proyector.",
    detalle: {
      area: "SALA",
      motivo: "Retraso de la función",
      id_espectador: 32,
      id_venta: 34,
      compensacion: { tipo: "BOLETA_CORTESIA", valor: 18000 }
    }
  },
  {
    codigo: "INC-2026-020",
    tipo_incidente: "QUEJA_SERVICIO",
    fecha_hora: ISODate("2026-10-06T14:40:00-05:00"),
    id_funcion: 15,
    id_sala: 4,
    id_staff_reporta: 16,
    prioridad: "BAJA",
    estado: "ABIERTO",
    descripcion: "El baño cerca de la sala 4 no tenía papel.",
    detalle: { area: "ASEO", motivo: "Baño sin papel" }
  },

  // Incidentes de seguridad (28 turno mañana, 29 tarde, 30 noche)
  {
    codigo: "INC-2026-021",
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
  },
  {
    codigo: "INC-2026-022",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-10-04T11:40:00-05:00"),
    id_funcion: 12,
    id_sala: 4,
    id_staff_reporta: 28,
    prioridad: "CRITICA",
    estado: "CERRADO",
    descripcion: "Una persona se desmayó dentro de la sala.",
    detalle: {
      subtipo: "EMERGENCIA_MEDICA",
      autoridades_notificadas: false,
      personas_involucradas: 1,
      acciones_tomadas: ["Primeros auxilios", "Se llamó a una ambulancia"]
    },
    seguimiento: [
      { fecha: ISODate("2026-10-04T12:10:00-05:00"), id_staff: 28, accion: "La ambulancia se llevó a la persona" }
    ]
  },
  {
    codigo: "INC-2026-023",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-10-02T21:15:00-05:00"),
    id_funcion: 8,
    id_sala: 3,
    id_staff_reporta: 30,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Dos espectadores empezaron a discutir porque uno hablaba por celular.",
    detalle: {
      subtipo: "ALTERCADO",
      autoridades_notificadas: false,
      personas_involucradas: 2,
      acciones_tomadas: ["Se separó a las personas"]
    }
  },
  {
    codigo: "INC-2026-024",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-09-26T16:00:00-05:00"),
    id_funcion: 4,
    id_sala: 2,
    id_staff_reporta: 29,
    prioridad: "ALTA",
    estado: "CERRADO",
    descripcion: "Le robaron el celular a un espectador durante la película.",
    detalle: {
      subtipo: "ROBO",
      autoridades_notificadas: true,
      personas_involucradas: 1,
      acciones_tomadas: ["Se revisaron las cámaras", "Se llamó a la policía"]
    },
    seguimiento: [
      { fecha: ISODate("2026-09-26T17:30:00-05:00"), id_staff: 29, accion: "Se entregó el video de las cámaras a la policía" }
    ]
  },
  {
    codigo: "INC-2026-025",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-09-29T19:45:00-05:00"),
    id_funcion: 10,
    id_sala: 4,
    id_staff_reporta: 30,
    prioridad: "CRITICA",
    estado: "CERRADO",
    descripcion: "Sonó la alarma de humo y se sacó a todos de la sala por 10 minutos. Fue una falsa alarma.",
    detalle: {
      subtipo: "EVACUACION",
      autoridades_notificadas: true,
      acciones_tomadas: ["Se evacuó la sala", "Revisaron los bomberos", "Se reanudó la función"]
    }
  },
  {
    codigo: "INC-2026-026",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-09-28T19:10:00-05:00"),
    id_funcion: 7,
    id_sala: 3,
    id_staff_reporta: 30,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Una persona grababa partes de la película con el celular.",
    detalle: {
      subtipo: "GRABACION_ILEGAL",
      autoridades_notificadas: false,
      personas_involucradas: 1,
      acciones_tomadas: ["Se pidió borrar el video"]
    }
  },
  {
    codigo: "INC-2026-027",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-10-03T16:50:00-05:00"),
    id_funcion: 3,
    id_sala: 1,
    id_staff_reporta: 29,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Un niño se cayó en las escaleras de la sala.",
    detalle: {
      subtipo: "EMERGENCIA_MEDICA",
      autoridades_notificadas: false,
      personas_involucradas: 1,
      acciones_tomadas: ["Primeros auxilios"]
    }
  },
  {
    codigo: "INC-2026-028",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-10-04T17:00:00-05:00"),
    id_funcion: 14,
    id_sala: 5,
    id_staff_reporta: 29,
    prioridad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Un espectador molesto por el retraso le gritó al encargado de la sala.",
    detalle: {
      subtipo: "ALTERCADO",
      autoridades_notificadas: false,
      personas_involucradas: 1
    }
  },
  {
    codigo: "INC-2026-029",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-10-03T17:50:00-05:00"),
    id_funcion: 13,
    id_sala: 5,
    id_staff_reporta: 29,
    prioridad: "ALTA",
    estado: "CERRADO",
    descripcion: "Una persona intentó llevarse un bolso que no era suyo.",
    detalle: {
      subtipo: "ROBO",
      autoridades_notificadas: true,
      personas_involucradas: 2,
      acciones_tomadas: ["Se detuvo a la persona", "Se llamó a la policía"]
    }
  },
  {
    codigo: "INC-2026-030",
    tipo_incidente: "SEGURIDAD",
    fecha_hora: ISODate("2026-10-06T15:30:00-05:00"),
    id_funcion: 15,
    id_sala: 4,
    id_staff_reporta: 29,
    prioridad: "MEDIA",
    estado: "EN_PROCESO",
    descripcion: "Un espectador dice que le robaron la chaqueta que dejó en la sala.",
    detalle: {
      subtipo: "ROBO",
      autoridades_notificadas: false,
      personas_involucradas: 1
    },
    seguimiento: [
      { fecha: ISODate("2026-10-06T17:00:00-05:00"), id_staff: 29, accion: "Se están revisando las cámaras" }
    ]
  }
]);

print("reportes_incidentes: " + db.reportes_incidentes.countDocuments({}) + " documentos");
