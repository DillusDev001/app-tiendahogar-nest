-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-01-2025 a las 23:12:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendahogarDB`
--
CREATE DATABASE IF NOT EXISTS `tiendahogarDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tiendahogarDB`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesor`
--

CREATE TABLE `asesor` (
  `ci` varchar(500) NOT NULL,
  `fec_ingreso` varchar(500) NOT NULL,
  `antiguedad` int(11) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth`
--

CREATE TABLE `auth` (
  `usuario` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `pregunta` varchar(500) NOT NULL,
  `respuesta` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auth`
--

INSERT INTO `auth` (`usuario`, `password`, `pregunta`, `respuesta`, `fec_mod`, `user_mod`) VALUES
('dillus.lab.bo@gmail.com', '$2b$10$ioSiFeaaf13pLsTqdQP71eivRYyI.oAt3R.sU46ZHQ6FRU2KyJAjW', '$2b$10$98Dn49x6ALCVeMuWxiXaHuxyyPGHdODMrUraui0OmIkcg4mBZNWBi', '$2b$10$bKYTpIWM1qtN3OoLRft/..iVors7W.L57ak7taxfm7SmcNK9dVAFS', '2024-12-02 21:22:44', 'system');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiario`
--

CREATE TABLE `beneficiario` (
  `ci` varchar(500) NOT NULL,
  `nombre_beneficiario` varchar(500) NOT NULL,
  `celular_beneficiario` varchar(500) NOT NULL,
  `ci_beneficiario` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comision`
--

CREATE TABLE `comision` (
  `id_comision` int(11) NOT NULL,
  `antiguedad` int(11) NOT NULL,
  `min_anios` int(11) NOT NULL,
  `max_anios` int(11) NOT NULL,
  `comision` decimal(10,2) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comision`
--

INSERT INTO `comision` (`id_comision`, `antiguedad`, `min_anios`, `max_anios`, `comision`, `fec_mod`, `user_mod`) VALUES
(1, 0, 0, 0, 0.00, '2024-11-11 20:58:16', 'string'),
(2, 0, 0, 0, 0.00, '2024-11-11 20:58:16', 'string'),
(3, 6, 0, 6, 0.00, '2024-11-11 21:00:34', 'mod');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comision_pago`
--

CREATE TABLE `comision_pago` (
  `cod_contrato` varchar(100) NOT NULL,
  `ci_asesor` varchar(500) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `moneda` varchar(500) NOT NULL,
  `fec_pago` varchar(500) NOT NULL,
  `tipo_pago` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comision_pago`
--

INSERT INTO `comision_pago` (`cod_contrato`, `ci_asesor`, `monto`, `moneda`, `fec_pago`, `tipo_pago`, `fec_mod`, `user_mod`, `estado`) VALUES
('string1', '4741134', 200.10, 'Bolivianos', '18/11/2024', 'Efectivo', '2024-11-19 00:36:41', 'string', 1),
('string2', '4741134', 300.10, 'Bolivianos', '18/11/2024', 'Efectivo', '2024-11-19 00:44:44', 'systen3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `ci` varchar(500) NOT NULL,
  `nombre_contacto` varchar(500) NOT NULL,
  `celular_contacto` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `cod_contrato` varchar(100) NOT NULL,
  `anio` int(11) NOT NULL,
  `sec` int(11) NOT NULL,
  `fec_crea` varchar(500) NOT NULL,
  `id_paquete` int(11) NOT NULL,
  `monto_capital` decimal(10,2) NOT NULL,
  `tipo_contrato` varchar(500) NOT NULL,
  `grupal_individual` varchar(500) NOT NULL,
  `nombre_grupo` varchar(500) NOT NULL,
  `reinversion` varchar(500) NOT NULL,
  `cod_contrato_anterior` varchar(500) NOT NULL,
  `periodo_devolucion` varchar(500) NOT NULL,
  `ci_asesor` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`cod_contrato`, `anio`, `sec`, `fec_crea`, `id_paquete`, `monto_capital`, `tipo_contrato`, `grupal_individual`, `nombre_grupo`, `reinversion`, `cod_contrato_anterior`, `periodo_devolucion`, `ci_asesor`, `fec_mod`, `user_mod`, `estado`) VALUES
('string1', 0, 0, 'string', 1, 1.20, 'string', 'string', 'string', 'string', 'string', 'string', 'string', '2024-11-18 17:41:30', 'system2', 1),
('string2', 0, 0, 'string', 1, 23000.00, 'string', 'string', 'string', 'string', 'string', 'string', '4741134', '2024-11-19 00:43:49', 'system', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato_deposito`
--

CREATE TABLE `contrato_deposito` (
  `cod_contrato` varchar(100) NOT NULL,
  `sec` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `ci_depositante` varchar(500) NOT NULL,
  `fec_deposito` varchar(500) NOT NULL,
  `tipo_deposito` varchar(500) NOT NULL,
  `descripcion` varchar(5000) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrato_deposito`
--

INSERT INTO `contrato_deposito` (`cod_contrato`, `sec`, `monto`, `ci_depositante`, `fec_deposito`, `tipo_deposito`, `descripcion`, `fec_mod`, `user_mod`, `estado`) VALUES
('string1', 1, 100.20, '0', '18/11/2024', 'string', 'string', '2024-11-18 23:59:58', 'string', 1),
('string1', 2, 100.20, '0', '18/11/2024', 'string', 'string', '2024-11-19 00:08:14', 'system 2', 1),
('string1', 3, 0.00, '4741134', 'string', 'string', 'string', '2024-11-19 02:32:23', 'string', 1),
('string2', 1, 100.00, '4741134', 'string', 'string', 'string', '2024-11-19 01:06:37', 'system', 1),
('string2', 2, 100.00, '4741134', 'string', 'string', 'string', '2024-11-19 01:07:12', 'system', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato_grupo`
--

CREATE TABLE `contrato_grupo` (
  `cod_contrato` varchar(100) NOT NULL,
  `ci` varchar(500) NOT NULL,
  `sec` int(11) NOT NULL,
  `rol` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrato_grupo`
--

INSERT INTO `contrato_grupo` (`cod_contrato`, `ci`, `sec`, `rol`, `fec_mod`, `user_mod`, `estado`) VALUES
('string1', '2450892', 3, 'Depositante', '2024-11-18 21:56:52', 'string', 1),
('string1', '2461088', 2, 'Depositante', '2024-11-18 21:56:52', 'string', 1),
('string1', '4741134', 1, 'Representante', '2024-11-18 21:52:25', 'string', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato_plan_devolucion`
--

CREATE TABLE `contrato_plan_devolucion` (
  `cod_contrato` varchar(100) NOT NULL,
  `sec` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fec_devolucion` varchar(500) NOT NULL,
  `razon_devolucion` varchar(500) NOT NULL,
  `tipo_devolucion` varchar(500) NOT NULL,
  `ci_devolucion` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrato_plan_devolucion`
--

INSERT INTO `contrato_plan_devolucion` (`cod_contrato`, `sec`, `monto`, `fec_devolucion`, `razon_devolucion`, `tipo_devolucion`, `ci_devolucion`, `fec_mod`, `user_mod`, `estado`) VALUES
('string1', 1, 100.00, 'string', 'string', 'string', '4741134', '2024-11-19 03:28:20', 'string', 1),
('string1', 2, 0.00, 'string', 'string', 'string', 'string', '2024-11-19 02:48:42', 'string', 1),
('string1', 3, 0.00, 'string', 'string', 'string', 'string', '2024-11-19 02:48:42', 'string', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_bancaria`
--

CREATE TABLE `cuenta_bancaria` (
  `ci` varchar(500) NOT NULL,
  `banco` varchar(500) NOT NULL,
  `nro_cuenta` varchar(500) NOT NULL,
  `moneda` varchar(500) NOT NULL,
  `tipo_cuenta` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositante`
--

CREATE TABLE `depositante` (
  `ci` varchar(500) NOT NULL,
  `ocupacion` varchar(500) NOT NULL,
  `sector` varchar(500) NOT NULL,
  `nota` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositante`
--

INSERT INTO `depositante` (`ci`, `ocupacion`, `sector`, `nota`, `fec_mod`, `user_mod`, `estado`) VALUES
('2450892', 'Father', 'father', 'asd', '2024-12-24 02:48:22', 'admin php', 1),
('4741134', 'Soltero', 'Soltero', 'nota', '2024-12-24 02:15:13', 'admin php', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `id_paquete` int(11) NOT NULL,
  `paquete` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo_contrato` varchar(500) NOT NULL,
  `monto_min` decimal(10,2) NOT NULL,
  `monto_max` decimal(10,2) NOT NULL,
  `interes` decimal(10,2) NOT NULL,
  `plazo` varchar(500) NOT NULL,
  `moneda` varchar(500) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`id_paquete`, `paquete`, `descripcion`, `tipo_contrato`, `monto_min`, `monto_max`, `interes`, `plazo`, `moneda`, `fec_mod`, `user_mod`, `estado`) VALUES
(1, 'string', 'string', 'string', 0.00, 0.00, 0.00, 'string', 'string', '2024-11-18 17:33:54', 'system', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `ci` varchar(500) NOT NULL,
  `exp` varchar(500) NOT NULL,
  `nombres` varchar(500) NOT NULL,
  `apellidos` varchar(500) NOT NULL,
  `code` varchar(500) NOT NULL,
  `celular` varchar(500) NOT NULL,
  `nacionalidad` varchar(500) NOT NULL,
  `fec_nac` varchar(500) NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL DEFAULT '',
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`ci`, `exp`, `nombres`, `apellidos`, `code`, `celular`, `nacionalidad`, `fec_nac`, `direccion`, `descripcion`, `fec_mod`, `user_mod`) VALUES
('0', '0', '0', '0', '0', '0', '0', '0', '0', '', '2024-11-18 23:57:07', 'system'),
('2450892', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', '', '2024-11-18 21:54:04', 'string'),
('2461088', 'LP', 'Juana Maria', 'Chui Apaza', '+591', '71542079', 'Boliviana', '1957-11-24', 'string', '', '2025-01-08 19:53:13', 'string'),
('4741134', 'LP', 'Diego Junior', 'Llusco Chui', '+591', '77255776', 'Boliviana', '1987-09-30', 'string', '', '2024-12-25 00:57:33', 'system');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `riesgo`
--

CREATE TABLE `riesgo` (
  `ocupacion` varchar(100) NOT NULL,
  `sector` varchar(100) NOT NULL,
  `ingreso` decimal(10,2) NOT NULL,
  `umbral` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `riesgo`
--

INSERT INTO `riesgo` (`ocupacion`, `sector`, `ingreso`, `umbral`) VALUES
('string1', 'Independiente', 0.00, 0.00),
('string1', 'Privado', 0.00, 0.00),
('string1', 'Público', 0.00, 0.00),
('string2', 'Público', 0.00, 0.00),
('string3', 'Independiente', 0.00, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol` varchar(500) NOT NULL,
  `autorizacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cambio`
--

CREATE TABLE `tipo_cambio` (
  `moneda` varchar(500) NOT NULL,
  `compra` decimal(10,2) NOT NULL,
  `venta` decimal(10,2) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_cambio`
--

INSERT INTO `tipo_cambio` (`moneda`, `compra`, `venta`, `fec_mod`, `user_mod`, `estado`) VALUES
('Bolivianos', 6.00, 6.00, '2024-11-11 00:11:31', 'Junior', 1),
('Dolares', 2.69, 2.65, '2024-11-11 00:03:31', 'string', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ci` varchar(500) NOT NULL,
  `usuario` varchar(500) NOT NULL,
  `rol` varchar(500) NOT NULL,
  `autorizacion` int(11) NOT NULL,
  `fec_mod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_mod` varchar(500) NOT NULL,
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ci`, `usuario`, `rol`, `autorizacion`, `fec_mod`, `user_mod`, `estado`) VALUES
('4741134', 'dillus.lab.bo@gmail.com', 'Developer', 0, '2024-12-02 21:20:35', 'string', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asesor`
--
ALTER TABLE `asesor`
  ADD PRIMARY KEY (`ci`);

--
-- Indices de la tabla `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD PRIMARY KEY (`ci`);

--
-- Indices de la tabla `comision`
--
ALTER TABLE `comision`
  ADD PRIMARY KEY (`id_comision`);

--
-- Indices de la tabla `comision_pago`
--
ALTER TABLE `comision_pago`
  ADD PRIMARY KEY (`cod_contrato`,`ci_asesor`),
  ADD KEY `ci_asesor` (`ci_asesor`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`ci`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`cod_contrato`),
  ADD KEY `id_paquete` (`id_paquete`);

--
-- Indices de la tabla `contrato_deposito`
--
ALTER TABLE `contrato_deposito`
  ADD PRIMARY KEY (`cod_contrato`,`sec`);

--
-- Indices de la tabla `contrato_grupo`
--
ALTER TABLE `contrato_grupo`
  ADD PRIMARY KEY (`cod_contrato`,`ci`,`sec`),
  ADD KEY `ci` (`ci`);

--
-- Indices de la tabla `contrato_plan_devolucion`
--
ALTER TABLE `contrato_plan_devolucion`
  ADD PRIMARY KEY (`cod_contrato`,`sec`);

--
-- Indices de la tabla `cuenta_bancaria`
--
ALTER TABLE `cuenta_bancaria`
  ADD PRIMARY KEY (`ci`);

--
-- Indices de la tabla `depositante`
--
ALTER TABLE `depositante`
  ADD PRIMARY KEY (`ci`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`id_paquete`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`ci`);

--
-- Indices de la tabla `riesgo`
--
ALTER TABLE `riesgo`
  ADD PRIMARY KEY (`ocupacion`,`sector`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol`);

--
-- Indices de la tabla `tipo_cambio`
--
ALTER TABLE `tipo_cambio`
  ADD PRIMARY KEY (`moneda`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ci`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comision`
--
ALTER TABLE `comision`
  MODIFY `id_comision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `id_paquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asesor`
--
ALTER TABLE `asesor`
  ADD CONSTRAINT `asesor_ibfk_1` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD CONSTRAINT `beneficiario_ibfk_1` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comision_pago`
--
ALTER TABLE `comision_pago`
  ADD CONSTRAINT `comision_pago_ibfk_1` FOREIGN KEY (`cod_contrato`) REFERENCES `contrato` (`cod_contrato`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comision_pago_ibfk_2` FOREIGN KEY (`ci_asesor`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquete` (`id_paquete`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contrato_deposito`
--
ALTER TABLE `contrato_deposito`
  ADD CONSTRAINT `contrato_deposito_ibfk_1` FOREIGN KEY (`cod_contrato`) REFERENCES `contrato` (`cod_contrato`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contrato_grupo`
--
ALTER TABLE `contrato_grupo`
  ADD CONSTRAINT `contrato_grupo_ibfk_1` FOREIGN KEY (`cod_contrato`) REFERENCES `contrato` (`cod_contrato`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contrato_grupo_ibfk_2` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contrato_plan_devolucion`
--
ALTER TABLE `contrato_plan_devolucion`
  ADD CONSTRAINT `contrato_plan_devolucion_ibfk_1` FOREIGN KEY (`cod_contrato`) REFERENCES `contrato` (`cod_contrato`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuenta_bancaria`
--
ALTER TABLE `cuenta_bancaria`
  ADD CONSTRAINT `cuenta_bancaria_ibfk_1` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `depositante`
--
ALTER TABLE `depositante`
  ADD CONSTRAINT `depositante_ibfk_1` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ci`) REFERENCES `persona` (`ci`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
