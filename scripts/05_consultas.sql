-- CONSULTA 1
-- Tablas: ventas
-- Agrupa las ventas efectivas (PAGADA) por método de pago
-- para identificar los medios de pago más usados y el
-- volumen de dinero que ingresa por cada canal.

SELECT
    metodo_pago,
    COUNT(id_venta) AS total_transacciones,
    SUM(cantidad) AS total_boletas_vendidas,
    SUM(cantidad * precio_unitario) AS recaudo_total
FROM ventas
WHERE estado = 'PAGADA'
GROUP BY metodo_pago
ORDER BY recaudo_total DESC;

-- CONSULTA 2
-- Tablas: funciones, salas
-- INNER JOIN entre las funciones programadas y las salas
-- para obtener la cartelera activa con la capacidad de
-- cada sala.

SELECT
    f.id_funcion,
    f.titulo_pelicula,
    f.clasificacion,
    f.formato,
    s.nombre,
    s.capacidad AS capacidad_sala,
    f.fecha_hora_inicio,
    f.estado AS estado_funcion
FROM funciones f
INNER JOIN salas s ON f.id_sala = s.id_sala
WHERE f.estado = 'PROGRAMADA'
ORDER BY f.fecha_hora_inicio ASC;

-- CONSULTA 3
-- Tablas: espectadores, ventas
-- Identifica a los clientes cuyas compras superan el
-- promedio general de boletas por transacción (subconsulta).
-- Útil para fidelización y campañas de marketing.

SELECT
    e.id_espectador,
    e.nombres || ' ' || e.apellidos AS nombre_completo,
    e.correo,
    v.id_venta,
    v.cantidad,
    v.precio_unitario
FROM espectadores e
INNER JOIN ventas v ON e.id_espectador = v.id_espectador
WHERE v.estado = 'PAGADA'
  AND v.cantidad > (
      SELECT AVG(cantidad)
      FROM ventas
      WHERE estado = 'PAGADA'
  )
ORDER BY v.cantidad DESC;

-- CONSULTA 4
-- Tablas: funciones, salas, ventas
-- Recaudo total por función con analítica avanzada:
-- RANK() particionado por formato (2D, 3D, etc.) y
-- ROW_NUMBER() para el ranking general de taquilla.

SELECT
    f.id_funcion,
    f.titulo_pelicula,
    f.formato,
    s.nombre,
    COALESCE(SUM(v.cantidad * v.precio_unitario), 0) AS recaudo_total,
    RANK() OVER (PARTITION BY f.formato ORDER BY SUM(v.cantidad * v.precio_unitario) DESC) AS ranking_formato,
    ROW_NUMBER() OVER (ORDER BY SUM(v.cantidad * v.precio_unitario) DESC) AS ranking_general
FROM funciones f
INNER JOIN salas s ON f.id_sala = s.id_sala
LEFT JOIN ventas v ON f.id_funcion = v.id_funcion AND v.estado = 'PAGADA'
GROUP BY f.id_funcion, f.titulo_pelicula, f.formato, s.nombre
ORDER BY recaudo_total DESC;
