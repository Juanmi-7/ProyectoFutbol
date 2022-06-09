-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2022 a las 10:38:46
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cdgenoves`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convocatoria`
--

CREATE TABLE `convocatoria` (
  `id` int(11) NOT NULL,
  `numero_partido` int(3) NOT NULL,
  `jugador` varchar(25) NOT NULL,
  `dia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `convocatoria`
--

INSERT INTO `convocatoria` (`id`, `numero_partido`, `jugador`, `dia`) VALUES
(1, 1, 'Álvaro Anillo', '2022-02-01'),
(2, 1, 'Andrés', '2022-02-01'),
(3, 1, 'Ángel', '2022-02-01'),
(4, 1, 'De la Osa', '2022-02-01'),
(5, 1, 'Fernando', '2022-02-01'),
(6, 1, 'Ismael', '2022-02-01'),
(7, 1, 'Jesús', '2022-02-01'),
(8, 1, 'Juanmi', '2022-02-01'),
(9, 1, 'Juli', '2022-02-01'),
(10, 1, 'Luis', '2022-02-01'),
(11, 2, 'Andrés', '2022-02-22'),
(12, 2, 'Ángel', '2022-02-22'),
(13, 2, 'De la Osa', '2022-02-22'),
(14, 2, 'Fernando', '2022-02-22'),
(15, 2, 'Ismael', '2022-02-22'),
(16, 2, 'Jesús', '2022-02-22'),
(17, 2, 'Juanmi', '2022-02-22'),
(18, 2, 'Juli', '2022-02-22'),
(19, 2, 'Luis', '2022-02-22'),
(20, 2, 'Pablo', '2022-02-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `fechnac` date DEFAULT NULL,
  `partidos` int(5) NOT NULL,
  `goles` int(5) NOT NULL,
  `asistencias` int(5) NOT NULL,
  `puntos` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre`, `fechnac`, `partidos`, `goles`, `asistencias`, `puntos`) VALUES
(1, 'Álvaro Anillo', '1990-05-25', 1, 1, 0, 2),
(2, 'Andrés', '1993-11-26', 2, 0, 1, 1),
(3, 'Ángel', '1980-08-10', 2, 1, 0, 2),
(4, 'De la Osa', '1984-04-12', 2, 0, 0, 0),
(5, 'Fernando', '1998-02-08', 2, 0, 2, 2),
(6, 'Ismael', '1995-06-20', 2, 3, 1, 7),
(7, 'Jesús', '1980-02-11', 2, 1, 1, 3),
(8, 'Juanmi', '1979-11-29', 2, 5, 0, 10),
(9, 'Juli', '1978-04-19', 2, 3, 0, 6),
(10, 'Luis', '1988-05-10', 2, 1, 1, 3),
(11, 'Pablo', '1993-06-17', 1, 0, 2, 2),
(12, 'Paco', '1989-03-16', 0, 0, 0, 0),
(13, 'Sergio Tejada', '1985-03-21', 0, 1, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `id` int(11) NOT NULL,
  `numero_partido` int(3) NOT NULL,
  `jugador` varchar(25) NOT NULL,
  `goles` int(3) NOT NULL,
  `asistencias` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`id`, `numero_partido`, `jugador`, `goles`, `asistencias`) VALUES
(1, 1, 'Álvaro Anillo', 1, 0),
(2, 1, 'Andrés', 0, 1),
(3, 1, 'Ángel', 1, 0),
(4, 1, 'De la Osa', 0, 0),
(5, 1, 'Fernando', 0, 1),
(6, 1, 'Ismael', 1, 0),
(7, 1, 'Jesús', 1, 1),
(8, 1, 'Juanmi', 1, 0),
(9, 1, 'Juli', 2, 0),
(10, 1, 'Luis', 0, 1),
(11, 2, 'Andrés', 0, 0),
(12, 2, 'Ángel', 0, 0),
(13, 2, 'De la Osa', 0, 0),
(14, 2, 'Fernando', 0, 1),
(15, 2, 'Ismael', 2, 0),
(16, 2, 'Jesús', 0, 0),
(17, 2, 'Juanmi', 2, 0),
(18, 2, 'Juli', 1, 0),
(19, 2, 'Luis', 0, 0),
(20, 2, 'Pablo', 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(25) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre_usuario`, `clave`, `status`) VALUES
(5, 'Juanmi', '$2a$10$XNlIRhcu.R2cMnVdAzhIhuWIaDziebZtOEkCw9BNs2rxj7CmS/Jvy', 'admin'),
(9, 'Luis', '$2a$10$GC3Z2NhnkEwZlrmMR25yW.vOy..S.huKBrklFrPHhN9wanii26Gqi', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `convocatoria`
--
ALTER TABLE `convocatoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`) USING BTREE;

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `convocatoria`
--
ALTER TABLE `convocatoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
