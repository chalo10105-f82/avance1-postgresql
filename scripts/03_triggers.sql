
-- TRIGGER 1: trg_validar_desactivar_sala
-- No permitir desactivar una sala que tenga funciones
-- programadas o en curso.
CREATE OR REPLACE FUNCTION fn_validar_desactivar_sala()
RETURNS trigger AS $$
BEGIN

    IF NEW.estado = 'INACTIVA' AND OLD.estado = 'ACTIVA' THEN

        IF EXISTS (
            SELECT 1
            FROM Funciones f
            WHERE f.id_sala = NEW.id_sala
              AND f.estado IN ('PROGRAMADA', 'EN_CURSO')
              AND f.fecha_hora_fin >= CURRENT_TIMESTAMP
        ) THEN

            RAISE EXCEPTION
            'No se puede desactivar la sala %, porque tiene funciones programadas o en curso.',
            NEW.id_sala;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_desactivar_sala ON Salas;

CREATE TRIGGER trg_validar_desactivar_sala
BEFORE UPDATE ON Salas
FOR EACH ROW
EXECUTE FUNCTION fn_validar_desactivar_sala();

-- TRIGGER 2: trg_validar_desactivar_actor_director
-- No permitir desactivar un actor/director que tenga
-- funciones programadas o en curso.

CREATE OR REPLACE FUNCTION fn_validar_desactivar_actor_director()
RETURNS trigger AS $$
BEGIN

    IF NEW.activo = FALSE AND OLD.activo = TRUE THEN

        IF EXISTS (
            SELECT 1
            FROM Funciones f
            WHERE f.id_actor_director = NEW.id_actor_director
              AND f.estado IN ('PROGRAMADA', 'EN_CURSO')
              AND f.fecha_hora_fin >= CURRENT_TIMESTAMP
        ) THEN

            RAISE EXCEPTION
            'No se puede desactivar el actor/director %, porque tiene funciones programadas o en curso.',
            NEW.id_actor_director;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_desactivar_actor_director ON Actores_Directores;

CREATE TRIGGER trg_validar_desactivar_actor_director
BEFORE UPDATE ON Actores_Directores
FOR EACH ROW
EXECUTE FUNCTION fn_validar_desactivar_actor_director();

-- TRIGGER 3: trg_validar_contrato
-- No permitir contratos vigentes que se crucen para
-- el mismo miembro del staff.

CREATE OR REPLACE FUNCTION fn_validar_contrato()
RETURNS trigger AS $$
BEGIN

    IF NEW.estado = 'VIGENTE' THEN

        IF EXISTS (
            SELECT 1
            FROM Contratos c
            WHERE c.id_staff = NEW.id_staff
              AND c.id_contrato <> COALESCE(NEW.id_contrato, -1)
              AND c.estado = 'VIGENTE'
              AND NEW.fecha_inicio <= COALESCE(
                    c.fecha_fin,
                    '9999-12-31'::date
                  )
              AND c.fecha_inicio <= COALESCE(
                    NEW.fecha_fin,
                    '9999-12-31'::date
                  )
        ) THEN

            RAISE EXCEPTION
            'El staff % ya tiene otro contrato vigente en el mismo periodo.',
            NEW.id_staff;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_contrato ON Contratos;

CREATE TRIGGER trg_validar_contrato
BEFORE INSERT OR UPDATE ON Contratos
FOR EACH ROW
EXECUTE FUNCTION fn_validar_contrato();

-- TRIGGER 4: trg_validar_desactivar_staff
-- No permitir desactivar un miembro del staff que tenga
-- un contrato vigente.

CREATE OR REPLACE FUNCTION fn_validar_desactivar_staff()
RETURNS trigger AS $$
BEGIN

    IF NEW.activo = FALSE AND OLD.activo = TRUE THEN

        IF EXISTS (
            SELECT 1
            FROM Contratos c
            WHERE c.id_staff = NEW.id_staff
              AND c.estado = 'VIGENTE'
              AND c.fecha_inicio <= CURRENT_DATE
              AND (
                    c.fecha_fin IS NULL
                    OR c.fecha_fin >= CURRENT_DATE
                  )
        ) THEN

            RAISE EXCEPTION
            'No se puede desactivar el staff %, porque tiene un contrato vigente.',
            NEW.id_staff;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_desactivar_staff ON Staff;

CREATE TRIGGER trg_validar_desactivar_staff
BEFORE UPDATE ON Staff
FOR EACH ROW
EXECUTE FUNCTION fn_validar_desactivar_staff();

-- TRIGGER 5: trg_validar_fecha_espectador
-- Validar que la fecha de nacimiento no sea posterior
-- a la fecha de registro del espectador.

CREATE OR REPLACE FUNCTION fn_validar_fecha_espectador()
RETURNS trigger AS $$
BEGIN

    IF NEW.fecha_nacimiento > NEW.fecha_registro THEN

        RAISE EXCEPTION
        'La fecha de nacimiento no puede ser posterior a la fecha de registro.';

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_fecha_espectador ON Espectadores;

CREATE TRIGGER trg_validar_fecha_espectador
BEFORE INSERT OR UPDATE ON Espectadores
FOR EACH ROW
EXECUTE FUNCTION fn_validar_fecha_espectador();

-- TRIGGER 6: trg_validar_precio_boleta
-- No permitir modificar el precio de un tipo de boleta
-- que se encuentre inactivo.

CREATE OR REPLACE FUNCTION fn_validar_precio_boleta()
RETURNS trigger AS $$
BEGIN

    IF OLD.activo = FALSE
       AND NEW.precio <> OLD.precio THEN

        RAISE EXCEPTION
        'No se puede modificar el precio del tipo de boleta % porque está inactivo.',
        NEW.id_tipo_boleta;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_precio_boleta ON Tipos_Boleta;

CREATE TRIGGER trg_validar_precio_boleta
BEFORE UPDATE ON Tipos_Boleta
FOR EACH ROW
EXECUTE FUNCTION fn_validar_precio_boleta();

-- TRIGGER 7: trg_validar_horario_funcion
-- No permitir programar dos funciones en la misma sala
-- cuando sus horarios se crucen.

CREATE OR REPLACE FUNCTION fn_validar_horario_funcion()
RETURNS trigger AS $$
BEGIN

    IF NEW.estado <> 'CANCELADA' THEN

        IF EXISTS (
            SELECT 1
            FROM Funciones f
            WHERE f.id_sala = NEW.id_sala
              AND f.id_funcion <> COALESCE(NEW.id_funcion, -1)
              AND f.estado <> 'CANCELADA'
              AND NEW.fecha_hora_inicio < f.fecha_hora_fin
              AND NEW.fecha_hora_fin > f.fecha_hora_inicio
        ) THEN

            RAISE EXCEPTION
            'La sala % ya tiene otra función programada en ese horario.',
            NEW.id_sala;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_horario_funcion ON Funciones;

CREATE TRIGGER trg_validar_horario_funcion
BEFORE INSERT OR UPDATE ON Funciones
FOR EACH ROW
EXECUTE FUNCTION fn_validar_horario_funcion();

-- TRIGGER 8: trg_validar_capacidad_venta
-- No permitir vender más boletas que la capacidad de
-- la sala asociada a la función.

CREATE OR REPLACE FUNCTION fn_validar_capacidad_venta()
RETURNS trigger AS $$
DECLARE
    v_capacidad INTEGER;
    v_vendidas  INTEGER;
BEGIN

    IF NEW.estado <> 'ANULADA' THEN

        SELECT s.capacidad
        INTO v_capacidad
        FROM Salas s
        INNER JOIN Funciones f
            ON f.id_sala = s.id_sala
        WHERE f.id_funcion = NEW.id_funcion;

        SELECT COALESCE(SUM(v.cantidad), 0)
        INTO v_vendidas
        FROM Ventas v
        WHERE v.id_funcion = NEW.id_funcion
          AND v.estado <> 'ANULADA';

        IF v_vendidas + NEW.cantidad > v_capacidad THEN

            RAISE EXCEPTION
            'No se puede realizar la venta. La capacidad de la sala es % y se superarían las boletas permitidas.',
            v_capacidad;

        END IF;

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validar_capacidad_venta ON Ventas;

CREATE TRIGGER trg_validar_capacidad_venta
BEFORE INSERT OR UPDATE ON Ventas
FOR EACH ROW
EXECUTE FUNCTION fn_validar_capacidad_venta();
