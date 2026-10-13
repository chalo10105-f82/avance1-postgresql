-- PROCEDIMIENTO 1 (cálculo)
-- Calcula cuántas boletas se han vendido en una función,
-- cuántas sillas quedan libres y cuánto dinero se ha
-- recaudado. Solo cuenta las ventas PAGADAS.

CREATE OR REPLACE PROCEDURE sp_calcular_ocupacion(
    IN  p_id_funcion   INTEGER,
    OUT p_vendidas     INTEGER,
    OUT p_disponibles  INTEGER,
    OUT p_recaudo      NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_capacidad INTEGER;
BEGIN
    SELECT s.capacidad
    INTO v_capacidad
    FROM Funciones f
    INNER JOIN Salas s
        ON s.id_sala = f.id_sala
    WHERE f.id_funcion = p_id_funcion;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'La función % no existe.', p_id_funcion;
    END IF;

    SELECT COALESCE(SUM(v.cantidad), 0),
           COALESCE(SUM(v.cantidad * v.precio_unitario), 0)
    INTO p_vendidas, p_recaudo
    FROM Ventas v
    WHERE v.id_funcion = p_id_funcion
      AND v.estado = 'PAGADA';

    p_disponibles := v_capacidad - p_vendidas;

    RAISE NOTICE 'Función %: % boletas vendidas, % sillas libres, recaudo $%.',
        p_id_funcion, p_vendidas, p_disponibles, p_recaudo;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al calcular la ocupación: %', SQLERRM;
END;
$$;

-- PROCEDIMIENTO 2 (reporte con agregación)
-- Muestra las boletas vendidas y el dinero recaudado por
-- cada película (solo ventas PAGADAS), el total general y
-- la película que más recaudó.

CREATE OR REPLACE PROCEDURE sp_reporte_ventas_pelicula(
    OUT p_total_boletas    INTEGER,
    OUT p_total_recaudado  NUMERIC,
    OUT p_pelicula_top     VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_fila RECORD;
BEGIN
    p_total_boletas   := 0;
    p_total_recaudado := 0;

    FOR v_fila IN
        SELECT f.titulo_pelicula,
               SUM(v.cantidad)                     AS boletas,
               SUM(v.cantidad * v.precio_unitario) AS recaudo
        FROM Ventas v
        INNER JOIN Funciones f
            ON f.id_funcion = v.id_funcion
        WHERE v.estado = 'PAGADA'
        GROUP BY f.titulo_pelicula
        ORDER BY recaudo DESC
    LOOP
        RAISE NOTICE '%: % boletas, $%', v_fila.titulo_pelicula, v_fila.boletas, v_fila.recaudo;

        p_total_boletas   := p_total_boletas + v_fila.boletas;
        p_total_recaudado := p_total_recaudado + v_fila.recaudo;

        IF p_pelicula_top IS NULL THEN
            p_pelicula_top := v_fila.titulo_pelicula;
        END IF;
    END LOOP;

    IF p_total_boletas = 0 THEN
        RAISE EXCEPTION 'No hay ventas pagadas para generar el reporte.';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al generar el reporte: %', SQLERRM;
END;
$$;

-- PROCEDIMIENTO 3 (operación)
-- Anula una venta y muestra el valor a devolver.
-- Solo se puede anular una venta que exista y que esté
-- PAGADA.

CREATE OR REPLACE PROCEDURE sp_anular_venta(
    IN  p_id_venta        INTEGER,
    OUT p_valor_devuelto  NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado VARCHAR(10);
BEGIN
    SELECT estado, cantidad * precio_unitario
    INTO v_estado, p_valor_devuelto
    FROM Ventas
    WHERE id_venta = p_id_venta;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'La venta % no existe.', p_id_venta;
    END IF;

    IF v_estado = 'ANULADA' THEN
        RAISE EXCEPTION 'La venta % ya está anulada.', p_id_venta;
    END IF;

    UPDATE Ventas
    SET estado = 'ANULADA'
    WHERE id_venta = p_id_venta;

    RAISE NOTICE 'Venta % anulada. Valor a devolver: $%.', p_id_venta, p_valor_devuelto;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al anular la venta: %', SQLERRM;
END;
$$;

-- PROCEDIMIENTO 4
-- Registra una venta revisando antes que:
--   - el espectador exista,
--   - la función exista y esté PROGRAMADA,
--   - el espectador tenga la edad que pide la clasificación,
--   - el tipo de boleta exista y esté activo,
--   - el staff exista y esté activo,
--   - haya sillas suficientes.
-- El precio se toma de Tipos_Boleta.

CREATE OR REPLACE PROCEDURE sp_registrar_venta(
    IN  p_id_espectador   INTEGER,
    IN  p_id_funcion      INTEGER,
    IN  p_id_tipo_boleta  INTEGER,
    IN  p_id_staff        INTEGER,
    IN  p_cantidad        INTEGER,
    IN  p_metodo_pago     VARCHAR,
    OUT p_id_venta        INTEGER,
    OUT p_total           NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_fecha_nacimiento  DATE;
    v_edad              INTEGER;
    v_estado_funcion    VARCHAR(15);
    v_clasificacion     VARCHAR(5);
    v_capacidad         INTEGER;
    v_vendidas          INTEGER;
    v_precio            NUMERIC(10,2);
    v_boleta_activa     BOOLEAN;
    v_staff_activo      BOOLEAN;
BEGIN
    -- Espectador
    SELECT fecha_nacimiento
    INTO v_fecha_nacimiento
    FROM Espectadores
    WHERE id_espectador = p_id_espectador;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'El espectador % no existe.', p_id_espectador;
    END IF;

    -- Función
    SELECT f.estado, f.clasificacion, s.capacidad
    INTO v_estado_funcion, v_clasificacion, v_capacidad
    FROM Funciones f
    INNER JOIN Salas s
        ON s.id_sala = f.id_sala
    WHERE f.id_funcion = p_id_funcion;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'La función % no existe.', p_id_funcion;
    END IF;

    IF v_estado_funcion <> 'PROGRAMADA' THEN
        RAISE EXCEPTION 'La función % está % y no se puede vender.', p_id_funcion, v_estado_funcion;
    END IF;

    -- Edad según la clasificación
    v_edad := DATE_PART('year', AGE(CURRENT_DATE, v_fecha_nacimiento));

    IF (v_clasificacion = '+7'  AND v_edad < 7)
    OR (v_clasificacion = '+12' AND v_edad < 12)
    OR (v_clasificacion = '+15' AND v_edad < 15)
    OR (v_clasificacion = '+18' AND v_edad < 18) THEN
        RAISE EXCEPTION 'El espectador tiene % años y la película es %.', v_edad, v_clasificacion;
    END IF;

    -- Tipo de boleta
    SELECT precio, activo
    INTO v_precio, v_boleta_activa
    FROM Tipos_Boleta
    WHERE id_tipo_boleta = p_id_tipo_boleta;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'El tipo de boleta % no existe.', p_id_tipo_boleta;
    END IF;

    IF NOT v_boleta_activa THEN
        RAISE EXCEPTION 'El tipo de boleta % está inactivo.', p_id_tipo_boleta;
    END IF;

    -- Staff
    SELECT activo
    INTO v_staff_activo
    FROM Staff
    WHERE id_staff = p_id_staff;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'El staff % no existe.', p_id_staff;
    END IF;

    IF NOT v_staff_activo THEN
        RAISE EXCEPTION 'El staff % está inactivo.', p_id_staff;
    END IF;

    -- Sillas disponibles
    SELECT COALESCE(SUM(cantidad), 0)
    INTO v_vendidas
    FROM Ventas
    WHERE id_funcion = p_id_funcion
      AND estado = 'PAGADA';

    IF v_vendidas + p_cantidad > v_capacidad THEN
        RAISE EXCEPTION 'No hay sillas suficientes. Quedan % sillas.', v_capacidad - v_vendidas;
    END IF;

    -- Registrar la venta
    INSERT INTO Ventas
        (id_espectador, id_funcion, id_tipo_boleta, id_staff,
         cantidad, precio_unitario, metodo_pago, estado)
    VALUES
        (p_id_espectador, p_id_funcion, p_id_tipo_boleta, p_id_staff,
         p_cantidad, v_precio, p_metodo_pago, 'PAGADA')
    RETURNING id_venta INTO p_id_venta;

    p_total := p_cantidad * v_precio;

    RAISE NOTICE 'Venta % registrada. Total: $%.', p_id_venta, p_total;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'No se pudo registrar la venta: %', SQLERRM;
END;
$$;
