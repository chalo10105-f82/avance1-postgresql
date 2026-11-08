# Justificación ACID, BASE y CAP - Bosque Cinema

## ACID: lo que se queda en PostgreSQL
Las ventas, las funciones, las salas y los espectadores necesitan ACID.
- Atomicidad: Una venta se registra completa (boleta, silla y pago) o no se registra.
- Consistencia: No se rompen reglas como las llaves foráneas.
- Aislamiento: Dos espectadores no pueden comprar la misma silla al mismo tiempo.
- Durabilidad: Una venta confirmada no se pierde.

MongoDB también garantiza ACID, pero a nivel de un solo documento. Por eso en
reportes_incidentes el seguimiento va embebido: cerrar un incidente (cambiar el
estado y agregar la acción final) se hace en un solo updateOne con $set y $push,
y se aplica completo o no se aplica.

## BASE: lo que va a MongoDB
Las reseñas, las fichas técnicas, los requisitos y los incidentes no mueven dinero
y toleran pequeñas diferencias de tiempo.
- Basically Available: El sistema sigue respondiendo.
- Soft state: El estado puede cambiar por replicación entre nodos.
- Eventually consistent: Una lectura desde un nodo secundario puede mostrar
  datos ligeramente atrasados, pero todos los nodos terminan iguales.

Si una reseña tarda unos segundos en verse, no pasa nada grave.

## CAP
En un sistema distribuido, ante una falla de red hay que escoger entre
consistencia (C) y disponibilidad (A).
- PostgreSQL (un solo nodo) Prioriza la consistencia de las ventas.
- MongoDB Atlas Usa un replica set. Con la configuración por defecto, las
  escrituras van al nodo primario; si este falla, hay una elección y por un
  momento no se puede escribir. Prioriza consistencia sobre disponibilidad.
  Las lecturas desde secundarios son las que pueden estar levemente atrasadas.

## Caso de trade-off: reseña que apunta a una venta de otro motor
Cada reseña guarda el id_venta de PostgreSQL, pero entre dos motores no existen
llaves foráneas: MongoDB no puede comprobar que esa venta exista.

Dos opciones:
1. Validar en la aplicación antes de escribir (consistencia): Se comprueba en
   PostgreSQL que la venta existe y está pagada. Solo así se guarda la reseña.
2. Guardar siempre y reconciliar después (disponibilidad): La reseña se
   guarda aunque PostgreSQL no responda, y luego se revisan las huérfanas.

Decisión: La opción 1. La regla del negocio es que solo opina quien compró,
y una reseña sin venta, o con una venta anulada como la 35, rompe esa regla.
Costo: si PostgreSQL no está disponible en ese momento, no se puede publicar
la reseña. Se acepta menor disponibilidad a cambio de datos correctos.
