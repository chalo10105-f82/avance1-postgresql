// 01_creacion_colecciones.js
// Bosque Cinema - Avance 2
// Crea las 4 colecciones con validación $jsonSchema e índices.
// Se puede ejecutar varias veces: borra cada colección antes de crearla.

db = db.getSiblingDB("bosque_cinema");

// ---------- 1. fichas_tecnicas_peliculas ----------
db.getCollection("fichas_tecnicas_peliculas").drop();
db.createCollection("fichas_tecnicas_peliculas", {
  validator: { $jsonSchema: {
    bsonType: "object",
    required: ["id_pelicula", "titulo_pelicula", "estado", "genero", "sinopsis",
               "anio_estreno", "pais_origen", "elenco", "versiones",
               "idioma_original", "idiomas_audio", "clasificacion_por_pais"],
    properties: {
      id_pelicula: { bsonType: "int" },
      titulo_pelicula: { bsonType: "string" },
      estado: { enum: ["EN_CARTELERA", "PROXIMO_ESTRENO"] },
      genero: { bsonType: "array", items: { bsonType: "string" } },
      sinopsis: { bsonType: "string" },
      anio_estreno: { bsonType: "int" },
      pais_origen: { bsonType: "string" },
      elenco: {
        bsonType: "array",
        minItems: 1,
        items: {
          bsonType: "object",
          required: ["id_actor_director", "rol", "principal"],
          properties: {
            id_actor_director: { bsonType: "int" },
            rol: { enum: ["DIRECTOR", "PROTAGONISTA", "REPARTO"] },
            personaje: { bsonType: "string" },
            principal: { bsonType: "bool" }
          }
        }
      },
      versiones: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["formato", "version_idioma", "duracion_min"],
          properties: {
            formato: { enum: ["2D", "3D"] },
            version_idioma: { enum: ["DOBLADA", "SUBTITULADA", "ORIGINAL"] },
            duracion_min: { bsonType: "int", minimum: 1 }
          }
        }
      },
      idioma_original: { bsonType: "string" },
      idiomas_audio: { bsonType: "array", items: { bsonType: "string" } },
      subtitulos: { bsonType: "array", items: { bsonType: "string" } },
      clasificacion_por_pais: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["pais", "clasificacion"],
          properties: {
            pais: { bsonType: "string" },
            clasificacion: { bsonType: "string" }
          }
        }
      },
      premios: { bsonType: "array", items: { bsonType: "string" } },
      saga: {
        bsonType: "object",
        properties: { nombre: { bsonType: "string" }, numero: { bsonType: "int" } }
      }
    }
  } }
});
