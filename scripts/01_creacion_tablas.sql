-- 1. Salas
CREATE TABLE salas (
    id_sala    SERIAL PRIMARY KEY,
    nombre     VARCHAR(50) NOT NULL,
    capacidad  INTEGER     NOT NULL,
    tipo_sala  VARCHAR(15) NOT NULL,
    estado     VARCHAR(15) NOT NULL DEFAULT 'ACTIVA',
    CONSTRAINT uq_salas_nombre     UNIQUE (nombre),
    CONSTRAINT ck_salas_capacidad  CHECK (capacidad > 0),
    CONSTRAINT ck_salas_tipo       CHECK (tipo_sala IN ('2D','3D','VIP')),
    CONSTRAINT ck_salas_estado     CHECK (estado IN ('ACTIVA','MANTENIMIENTO','INACTIVA'))
);
-- 2. Actores_Directores
CREATE TABLE actores_directores (
    id_actor_director  SERIAL PRIMARY KEY,
    nombres            VARCHAR(80)  NOT NULL,
    apellidos          VARCHAR(80)  NOT NULL,
    nombre_artistico   VARCHAR(100),
    tipo               VARCHAR(10)  NOT NULL,
    nacionalidad       VARCHAR(60)  NOT NULL,
    fecha_nacimiento   DATE         NOT NULL,
    correo_contacto    VARCHAR(120) NOT NULL,
    activo             BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_actdir_correo   UNIQUE (correo_contacto),
    CONSTRAINT ck_actdir_tipo     CHECK (tipo IN ('ACTOR','DIRECTOR','AMBOS')),
    CONSTRAINT ck_actdir_fecha    CHECK (fecha_nacimiento < CURRENT_DATE)
);
-- 3. Tipos_Boleta
CREATE TABLE tipos_boleta (
    id_tipo_boleta  SERIAL PRIMARY KEY,
    nombre          VARCHAR(40)   NOT NULL,
    descripcion     VARCHAR(200),
    precio          NUMERIC(10,2) NOT NULL,
    activo          BOOLEAN       NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_tipos_boleta_nombre UNIQUE (nombre),
    CONSTRAINT ck_tipos_boleta_precio CHECK (precio > 0)
);

-- 4. Espectadores
CREATE TABLE espectadores (
    id_espectador        SERIAL PRIMARY KEY,
    documento_identidad  VARCHAR(20)  NOT NULL,
    nombres              VARCHAR(80)  NOT NULL,
    apellidos            VARCHAR(80)  NOT NULL,
    correo               VARCHAR(120) NOT NULL,
    telefono             VARCHAR(20),
    fecha_nacimiento     DATE         NOT NULL,
    fecha_registro       DATE         NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT uq_espectadores_documento UNIQUE (documento_identidad),
    CONSTRAINT uq_espectadores_correo    UNIQUE (correo)
);

-- 5. Staff
CREATE TABLE staff (
    id_staff             SERIAL PRIMARY KEY,
    id_sala              INTEGER,
    documento_identidad  VARCHAR(20) NOT NULL,
    nombres              VARCHAR(80) NOT NULL,
    apellidos            VARCHAR(80) NOT NULL,
    telefono             VARCHAR(20),
    cargo                VARCHAR(20) NOT NULL,
    turno                VARCHAR(10) NOT NULL,
    fecha_ingreso        DATE        NOT NULL,
    activo               BOOLEAN     NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_staff_documento UNIQUE (documento_identidad),
    CONSTRAINT ck_staff_cargo     CHECK (cargo IN ('TAQUILLERO','DULCERIA','ENCARGADO_SALA','ASEO',
                                                   'PROYECCIONISTA','SEGURIDAD','ADMINISTRADOR')),
    CONSTRAINT ck_staff_turno     CHECK (turno IN ('MANANA','TARDE','NOCHE')),
    CONSTRAINT fk_staff_sala      FOREIGN KEY (id_sala) REFERENCES salas (id_sala)
                                  ON DELETE RESTRICT
);

-- 6. Contratos
CREATE TABLE contratos (
    id_contrato      SERIAL PRIMARY KEY,
    id_staff         INTEGER       NOT NULL,
    tipo_contrato    VARCHAR(15)   NOT NULL,
    jornada          VARCHAR(15)   NOT NULL,
    fecha_inicio     DATE          NOT NULL,
    fecha_fin        DATE,
    salario_mensual  NUMERIC(12,2) NOT NULL,
    estado           VARCHAR(12)   NOT NULL,
    CONSTRAINT ck_contratos_tipo     CHECK (tipo_contrato IN ('INDEFINIDO','FIJO','OBRA_LABOR','APRENDIZAJE')),
    CONSTRAINT ck_contratos_jornada  CHECK (jornada IN ('TIEMPO_COMPLETO','MEDIO_TIEMPO','POR_HORAS')),
    CONSTRAINT ck_contratos_fechas   CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio),
    CONSTRAINT ck_contratos_salario  CHECK (salario_mensual > 0),
    CONSTRAINT ck_contratos_estado   CHECK (estado IN ('VIGENTE','FINALIZADO','CANCELADO')),
    CONSTRAINT fk_contratos_staff    FOREIGN KEY (id_staff) REFERENCES staff (id_staff)
                                     ON DELETE RESTRICT
);
-- 7. Funciones
CREATE TABLE funciones (
    id_funcion         SERIAL PRIMARY KEY,
    id_sala            INTEGER      NOT NULL,
    id_actor_director  INTEGER      NOT NULL,
    titulo_pelicula    VARCHAR(150) NOT NULL,
    clasificacion      VARCHAR(5)   NOT NULL,
    formato            VARCHAR(2)   NOT NULL,
    version_idioma     VARCHAR(12)  NOT NULL,
    fecha_hora_inicio  TIMESTAMP    NOT NULL,
    fecha_hora_fin     TIMESTAMP    NOT NULL,
    estado             VARCHAR(15)  NOT NULL,
    CONSTRAINT ck_funciones_clasif   CHECK (clasificacion IN ('T','+7','+12','+15','+18')),
    CONSTRAINT ck_funciones_formato  CHECK (formato IN ('2D','3D')),
    CONSTRAINT ck_funciones_idioma   CHECK (version_idioma IN ('DOBLADA','SUBTITULADA')),
    CONSTRAINT ck_funciones_horas    CHECK (fecha_hora_fin > fecha_hora_inicio),
    CONSTRAINT ck_funciones_estado   CHECK (estado IN ('PROGRAMADA','EN_CURSO','FINALIZADA','CANCELADA')),
    CONSTRAINT fk_funciones_sala     FOREIGN KEY (id_sala) REFERENCES salas (id_sala)
                                     ON DELETE RESTRICT,
    CONSTRAINT fk_funciones_actdir   FOREIGN KEY (id_actor_director)
                                     REFERENCES actores_directores (id_actor_director)
                                     ON DELETE RESTRICT
);
-- 8. Ventas
CREATE TABLE ventas (
    id_venta         SERIAL PRIMARY KEY,
    id_espectador    INTEGER       NOT NULL,
    id_funcion       INTEGER       NOT NULL,
    id_tipo_boleta   INTEGER       NOT NULL,
    id_staff         INTEGER       NOT NULL,
    fecha_venta      TIMESTAMP     NOT NULL DEFAULT NOW(),
    cantidad         INTEGER       NOT NULL,
    precio_unitario  NUMERIC(10,2) NOT NULL,
    metodo_pago      VARCHAR(15)   NOT NULL,
    estado           VARCHAR(10)   NOT NULL DEFAULT 'PAGADA',
    CONSTRAINT ck_ventas_cantidad  CHECK (cantidad BETWEEN 1 AND 10),
    CONSTRAINT ck_ventas_precio    CHECK (precio_unitario > 0),
    CONSTRAINT ck_ventas_pago      CHECK (metodo_pago IN ('EFECTIVO','TARJETA','TRANSFERENCIA')),
    CONSTRAINT ck_ventas_estado    CHECK (estado IN ('PAGADA','ANULADA')),
    CONSTRAINT fk_ventas_espect    FOREIGN KEY (id_espectador)  REFERENCES espectadores (id_espectador)
                                   ON DELETE RESTRICT,
    CONSTRAINT fk_ventas_funcion   FOREIGN KEY (id_funcion)     REFERENCES funciones (id_funcion)
                                   ON DELETE RESTRICT,
    CONSTRAINT fk_ventas_tipo      FOREIGN KEY (id_tipo_boleta) REFERENCES tipos_boleta (id_tipo_boleta)
                                   ON DELETE RESTRICT,
    CONSTRAINT fk_ventas_staff     FOREIGN KEY (id_staff)       REFERENCES staff (id_staff)
                                   ON DELETE RESTRICT
);


-- =====================================================================
-- ÍNDICES SOBRE LLAVES FORÁNEAS (corrección del Avance 1)
-- PostgreSQL no indexa las FK automáticamente; estas columnas se usan
-- en cada JOIN, por eso se indexan para no recorrer toda la tabla.
-- =====================================================================
CREATE INDEX idx_ventas_funcion        ON ventas (id_funcion);
CREATE INDEX idx_ventas_espect         ON ventas (id_espectador);
CREATE INDEX idx_ventas_staff          ON ventas (id_staff);
CREATE INDEX idx_ventas_tipo           ON ventas (id_tipo_boleta);
CREATE INDEX idx_funciones_sala        ON funciones (id_sala, fecha_hora_inicio);
CREATE INDEX idx_funciones_actor       ON funciones (id_actor_director);
CREATE INDEX idx_staff_sala            ON staff (id_sala);
CREATE INDEX idx_contratos_staff       ON contratos (id_staff);
