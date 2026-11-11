-- =====================================================================
-- PRUEBAS PARA LAS EVIDENCIAS DEL AVANCE 1 (corrección del punto 5)
-- Ejecutar DESPUÉS de 01, 02, 03 y 04.
-- Cada prueba va entre BEGIN y ROLLBACK: muestra el error del trigger
-- y deja los datos como estaban.
-- Para cada captura: seleccionar el bloque, ejecutarlo y capturar
-- la sentencia junto con el mensaje de error o el resultado.
-- =====================================================================

-- TRIGGER 1: trg_validar_desactivar_sala
-- No se puede desactivar una sala con funciones programadas a futuro.
BEGIN;
INSERT INTO funciones (id_sala, id_actor_director, titulo_pelicula, clasificacion, formato, version_idioma, fecha_hora_inicio, fecha_hora_fin, estado)
VALUES (1, 3, 'La Ruta del Colibrí', 'T', '2D', 'DOBLADA', CURRENT_DATE + 30 + TIME '15:00', CURRENT_DATE + 30 + TIME '16:35', 'PROGRAMADA');
UPDATE salas SET estado = 'INACTIVA' WHERE id_sala = 1;
ROLLBACK;

-- TRIGGER 2: trg_validar_desactivar_actor_director
-- No se puede desactivar un actor/director con funciones programadas a futuro.
BEGIN;
INSERT INTO funciones (id_sala, id_actor_director, titulo_pelicula, clasificacion, formato, version_idioma, fecha_hora_inicio, fecha_hora_fin, estado)
VALUES (1, 3, 'La Ruta del Colibrí', 'T', '2D', 'DOBLADA', CURRENT_DATE + 30 + TIME '15:00', CURRENT_DATE + 30 + TIME '16:35', 'PROGRAMADA');
UPDATE actores_directores SET activo = FALSE WHERE id_actor_director = 3;
ROLLBACK;

-- TRIGGER 3: trg_validar_contrato
-- Un staff no puede tener dos contratos vigentes en el mismo periodo.
BEGIN;
INSERT INTO contratos (id_staff, tipo_contrato, jornada, fecha_inicio, fecha_fin, salario_mensual, estado)
VALUES (1, 'INDEFINIDO', 'COMPLETA', CURRENT_DATE, NULL, 3000000, 'VIGENTE');
ROLLBACK;

-- TRIGGER 4: trg_validar_desactivar_staff
-- No se puede desactivar un staff con contrato vigente.
BEGIN;
UPDATE staff SET activo = FALSE WHERE id_staff = 1;
ROLLBACK;

-- TRIGGER 5: trg_validar_fecha_espectador
-- La fecha de nacimiento no puede ser posterior a la fecha de registro.
BEGIN;
UPDATE espectadores SET fecha_nacimiento = fecha_registro + 1 WHERE id_espectador = 1;
ROLLBACK;

-- TRIGGER 6: trg_validar_precio_boleta
-- No se puede cambiar el precio de un tipo de boleta inactivo.
BEGIN;
UPDATE tipos_boleta SET activo = FALSE WHERE id_tipo_boleta = 5;
UPDATE tipos_boleta SET precio = 15000 WHERE id_tipo_boleta = 5;
ROLLBACK;

-- TRIGGER 7: trg_validar_horario_funcion
-- Una sala no puede tener dos funciones al mismo tiempo (choca con la función 1).
BEGIN;
INSERT INTO funciones (id_sala, id_actor_director, titulo_pelicula, clasificacion, formato, version_idioma, fecha_hora_inicio, fecha_hora_fin, estado)
SELECT id_sala, 5, 'Noche en Villa Esperanza', '+15', '2D', 'SUBTITULADA', fecha_hora_inicio + INTERVAL '30 minutes', fecha_hora_fin + INTERVAL '30 minutes', 'PROGRAMADA'
FROM funciones WHERE id_funcion = 1;
ROLLBACK;

-- TRIGGER 8: trg_validar_capacidad_venta
-- No se pueden vender más boletas que la capacidad de la sala.
-- Función 9, sala Guayacán (capacidad 40), ya tiene 5 boletas vendidas.
BEGIN;
INSERT INTO ventas (id_espectador, id_funcion, id_tipo_boleta, id_staff, fecha_venta, cantidad, precio_unitario, metodo_pago, estado) VALUES
(1, 9, 1, 3, '2026-10-03 10:00', 10, 18000.00, 'TARJETA', 'PAGADA'),
(2, 9, 1, 3, '2026-10-03 10:05', 10, 18000.00, 'TARJETA', 'PAGADA'),
(4, 9, 1, 3, '2026-10-03 10:10', 10, 18000.00, 'TARJETA', 'PAGADA');   -- 35 de 40
INSERT INTO ventas (id_espectador, id_funcion, id_tipo_boleta, id_staff, fecha_venta, cantidad, precio_unitario, metodo_pago, estado)
VALUES (5, 9, 1, 3, '2026-10-03 10:15', 10, 18000.00, 'TARJETA', 'PAGADA');   -- 45 de 40: error
ROLLBACK;

-- PROCEDIMIENTOS (capturar el CALL y su resultado o aviso)
CALL sp_calcular_ocupacion(9, NULL, NULL, NULL);
CALL sp_reporte_ventas_pelicula(NULL, NULL, NULL);
BEGIN;
CALL sp_anular_venta(1, NULL);
ROLLBACK;
BEGIN;
CALL sp_registrar_venta(1, 20, 1, 3, 2, 'TARJETA', NULL, NULL);
ROLLBACK;
