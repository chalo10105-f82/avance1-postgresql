
-- 1. Salas (5)
INSERT INTO salas (nombre, capacidad, tipo_sala, estado) VALUES
('Roble',     120, '2D',  'ACTIVA'),   -- id 1
('Cedro',     100, '3D',  'ACTIVA'),   -- id 2
('Guayacán',   40, 'VIP', 'ACTIVA'),   -- id 3
('Ceiba',     150, '2D',  'ACTIVA'),   -- id 4
('Sauce',      90, '3D',  'ACTIVA');   -- id 5

-- 2. Tipos_Boleta (5)
INSERT INTO tipos_boleta (nombre, descripcion, precio, activo) VALUES
('General',          'Tarifa estándar para público en general',                         18000.00, TRUE),  -- 1
('Estudiante',       'Presentando carné estudiantil vigente',                           14000.00, TRUE),  -- 2
('Adulto mayor',     'Personas de 60 años o más con documento de identidad',            12000.00, TRUE),  -- 3
('Niño',             'Menores de 12 años; el menor debe asistir acompañado',            10000.00, TRUE),  -- 4
('Amigo del Bosque', 'Tarifa preferencial para miembros del programa de fidelización',  13000.00, TRUE);  -- 5


-- 3. Actores_Directores (32)
--    Los ids 1-17 protagonizan/dirigen películas en cartelera.
--    Los ids 29-31 están inactivos (sin funciones asociadas).
INSERT INTO actores_directores
    (nombres, apellidos, nombre_artistico, tipo, nacionalidad, fecha_nacimiento, correo_contacto, activo) VALUES
('Lucía Fernanda',    'Marín Cortés',        'Lucía Marín',       'ACTOR',    'Colombia',       '1989-03-14', 'lucia.marin@prisma.example',          TRUE),  -- 1
('Rodrigo Alberto',   'Salcedo Pardo',       NULL,                'DIRECTOR', 'Colombia',       '1976-08-02', 'rodrigo.salcedo@horizonte.example',   TRUE),  -- 2
('Valeria Inés',      'Montenegro Ríos',     'Vale Montenegro',   'AMBOS',    'Argentina',      '1984-11-23', 'valeria.montenegro@andino.example',   TRUE),  -- 3
('Gael Santiago',     'Paredes Luna',        NULL,                'DIRECTOR', 'México',         '1971-05-30', 'gael.paredes@prisma.example',         TRUE),  -- 4
('Mariana Teresa',    'Olarte Vélez',        'Mariana Olarte',    'ACTOR',    'Colombia',       '1992-01-19', 'mariana.olarte@horizonte.example',    TRUE),  -- 5
('Tomás Ignacio',     'Bustamante Rey',      NULL,                'DIRECTOR', 'Chile',          '1968-09-07', 'tomas.bustamante@andino.example',     TRUE),  -- 6
('Camilo Andrés',     'Rondón Pérez',        'Camilo Rondón',     'ACTOR',    'Colombia',       '1980-12-11', 'camilo.rondon@prisma.example',        TRUE),  -- 7
('Ingrid Solveig',    'Haugen Moya',         'Ingrid Haugen',     'ACTOR',    'España',         '1990-06-25', 'ingrid.haugen@horizonte.example',     TRUE),  -- 8
('Bruno Matías',      'Echeverría Sáenz',    NULL,                'DIRECTOR', 'Uruguay',        '1974-02-16', 'bruno.echeverria@andino.example',     TRUE),  -- 9
('Sofía Alejandra',   'Beltrán Cruz',        'Sofi Beltrán',      'ACTOR',    'México',         '1995-10-04', 'sofia.beltran@prisma.example',        TRUE),  -- 10
('Alejandro David',   'Roldán Mejía',        NULL,                'AMBOS',    'Colombia',       '1979-07-28', 'alejandro.roldan@horizonte.example',  TRUE),  -- 11
('Camille Dorothée',  'Lefèvre Aubry',       'Camille Lefèvre',   'ACTOR',    'Francia',        '1987-04-09', 'camille.lefevre@andino.example',      TRUE),  -- 12
('Marcos Vinícius',   'Teixeira Alves',      'Marcos Teixeira',   'ACTOR',    'Brasil',         '1983-12-30', 'marcos.teixeira@prisma.example',      TRUE),  -- 13
('Nicole Andrea',     'Castellanos Peña',    NULL,                'DIRECTOR', 'Colombia',       '1981-03-21', 'nicole.castellanos@horizonte.example',TRUE),  -- 14
('Álvaro Esteban',    'Zuleta Giraldo',      'Álvaro Zuleta',     'ACTOR',    'Colombia',       '1965-09-15', 'alvaro.zuleta@andino.example',        TRUE),  -- 15
('Renata Paola',      'Salvatierra Díaz',    NULL,                'ACTOR',    'Perú',           '1993-05-06', 'renata.salvatierra@prisma.example',   TRUE),  -- 16
('Julián Mateo',      'Arboleda Franco',     'Julián Arboleda',   'AMBOS',    'Colombia',       '1986-01-27', 'julian.arboleda@horizonte.example',   TRUE),  -- 17
('Isabel Cristina',   'Navarrete Soto',      NULL,                'DIRECTOR', 'España',         '1972-10-18', 'isabel.navarrete@andino.example',     TRUE),  -- 18
('Diego Armando',     'Pacheco Linares',     'Diego Pacheco',     'ACTOR',    'Venezuela',      '1991-08-13', 'diego.pacheco@prisma.example',        TRUE),  -- 19
('Francesca Giulia',  'Moretti Conti',       'Francesca Moretti', 'ACTOR',    'Italia',         '1985-02-24', 'francesca.moretti@horizonte.example', TRUE),  -- 20
('Santiago Nicolás',  'Orozco Duque',        NULL,                'DIRECTOR', 'Colombia',       '1969-11-03', 'santiago.orozco@andino.example',      TRUE),  -- 21
('Ana Beatriz',       'Cavalcanti Rocha',    'Ana Cavalcanti',    'ACTOR',    'Brasil',         '1994-06-17', 'ana.cavalcanti@prisma.example',       TRUE),  -- 22
('Emmanuel Josué',    'Valdivia Torres',     NULL,                'DIRECTOR', 'México',         '1977-04-22', 'emmanuel.valdivia@horizonte.example', TRUE),  -- 23
('Paula Andrea',      'Guzmán Restrepo',     'Paula Guzmán',      'ACTOR',    'Colombia',       '1998-09-09', 'paula.guzman@andino.example',         TRUE),  -- 24
('Thomas Edward',     'Whitfield Brooks',    'Tom Whitfield',     'ACTOR',    'Estados Unidos', '1982-01-05', 'thomas.whitfield@prisma.example',     TRUE),  -- 25
('Lorena Beatriz',    'Ocampo Aranda',       NULL,                'AMBOS',    'Argentina',      '1978-12-14', 'lorena.ocampo@horizonte.example',     TRUE),  -- 26
('Hernán Darío',      'Cuervo Mora',         'Hernán Cuervo',     'ACTOR',    'Colombia',       '1960-07-19', 'hernan.cuervo@andino.example',        TRUE),  -- 27
('Mía Antonella',     'Ferreyra Quiroz',     NULL,                'ACTOR',    'Chile',          '1996-03-08', 'mia.ferreyra@prisma.example',         TRUE),  -- 28
('Eduardo Raúl',      'Barrientos Lima',     NULL,                'DIRECTOR', 'Perú',           '1963-05-25', 'eduardo.barrientos@horizonte.example',FALSE), -- 29
('Samantha Joy',      'Callahan Reed',       'Sam Callahan',      'ACTOR',    'Estados Unidos', '1989-10-31', 'samantha.callahan@andino.example',    FALSE), -- 30
('Pedro Pablo',       'Lizarazo Ávila',      NULL,                'ACTOR',    'Colombia',       '1955-02-12', 'pedro.lizarazo@prisma.example',       FALSE), -- 31
('Adriana Sofía',     'Mendieta Cano',       'Adriana Mendieta',  'DIRECTOR', 'Colombia',       '1980-06-01', 'adriana.mendieta@horizonte.example',  TRUE);  -- 32

-- 4. Espectadores (32)
--    Edades variadas (niños, jóvenes, adultos y adultos mayores) para
--    probar la validación de clasificación por edad.
INSERT INTO espectadores
    (documento_identidad, nombres, apellidos, correo, telefono, fecha_nacimiento, fecha_registro) VALUES
('1012345601', 'Camila',         'Ortiz Barrera',     'camila.ortiz@correo.example',      '3001112201', '1998-03-14', '2025-02-10'),  -- 1
('1012345602', 'Santiago',       'Rojas Mejía',       'santiago.rojas@correo.example',    '3001112202', '1995-07-22', '2025-02-18'),  -- 2
('1012345603', 'Valentina',      'Gómez Pardo',       'valentina.gomez@correo.example',   '3001112203', '2003-11-05', '2025-03-04'),  -- 3
('1012345604', 'Mateo',          'Hernández Soto',    'mateo.hernandez@correo.example',   '3001112204', '2005-02-18', '2025-03-21'),  -- 4
('1012345605', 'Isabella',       'Torres Quintero',   'isabella.torres@correo.example',   '3001112205', '2007-09-30', '2025-04-12'),  -- 5
('1012345606', 'Sebastián',      'Ramírez Cruz',      'sebastian.ramirez@correo.example', '3001112206', '1989-01-12', '2025-04-30'),  -- 6
('1012345607', 'Laura',          'Díaz Martínez',     'laura.diaz@correo.example',        '3001112207', '1992-06-25', '2025-05-16'),  -- 7
('1012345608', 'Andrés',         'Castro Villamil',   'andres.castro@correo.example',     '3001112208', '1985-12-03', '2025-06-02'),  -- 8
('1012345609', 'Daniela',        'Vargas Bonilla',    'daniela.vargas@correo.example',    '3001112209', '2001-04-17', '2025-06-27'),  -- 9
('1012345610', 'Juan Pablo',     'Moreno Gil',        'juanpablo.moreno@correo.example',  '3001112210', '2004-08-09', '2025-07-09'),  -- 10
('1012345611', 'Mariana',        'Silva Arango',      'mariana.silva@correo.example',     '3001112211', '1999-10-28', '2025-07-25'),  -- 11
('1012345612', 'Felipe',         'Ruiz Herrera',      'felipe.ruiz@correo.example',       '3001112212', '1978-05-11', '2025-08-14'),  -- 12
('1012345613', 'Paula',          'Jiménez Cortés',    'paula.jimenez@correo.example',     NULL,         '1982-09-19', '2025-09-03'),  -- 13
('79456123',   'Carlos',         'Mendoza Ávila',     'carlos.mendoza@correo.example',    '3001112214', '1960-03-02', '2025-09-19'),  -- 14
('41234567',   'Rosa Elena',     'Pardo Londoño',     'rosaelena.pardo@correo.example',   '3001112215', '1955-11-21', '2025-10-08'),  -- 15
('19876543',   'Hernando',       'Quintero Lara',     'hernando.quintero@correo.example', NULL,         '1951-07-08', '2025-10-22'),  -- 16
('51234890',   'Luz Marina',     'Cárdenas Peña',     'luzmarina.cardenas@correo.example','3001112217', '1962-01-30', '2025-11-11'),  -- 17
('1098765401', 'Tomás',          'Acosta Rivera',     'tomas.acosta@correo.example',      NULL,         '2016-05-12', '2025-11-28'),  -- 18
('1098765402', 'Sofía',          'Acosta Rivera',     'sofia.acosta@correo.example',      NULL,         '2014-08-24', '2025-11-28'),  -- 19
('1098765403', 'Emiliano',       'Peña Duarte',       'emiliano.pena@correo.example',     NULL,         '2018-02-09', '2025-12-15'),  -- 20
('1098765404', 'Salomé',         'Rincón Escobar',    'salome.rincon@correo.example',     NULL,         '2017-11-15', '2026-01-10'),  -- 21
('1012345622', 'Nicolás',        'Beltrán Ossa',      'nicolas.beltran@correo.example',   '3001112222', '2000-12-01', '2026-01-24'),  -- 22
('1012345623', 'Gabriela',       'Lozano Fuentes',    'gabriela.lozano@correo.example',   '3001112223', '1997-02-26', '2026-02-07'),  -- 23
('1012345624', 'Alejandro',      'Pineda Rueda',      'alejandro.pineda@correo.example',  '3001112224', '1990-08-15', '2026-02-26'),  -- 24
('1012345625', 'Natalia',        'Cruz Maldonado',    'natalia.cruz@correo.example',      '3001112225', '2002-05-07', '2026-03-13'),  -- 25
('1012345626', 'Diego',          'Salazar Prieto',    'diego.salazar@correo.example',     '3001112226', '2006-03-23', '2026-04-02'),  -- 26
('1012345627', 'Juliana',        'Ospina Támara',     'juliana.ospina@correo.example',    '3001112227', '1994-10-10', '2026-04-19'),  -- 27
('1012345628', 'Esteban',        'Murillo Gaitán',    'esteban.murillo@correo.example',   '3001112228', '1987-04-04', '2026-05-06'),  -- 28
('1012345629', 'Carolina',       'Ávila Montoya',     'carolina.avila@correo.example',    '3001112229', '1975-12-19', '2026-06-15'),  -- 29
('80123456',   'Miguel Ángel',   'Rey Salamanca',     'miguelangel.rey@correo.example',   '3001112230', '1969-06-13', '2026-07-21'),  -- 30
('1098765431', 'Antonia',        'Suárez Mora',       'antonia.suarez@correo.example',    '3001112231', '2009-01-20', '2026-08-08'),  -- 31
('1098765432', 'Julián',         'Barrera Nieto',     'julian.barrera@correo.example',    '3001112232', '2010-06-02', '2026-09-12');  -- 32

-- 5. Staff (30)
--    1-2 ADMINISTRADOR | 3-7 TAQUILLERO | 8-12 DULCERIA (12 inactivo)
--    13-17 ENCARGADO_SALA | 18-22 ASEO | 23-27 PROYECCIONISTA
--    28-30 SEGURIDAD. Cargos de sala llevan id_sala (1 a 5).
INSERT INTO staff
    (id_sala, documento_identidad, nombres, apellidos, telefono, cargo, turno, fecha_ingreso, activo) VALUES
(NULL, '52100001', 'Marcela',          'Duarte Pinzón',     '3101000001', 'ADMINISTRADOR',  'MANANA', '2024-01-15', TRUE),   -- 1
(NULL, '79100002', 'Ricardo',          'Bernal Soto',       '3101000002', 'ADMINISTRADOR',  'TARDE',  '2024-01-15', TRUE),   -- 2
(NULL, '1020100003', 'Karen Lizeth',   'Mora Ibáñez',       '3101000003', 'TAQUILLERO',     'MANANA', '2024-02-01', TRUE),   -- 3
(NULL, '1020100004', 'Brayan Steven',  'Cortés Ladino',     '3101000004', 'TAQUILLERO',     'TARDE',  '2024-02-01', TRUE),   -- 4
(NULL, '1020100005', 'Yuliana Andrea', 'Páez Moncada',      '3101000005', 'TAQUILLERO',     'TARDE',  '2026-03-10', TRUE),   -- 5
(NULL, '1020100006', 'Cristian Camilo','Lara Bautista',     '3101000006', 'TAQUILLERO',     'NOCHE',  '2025-06-02', TRUE),   -- 6
(NULL, '1020100007', 'Daniela Fernanda','Roa Cifuentes',    '3101000007', 'TAQUILLERO',     'NOCHE',  '2026-01-12', TRUE),   -- 7
(NULL, '1020100008', 'Jhon Edison',    'Vega Salgado',      '3101000008', 'DULCERIA',       'MANANA', '2024-02-15', TRUE),   -- 8
(NULL, '1020100009', 'Paola Andrea',   'Guerrero Nieto',    '3101000009', 'DULCERIA',       'TARDE',  '2024-03-01', TRUE),   -- 9
(NULL, '1020100010', 'Wilmer Alexander','Soto Barragán',    '3101000010', 'DULCERIA',       'TARDE',  '2025-02-17', TRUE),   -- 10
(NULL, '1020100011', 'Lina Marcela',   'Ariza Quevedo',     '3101000011', 'DULCERIA',       'NOCHE',  '2025-09-01', TRUE),   -- 11
(NULL, '1020100012', 'Óscar Iván',     'Beltrán Camacho',   '3101000012', 'DULCERIA',       'NOCHE',  '2024-04-01', FALSE),  -- 12 (retirado)
(1,    '52100013', 'Sandra Milena',    'Rueda Patiño',      '3101000013', 'ENCARGADO_SALA', 'MANANA', '2024-02-01', TRUE),   -- 13 Roble
(2,    '52100014', 'Héctor Fabián',    'Moya Estupiñán',    '3101000014', 'ENCARGADO_SALA', 'TARDE',  '2024-02-01', TRUE),   -- 14 Cedro
(3,    '52100015', 'Adriana Lucía',    'Barón Téllez',      '3101000015', 'ENCARGADO_SALA', 'TARDE',  '2024-02-01', TRUE),   -- 15 Guayacán
(4,    '52100016', 'Javier Mauricio',  'Cely Rodríguez',    '3101000016', 'ENCARGADO_SALA', 'NOCHE',  '2025-04-01', TRUE),   -- 16 Ceiba
(5,    '52100017', 'Mónica Patricia',  'Tello Aguirre',     '3101000017', 'ENCARGADO_SALA', 'NOCHE',  '2025-04-01', TRUE),   -- 17 Sauce
(1,    '1020100018', 'Gloria Stella',  'Parra Medina',      '3101000018', 'ASEO',           'MANANA', '2024-02-01', TRUE),   -- 18
(2,    '1020100019', 'Nelson Eduardo', 'Acevedo Ruiz',      '3101000019', 'ASEO',           'TARDE',  '2024-02-01', TRUE),   -- 19
(3,    '1020100020', 'Yesenia',        'Montaño Gil',       '3101000020', 'ASEO',           'TARDE',  '2026-02-02', TRUE),   -- 20
(4,    '1020100021', 'Fabio Andrés',   'Sierra Londoño',    '3101000021', 'ASEO',           'NOCHE',  '2026-02-02', TRUE),   -- 21
(5,    '1020100022', 'Martha Cecilia', 'Orjuela Prada',     '3101000022', 'ASEO',           'NOCHE',  '2025-08-04', TRUE),   -- 22
(1,    '80100023', 'Édgar Leonardo',   'Palacios Rincón',   '3101000023', 'PROYECCIONISTA', 'MANANA', '2024-02-01', TRUE),   -- 23
(2,    '80100024', 'Rubén Darío',      'Cañón Agudelo',     '3101000024', 'PROYECCIONISTA', 'TARDE',  '2024-02-01', TRUE),   -- 24
(3,    '80100025', 'Kevin Andrés',     'Mejía Torres',      '3101000025', 'PROYECCIONISTA', 'TARDE',  '2025-05-05', TRUE),   -- 25
(4,    '80100026', 'Sergio Iván',      'Rozo Linares',      '3101000026', 'PROYECCIONISTA', 'NOCHE',  '2025-05-05', TRUE),   -- 26
(5,    '80100027', 'Diana Carolina',   'Fonseca Vélez',     '3101000027', 'PROYECCIONISTA', 'NOCHE',  '2026-06-01', TRUE),   -- 27
(NULL, '79100028', 'Orlando',          'Peñuela Garzón',    '3101000028', 'SEGURIDAD',      'MANANA', '2024-02-01', TRUE),   -- 28
(NULL, '79100029', 'Wilson Fernando',  'Chaparro Mora',     '3101000029', 'SEGURIDAD',      'TARDE',  '2025-10-01', TRUE),   -- 29
(NULL, '79100030', 'Néstor Raúl',      'Gutiérrez Pulido',  '3101000030', 'SEGURIDAD',      'NOCHE',  '2026-04-01', TRUE);   -- 30

-- 6. Contratos (30)
--    Un contrato VIGENTE por empleado activo (29) y uno FINALIZADO para
--    el empleado retirado (id_staff 12). fecha_fin NULL solo en INDEFINIDO.
INSERT INTO contratos
    (id_staff, tipo_contrato, jornada, fecha_inicio, fecha_fin, salario_mensual, estado) VALUES
(1,  'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-01-15', NULL,         5200000.00, 'VIGENTE'),
(2,  'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-01-15', NULL,         4800000.00, 'VIGENTE'),
(3,  'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         1950000.00, 'VIGENTE'),
(4,  'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         1950000.00, 'VIGENTE'),
(5,  'FIJO',        'TIEMPO_COMPLETO', '2026-03-10', '2027-03-09', 1900000.00, 'VIGENTE'),
(6,  'FIJO',        'TIEMPO_COMPLETO', '2025-06-02', '2026-12-01', 1900000.00, 'VIGENTE'),
(7,  'APRENDIZAJE', 'MEDIO_TIEMPO',    '2026-01-12', '2027-01-11', 1750000.00, 'VIGENTE'),
(8,  'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-15', NULL,         1850000.00, 'VIGENTE'),
(9,  'INDEFINIDO',  'MEDIO_TIEMPO',    '2024-03-01', NULL,         1100000.00, 'VIGENTE'),
(10, 'FIJO',        'POR_HORAS',       '2025-02-17', '2026-12-31', 1300000.00, 'VIGENTE'),
(11, 'OBRA_LABOR',  'TIEMPO_COMPLETO', '2025-09-01', '2027-02-28', 1850000.00, 'VIGENTE'),
(12, 'FIJO',        'TIEMPO_COMPLETO', '2024-04-01', '2025-03-31', 1800000.00, 'FINALIZADO'),
(13, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         2450000.00, 'VIGENTE'),
(14, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         2450000.00, 'VIGENTE'),
(15, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         2450000.00, 'VIGENTE'),
(16, 'FIJO',        'TIEMPO_COMPLETO', '2025-04-01', '2026-12-31', 2400000.00, 'VIGENTE'),
(17, 'FIJO',        'TIEMPO_COMPLETO', '2025-04-01', '2026-12-31', 2400000.00, 'VIGENTE'),
(18, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         1850000.00, 'VIGENTE'),
(19, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         1850000.00, 'VIGENTE'),
(20, 'FIJO',        'TIEMPO_COMPLETO', '2026-02-02', '2027-02-01', 1800000.00, 'VIGENTE'),
(21, 'FIJO',        'TIEMPO_COMPLETO', '2026-02-02', '2027-02-01', 1800000.00, 'VIGENTE'),
(22, 'OBRA_LABOR',  'POR_HORAS',       '2025-08-04', '2027-08-03', 1400000.00, 'VIGENTE'),
(23, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         2900000.00, 'VIGENTE'),
(24, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         2900000.00, 'VIGENTE'),
(25, 'FIJO',        'TIEMPO_COMPLETO', '2025-05-05', '2027-05-04', 2750000.00, 'VIGENTE'),
(26, 'FIJO',        'TIEMPO_COMPLETO', '2025-05-05', '2027-05-04', 2750000.00, 'VIGENTE'),
(27, 'FIJO',        'TIEMPO_COMPLETO', '2026-06-01', '2027-05-31', 2700000.00, 'VIGENTE'),
(28, 'INDEFINIDO',  'TIEMPO_COMPLETO', '2024-02-01', NULL,         2050000.00, 'VIGENTE'),
(29, 'FIJO',        'TIEMPO_COMPLETO', '2025-10-01', '2026-12-31', 2000000.00, 'VIGENTE'),
(30, 'FIJO',        'TIEMPO_COMPLETO', '2026-04-01', '2027-03-31', 2000000.00, 'VIGENTE');

-- 7. Funciones (32)
--    1-14 FINALIZADA | 15 EN_CURSO | 16 CANCELADA | 17-32 PROGRAMADA
--    Formato compatible con la sala: 2D -> Roble, Ceiba, Guayacán;
--    3D -> Cedro, Sauce, Guayacán. Sin traslapes dentro de una sala.
--    Salas: 1 Roble, 2 Cedro, 3 Guayacán, 4 Ceiba, 5 Sauce.
INSERT INTO funciones
    (id_sala, id_actor_director, titulo_pelicula, clasificacion, formato, version_idioma,
     fecha_hora_inicio, fecha_hora_fin, estado) VALUES
-- Finalizadas
(1, 3,  'La Ruta del Colibrí',                  'T',   '2D', 'DOBLADA',     '2026-09-27 15:00', '2026-09-27 16:35', 'FINALIZADA'),  -- 1
(1, 5,  'Noche en Villa Esperanza',             '+15', '2D', 'SUBTITULADA', '2026-09-27 19:00', '2026-09-27 20:52', 'FINALIZADA'),  -- 2
(1, 7,  'Papá en Apuros',                       '+7',  '2D', 'DOBLADA',     '2026-10-03 16:00', '2026-10-03 17:38', 'FINALIZADA'),  -- 3
(2, 8,  'Galaxia Nómada',                       '+7',  '3D', 'DOBLADA',     '2026-09-26 15:30', '2026-09-26 17:14', 'FINALIZADA'),  -- 4
(2, 9,  'Océano Profundo',                      '+12', '3D', 'SUBTITULADA', '2026-09-26 19:30', '2026-09-26 21:42', 'FINALIZADA'),  -- 5
(2, 14, 'Aventuras en el Bosque Encantado',     'T',   '3D', 'DOBLADA',     '2026-10-04 14:00', '2026-10-04 15:28', 'FINALIZADA'),  -- 6
(3, 2,  'El Jardín de Cristal',                 '+12', '2D', 'SUBTITULADA', '2026-09-28 18:00', '2026-09-28 20:01', 'FINALIZADA'),  -- 7
(3, 11, 'Tormenta Roja',                        '+18', '2D', 'SUBTITULADA', '2026-10-02 20:30', '2026-10-02 22:36', 'FINALIZADA'),  -- 8
(3, 10, 'Código Aurora',                        '+12', '3D', 'SUBTITULADA', '2026-10-03 19:00', '2026-10-03 20:55', 'FINALIZADA'),  -- 9
(4, 6,  'Cenizas de Julio',                     '+15', '2D', 'SUBTITULADA', '2026-09-29 18:30', '2026-09-29 20:19', 'FINALIZADA'),  -- 10
(4, 4,  'El Silencio del Valle',                '+18', '2D', 'SUBTITULADA', '2026-10-01 21:00', '2026-10-01 22:57', 'FINALIZADA'),  -- 11
(4, 15, 'Mi Abuela la Hechicera',               'T',   '2D', 'DOBLADA',     '2026-10-04 11:00', '2026-10-04 12:32', 'FINALIZADA'),  -- 12
(5, 12, 'Rumbo a Marte',                        '+7',  '3D', 'DOBLADA',     '2026-10-03 17:00', '2026-10-03 18:50', 'FINALIZADA'),  -- 13
(5, 17, 'Dragones del Alba',                    '+7',  '3D', 'DOBLADA',     '2026-10-04 16:00', '2026-10-04 17:41', 'FINALIZADA'),  -- 14
-- En curso y cancelada
(4, 13, 'Duelo en la Frontera',                 '+15', '2D', 'SUBTITULADA', '2026-10-06 14:30', '2026-10-06 16:38', 'EN_CURSO'),    -- 15
(5, 10, 'Código Aurora',                        '+12', '3D', 'SUBTITULADA', '2026-10-05 20:00', '2026-10-05 21:55', 'CANCELADA'),   -- 16
-- Programadas
(1, 16, 'Latidos',                              '+12', '2D', 'SUBTITULADA', '2026-10-07 17:00', '2026-10-07 18:46', 'PROGRAMADA'),  -- 17
(1, 13, 'Duelo en la Frontera',                 '+15', '2D', 'SUBTITULADA', '2026-10-07 20:00', '2026-10-07 22:08', 'PROGRAMADA'),  -- 18
(1, 3,  'La Ruta del Colibrí',                  'T',   '2D', 'DOBLADA',     '2026-10-10 14:00', '2026-10-10 15:35', 'PROGRAMADA'),  -- 19
(1, 7,  'Papá en Apuros',                       '+7',  '2D', 'DOBLADA',     '2026-10-10 16:30', '2026-10-10 18:08', 'PROGRAMADA'),  -- 20
(2, 12, 'Rumbo a Marte',                        '+7',  '3D', 'DOBLADA',     '2026-10-08 17:30', '2026-10-08 19:20', 'PROGRAMADA'),  -- 21
(2, 9,  'Océano Profundo',                      '+12', '3D', 'SUBTITULADA', '2026-10-08 20:00', '2026-10-08 22:12', 'PROGRAMADA'),  -- 22
(2, 17, 'Dragones del Alba',                    '+7',  '3D', 'DOBLADA',     '2026-10-11 15:00', '2026-10-11 16:41', 'PROGRAMADA'),  -- 23
(3, 11, 'Tormenta Roja',                        '+18', '2D', 'SUBTITULADA', '2026-10-09 20:30', '2026-10-09 22:36', 'PROGRAMADA'),  -- 24
(3, 2,  'El Jardín de Cristal',                 '+12', '2D', 'SUBTITULADA', '2026-10-10 19:00', '2026-10-10 21:01', 'PROGRAMADA'),  -- 25
(3, 10, 'Código Aurora',                        '+12', '3D', 'SUBTITULADA', '2026-10-12 19:30', '2026-10-12 21:25', 'PROGRAMADA'),  -- 26
(4, 4,  'El Silencio del Valle',                '+18', '2D', 'SUBTITULADA', '2026-10-09 21:00', '2026-10-09 22:57', 'PROGRAMADA'),  -- 27
(4, 15, 'Mi Abuela la Hechicera',               'T',   '2D', 'DOBLADA',     '2026-10-11 11:00', '2026-10-11 12:32', 'PROGRAMADA'),  -- 28
(4, 6,  'Cenizas de Julio',                     '+15', '2D', 'SUBTITULADA', '2026-10-11 18:00', '2026-10-11 19:49', 'PROGRAMADA'),  -- 29
(5, 8,  'Galaxia Nómada',                       '+7',  '3D', 'DOBLADA',     '2026-10-10 15:00', '2026-10-10 16:44', 'PROGRAMADA'),  -- 30
(5, 14, 'Aventuras en el Bosque Encantado',     'T',   '3D', 'DOBLADA',     '2026-10-11 11:30', '2026-10-11 12:58', 'PROGRAMADA'),  -- 31
(5, 10, 'Código Aurora',                        '+12', '3D', 'SUBTITULADA', '2026-10-12 19:00', '2026-10-12 20:55', 'PROGRAMADA');  -- 32

-- 8. Ventas (45)
--    id_staff 3-7 son TAQUILLEROS activos. precio_unitario = precio del
--    tipo de boleta (1 General 18000 | 2 Estudiante 14000 | 3 Adulto
--    mayor 12000 | 4 Niño 10000 | 5 Amigo del Bosque 13000).
--    Orden de columnas: espectador, función, tipo boleta, staff, fecha,
--    cantidad, precio, método de pago, estado.
INSERT INTO ventas
    (id_espectador, id_funcion, id_tipo_boleta, id_staff, fecha_venta, cantidad, precio_unitario, metodo_pago, estado) VALUES
-- Función 1 (T, Roble)
(18,  1, 4, 3, '2026-09-27 10:20', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 1
(6,   1, 1, 4, '2026-09-26 16:45', 4, 18000.00, 'TARJETA',       'PAGADA'),   -- 2
-- Función 2 (+15, Roble)
(1,   2, 1, 5, '2026-09-27 17:30', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 3
(22,  2, 5, 5, '2026-09-27 18:05', 1, 13000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 4
-- Función 3 (+7, Roble)
(7,   3, 1, 4, '2026-10-03 13:40', 3, 18000.00, 'EFECTIVO',      'PAGADA'),   -- 5
(19,  3, 4, 4, '2026-10-03 14:10', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 6
-- Función 4 (+7, Cedro 3D)
(20,  4, 4, 3, '2026-09-26 11:00', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 7
(8,   4, 1, 3, '2026-09-26 12:15', 4, 18000.00, 'TARJETA',       'PAGADA'),   -- 8
(14,  4, 3, 4, '2026-09-25 17:20', 2, 12000.00, 'EFECTIVO',      'PAGADA'),   -- 9
-- Función 5 (+12, Cedro 3D)
(3,   5, 2, 6, '2026-09-26 18:40', 2, 14000.00, 'TARJETA',       'PAGADA'),   -- 10
(10,  5, 2, 6, '2026-09-26 18:55', 3, 14000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 11
(27,  5, 1, 7, '2026-09-26 19:05', 1, 18000.00, 'TARJETA',       'PAGADA'),   -- 12
-- Función 6 (T, Cedro 3D)
(21,  6, 4, 3, '2026-10-04 10:30', 3, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 13
(28,  6, 5, 3, '2026-10-04 11:00', 4, 13000.00, 'TARJETA',       'PAGADA'),   -- 14
-- Función 7 (+12, Guayacán VIP)
(13,  7, 1, 5, '2026-09-28 15:10', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 15
(24,  7, 5, 5, '2026-09-28 16:20', 2, 13000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 16
(2,   7, 1, 4, '2026-09-27 12:00', 4, 18000.00, 'TARJETA',       'PAGADA'),   -- 17
-- Función 8 (+18, Guayacán VIP)
(12,  8, 1, 6, '2026-10-02 18:45', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 18
(29,  8, 1, 7, '2026-10-01 19:30', 2, 18000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 19
(9,   8, 2, 6, '2026-10-02 19:40', 1, 14000.00, 'EFECTIVO',      'PAGADA'),   -- 20
-- Función 9 (+12, Guayacán VIP 3D)
(23,  9, 1, 7, '2026-10-03 17:50', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 21
(30,  9, 5, 6, '2026-10-03 18:15', 3, 13000.00, 'TARJETA',       'PAGADA'),   -- 22
-- Función 10 (+15, Ceiba)
(4,  10, 2, 5, '2026-09-29 16:40', 2, 14000.00, 'TARJETA',       'PAGADA'),   -- 23
(25, 10, 2, 5, '2026-09-29 17:00', 2, 14000.00, 'EFECTIVO',      'PAGADA'),   -- 24
(31, 10, 2, 5, '2026-09-29 17:25', 1, 14000.00, 'EFECTIVO',      'PAGADA'),   -- 25
-- Función 11 (+18, Ceiba)
(11, 11, 1, 7, '2026-10-01 19:50', 3, 18000.00, 'TARJETA',       'PAGADA'),   -- 26
(15, 11, 3, 6, '2026-10-01 19:10', 2, 12000.00, 'EFECTIVO',      'PAGADA'),   -- 27
-- Función 12 (T, Ceiba)
(18, 12, 4, 3, '2026-10-03 18:00', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 28
(26, 12, 2, 3, '2026-10-04 09:30', 2, 14000.00, 'TARJETA',       'PAGADA'),   -- 29
-- Función 13 (+7, Sauce 3D)
(5,  13, 2, 4, '2026-10-03 13:00', 4, 14000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 30
(16, 13, 3, 4, '2026-10-03 14:20', 2, 12000.00, 'EFECTIVO',      'PAGADA'),   -- 31
(21, 13, 4, 4, '2026-10-03 15:00', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 32
-- Función 14 (+7, Sauce 3D)
(17, 14, 3, 4, '2026-10-04 13:30', 2, 12000.00, 'EFECTIVO',      'PAGADA'),   -- 33
(32, 14, 2, 4, '2026-10-04 14:00', 3, 14000.00, 'TARJETA',       'PAGADA'),   -- 34
(6,  14, 1, 4, '2026-10-04 12:45', 2, 18000.00, 'TARJETA',       'ANULADA'),  -- 35
-- Funciones programadas
(1,  17, 1, 4, '2026-10-05 15:00', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 36 (Roble +12)
(3,  17, 2, 5, '2026-10-05 18:10', 2, 14000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 37
(6,  18, 1, 5, '2026-10-05 19:00', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 38 (Roble +15)
(20, 21, 4, 3, '2026-10-05 11:30', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 39 (Cedro +7)
(8,  21, 1, 3, '2026-10-05 12:00', 3, 18000.00, 'TARJETA',       'PAGADA'),   -- 40
(12, 24, 1, 6, '2026-10-05 20:00', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 41 (VIP +18)
(29, 24, 5, 7, '2026-10-05 20:30', 2, 13000.00, 'TRANSFERENCIA', 'PAGADA'),   -- 42
(13, 25, 1, 6, '2026-10-05 21:00', 2, 18000.00, 'TARJETA',       'PAGADA'),   -- 43 (VIP +12)
(19, 30, 4, 3, '2026-10-06 09:30', 2, 10000.00, 'EFECTIVO',      'PAGADA'),   -- 44 (Sauce +7)
(14, 30, 3, 3, '2026-10-06 09:50', 2, 12000.00, 'EFECTIVO',      'PAGADA');   -- 45

COMMIT;
