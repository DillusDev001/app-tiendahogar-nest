CREATE TABLE riesgo (
    ocupacion VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    ingreso DECIMAL(10, 2) NOT NULL,
    umbral DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (ocupacion, sector)
);