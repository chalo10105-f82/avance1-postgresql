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


// =====================================================================
// SECCIÓN 4 · reportes_incidentes  (Julián)
// =====================================================================
