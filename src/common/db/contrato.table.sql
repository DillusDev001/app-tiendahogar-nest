CREATE TABLE contrato (
    cod_contrato VARCHAR(100) PRIMARY KEY NOT NULL,
    anio INT NOT NULL,
    sec INT NOT NULL,
    fec_crea VARCHAR(500) NOT NULL,
    id_paquete INT NOT NULL,
    monto_capital DECIMAL(10, 2) NOT NULL,
    tipo_contrato VARCHAR(500) NOT NULL,
    grupal_individual VARCHAR(500) NOT NULL,
    nombre_grupo VARCHAR(500) NOT NULL,
    reinversion VARCHAR(500) NOT NULL,
    cod_contrato_anterior VARCHAR(500) NOT NULL,
    periodo_devolucion VARCHAR(500) NOT NULL,
    ci_asesor VARCHAR(500) NOT NULL,
    fec_mod TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_mod VARCHAR(500) NOT NULL,
    estado INT DEFAULT 1,
    FOREIGN KEY (id_paquete) REFERENCES paquete(id_paquete) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE contrato_grupo (
    cod_contrato VARCHAR(100) NOT NULL,
    ci VARCHAR(500) NOT NULL,
    sec INT NOT NULL,
    rol VARCHAR(500) NOT NULL,
    fec_mod TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_mod VARCHAR(500) NOT NULL,
    estado INT DEFAULT 1,
    PRIMARY KEY (cod_contrato, ci, sec),
    FOREIGN KEY (cod_contrato) REFERENCES contrato(cod_contrato) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ci) REFERENCES persona(ci) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE contrato_deposito (
    cod_contrato VARCHAR(100) NOT NULL,
    sec INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    ci_depositante VARCHAR(500) NOT NULL,
    fec_deposito VARCHAR(500) NOT NULL,
    tipo_deposito VARCHAR(500) NOT NULL,
    descripcion VARCHAR(500) DEFAULT '',
    fec_mod TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_mod VARCHAR(500) NOT NULL,
    estado INT DEFAULT 1,
    PRIMARY KEY (cod_contrato, sec),
    FOREIGN KEY (cod_contrato) REFERENCES contrato(cod_contrato) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE contrato_plan_devolucion (
    cod_contrato VARCHAR(100) NOT NULL,
    sec INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fec_devolucion VARCHAR(500) NOT NULL,
    razon_devolucion VARCHAR(500) NOT NULL,
    tipo_devolucion VARCHAR(500) NOT NULL,
    ci_devolucion VARCHAR(500) NOT NULL,
    fec_mod TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_mod VARCHAR(500) NOT NULL,
    estado INT DEFAULT 1,
    PRIMARY KEY (cod_contrato, sec),
    FOREIGN KEY (cod_contrato) REFERENCES contrato(cod_contrato) ON UPDATE CASCADE ON DELETE CASCADE
);