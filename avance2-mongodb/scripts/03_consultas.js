// 03_consultas.js
// Bosque Cinema - Avance 2 (MongoDB)
// 8 consultas sobre las 4 colecciones: 5 con aggregation pipeline y 3 con find.
// Son de solo lectura (no modifican datos), así que se pueden ejecutar las veces que se quiera.
// Requiere haber ejecutado antes 01_creacion_colecciones.js y 02_datos_prueba.js
// Cada consulta es un bloque independiente: se puede copiar y pegar sola en mongosh.

db = db.getSiblingDB("bosque_cinema");


// ---------------------------------------------------------------------
// CONSULTA 1 · AGGREGATION · resenas_peliculas
// Promedio de calificación y número de reseñas publicadas por película,
// de la mejor calificada a la peor.
// ---------------------------------------------------------------------
print("\n--- Consulta 1: promedio de calificación y número de reseñas por película ---");
printjson(db.resenas_peliculas.aggregate([
  { $match: { estado: "PUBLICADA" } },
  { $group: {
      _id: "$titulo_pelicula",
      promedio_calificacion: { $avg: "$calificacion" },
      total_resenas: { $sum: 1 }
  } },
  { $project: {
      _id: 0,
      pelicula: "$_id",
      promedio_calificacion: { $round: ["$promedio_calificacion", 2] },
      total_resenas: 1
  } },
  { $sort: { promedio_calificacion: -1, total_resenas: -1, pelicula: 1 } }
]).toArray());


// ---------------------------------------------------------------------
// CONSULTA 2 · AGGREGATION · reportes_incidentes
// Cantidad de incidentes por tipo y prioridad.
// ---------------------------------------------------------------------
print("\n--- Consulta 2: incidentes por tipo y prioridad ---");
printjson(db.reportes_incidentes.aggregate([
  { $group: {
      _id: { tipo_incidente: "$tipo_incidente", prioridad: "$prioridad" },
      total_incidentes: { $sum: 1 }
  } },
  { $project: {
      _id: 0,
      tipo_incidente: "$_id.tipo_incidente",
      prioridad: "$_id.prioridad",
      total_incidentes: 1
  } },
  { $sort: { tipo_incidente: 1, total_incidentes: -1, prioridad: 1 } }
]).toArray());


// ---------------------------------------------------------------------
// CONSULTA 3 · AGGREGATION · reportes_incidentes
// Minutos de interrupción por sala en fallas técnicas.
// La sala con más minutos perdidos aparece primero.
// ---------------------------------------------------------------------
print("\n--- Consulta 3: minutos de interrupción por sala (fallas técnicas) ---");
printjson(db.reportes_incidentes.aggregate([
  { $match: { tipo_incidente: "FALLA_TECNICA" } },
  { $group: {
      _id: "$id_sala",
      total_fallas: { $sum: 1 },
      minutos_totales: { $sum: "$detalle.minutos_interrupcion" },
      promedio_minutos: { $avg: "$detalle.minutos_interrupcion" }
  } },
  { $project: {
      _id: 0,
      id_sala: "$_id",
      total_fallas: 1,
      minutos_totales: 1,
      promedio_minutos: { $round: ["$promedio_minutos", 1] }
  } },
  { $sort: { minutos_totales: -1, id_sala: 1 } }
]).toArray());


// ---------------------------------------------------------------------
// CONSULTA 4 · AGGREGATION · fichas_tecnicas_peliculas
// Cuántas películas hay por clasificación en Colombia (CO).
// $unwind separa el arreglo clasificacion_por_pais en un documento por país.
// ---------------------------------------------------------------------
print("\n--- Consulta 4: películas por clasificación en Colombia ---");
printjson(db.fichas_tecnicas_peliculas.aggregate([
  { $unwind: "$clasificacion_por_pais" },
  { $match: { "clasificacion_por_pais.pais": "CO" } },
  { $group: {
      _id: "$clasificacion_por_pais.clasificacion",
      total_peliculas: { $sum: 1 },
      peliculas: { $push: "$titulo_pelicula" }
  } },
  { $project: { _id: 0, clasificacion_co: "$_id", total_peliculas: 1, peliculas: 1 } },
  { $sort: { total_peliculas: -1, clasificacion_co: 1 } }
]).toArray());


// ---------------------------------------------------------------------
// CONSULTA 5 · FIND · resenas_peliculas
// Reseñas publicadas y negativas (calificación de 1 o 2) a las que la empresa
// todavía no ha respondido. $exists: false busca los documentos sin ese campo.
// Se excluyen las ocultas o en revisión, porque a esas no hay que responderles.
// ---------------------------------------------------------------------
print("\n--- Consulta 5: reseñas publicadas negativas sin respuesta de la empresa ---");
printjson(db.resenas_peliculas.find(
  { estado: "PUBLICADA", calificacion: { $lte: 2 }, respuesta_empresa: { $exists: false } },
  { _id: 0, id_venta: 1, titulo_pelicula: 1, calificacion: 1, texto: 1, estado: 1 }
).sort({ fecha_resena: -1 }).limit(10).toArray());


// ---------------------------------------------------------------------
// CONSULTA 6 · FIND · requisitos_proyeccion
// Funciones 3D que necesitan gafas. $elemMatch exige que la misma categoría
// de requisito cumpla las dos condiciones a la vez (PROYECCION y mencionar gafas).
// Se muestran las primeras 5 y se imprime el total.
// ---------------------------------------------------------------------
print("\n--- Consulta 6: funciones 3D que requieren gafas ---");
const filtro3dGafas = {
  caracteristicas_especiales: "3D",
  requisitos: { $elemMatch: { categoria: "PROYECCION", descripcion: /gafas/i } }
};
printjson(db.requisitos_proyeccion.find(
  filtro3dGafas,
  { _id: 0, id_funcion: 1, id_sala: 1, caracteristicas_especiales: 1 }
).sort({ id_funcion: 1 }).limit(5).toArray());
print("Total de funciones 3D con gafas: " + db.requisitos_proyeccion.countDocuments(filtro3dGafas));


// ---------------------------------------------------------------------
// CONSULTA 7 · AGGREGATION con $lookup · resenas_peliculas + fichas_tecnicas_peliculas
// Reseñas publicadas con datos de la ficha de la película. Une las dos
// colecciones por el identificador compartido id_pelicula.
// ---------------------------------------------------------------------
print("\n--- Consulta 7: reseñas con los datos de la ficha de la película ---");
printjson(db.resenas_peliculas.aggregate([
  { $match: { estado: "PUBLICADA" } },
  { $lookup: {
      from: "fichas_tecnicas_peliculas",
      localField: "id_pelicula",
      foreignField: "id_pelicula",
      as: "ficha"
  } },
  { $unwind: "$ficha" },
  { $project: {
      _id: 0,
      id_venta: 1,
      titulo_pelicula: 1,
      calificacion: 1,
      genero: "$ficha.genero",
      pais_origen: "$ficha.pais_origen",
      estado_pelicula: "$ficha.estado"
  } },
  { $sort: { calificacion: -1, id_venta: 1 } },
  { $limit: 5 }
]).toArray());


// ---------------------------------------------------------------------
// CONSULTA 8 · FIND · fichas_tecnicas_peliculas
// Próximos estrenos que tendrán versión en 3D, con sus versiones.
// Filtra dentro del arreglo versiones con "versiones.formato".
// ---------------------------------------------------------------------
print("\n--- Consulta 8: próximos estrenos con versión 3D ---");
printjson(db.fichas_tecnicas_peliculas.find(
  { estado: "PROXIMO_ESTRENO", "versiones.formato": "3D" },
  { _id: 0, id_pelicula: 1, titulo_pelicula: 1, versiones: 1 }
).sort({ id_pelicula: 1 }).toArray());
