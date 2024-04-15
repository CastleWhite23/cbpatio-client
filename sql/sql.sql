-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Abr-2024 às 17:21
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.1.1

CREATE DATABASE cb_patio;
USE cb_patio;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cb_patio`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `campeonato`
--


CREATE TABLE `campeonato` (
  `id_campeonato` int(11) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `foto` varchar(120) NOT NULL,
  `data` datetime DEFAULT NULL,
  `sinopse` varchar(120) DEFAULT NULL,
  `modalidade` varchar(20) DEFAULT NULL,
  `valor_entrada` float NOT NULL,
  `premiacao` float NOT NULL,
  `jogadores` int(11) NOT NULL,
  `limite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `campeonato`
--

INSERT INTO `campeonato` (`id_campeonato`, `nome`, `foto`, `data`, `sinopse`, `modalidade`, `valor_entrada`, `premiacao`, `jogadores`, `limite`) VALUES
(1, 'BoxFight 2v2 Fortnite', 'fotoCampeonatos\\1707533286367.jpeg', '2024-07-10 16:00:00', 'sei la oq nao sei o que la', 'BoxFight', 10, 1500, 2, 16),
(2, 'Fall guys (The ultimate batlle)', 'fotoCampeonatos\\1707533347499.jpg', '2023-06-11 16:00:00', 'vtnc pedro CB', 'Battle royale', 1.5, 200, 1, 40),
(45, 'COD Warzone', 'fotoCampeonatos\\1710966123452.jpg', '2024-03-28 17:21:00', 'wow cod warzone quye legal', 'Tiro', 15, 150, 2, 16);

-- --------------------------------------------------------

--
-- Estrutura da tabela `live_on`
--

CREATE TABLE `live_on` (
  `id_liveon` int(11) NOT NULL,
  `live_on` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `live_on`
--

INSERT INTO `live_on` (`id_liveon`, `live_on`) VALUES
(1, 's');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id_pagamento` int(11) NOT NULL,
  `fk_id_time` int(11) NOT NULL,
  `fk_id_campeonato` int(11) NOT NULL,
  `valor_pagamento` float NOT NULL,
  `hora_pagamento` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pagamentos`
--

INSERT INTO `pagamentos` (`id_pagamento`, `fk_id_time`, `fk_id_campeonato`, `valor_pagamento`, `hora_pagamento`) VALUES
(3, 18, 1, 10, '2024-03-06 12:41:32'),
(4, 10, 1, 10, '2024-03-06 12:41:32'),
(5, 22, 1, 10, '2024-03-06 12:41:32'),
(6, 11, 1, 10, '2024-03-06 12:41:32'),
(7, 19, 1, 10, '2024-03-06 12:41:32'),
(9, 14, 1, 10, '2024-03-06 12:41:32'),
(10, 16, 1, 10, '2024-03-06 12:41:32'),
(11, 9, 1, 10, '2024-03-06 12:41:32'),
(12, 17, 1, 10, '2024-03-06 12:41:32'),
(13, 25, 1, 10, '2024-03-06 12:41:32'),
(14, 12, 1, 10, '2024-03-06 12:41:32'),
(15, 13, 1, 10, '2024-03-06 12:41:32'),
(16, 24, 1, 10, '2024-03-06 12:41:32'),
(17, 21, 1, 10, '2024-03-06 12:41:32'),
(18, 15, 1, 10, '2024-03-06 12:41:32'),
(19, 18, 45, 10, '2024-04-15 10:58:39'),
(20, 10, 45, 10, '2024-04-15 11:00:53'),
(21, 34, 45, 10, '2024-04-15 11:00:53'),
(22, 22, 45, 10, '2024-04-15 11:00:53'),
(23, 11, 45, 10, '2024-04-15 11:00:53'),
(24, 19, 45, 10, '2024-04-15 11:00:53'),
(25, 20, 45, 10, '2024-04-15 11:00:53'),
(26, 14, 45, 10, '2024-04-15 11:00:53'),
(27, 16, 45, 10, '2024-04-15 11:00:53'),
(28, 9, 45, 10, '2024-04-15 11:00:53'),
(29, 17, 45, 10, '2024-04-15 11:00:53'),
(30, 13, 45, 10, '2024-04-15 11:00:53'),
(31, 33, 45, 10, '2024-04-15 11:00:53'),
(32, 15, 45, 10, '2024-04-15 11:00:53'),
(33, 21, 45, 10, '2024-04-15 11:00:53'),
(34, 25, 45, 10, '2024-04-15 11:00:53'),
(35, 35, 1, 10, '2024-04-15 11:24:35');

--
-- Acionadores `pagamentos`
--
DELIMITER $$
CREATE TRIGGER `tgr_time_pagou` AFTER INSERT ON `pagamentos` FOR EACH ROW INSERT INTO time_campeonato(fk_id_time, fk_id_campeonato, fase, jogo, chave, data_hora)
VALUES(NEW.fk_id_time, NEW.fk_id_campeonato, "", "", "", null)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitacao_time_usuario`
--

CREATE TABLE `solicitacao_time_usuario` (
  `id_solicitacao` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_time` int(11) NOT NULL,
  `aceitou` varchar(1) NOT NULL,
  `hora_envio` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `solicitacao_time_usuario`
--

INSERT INTO `solicitacao_time_usuario` (`id_solicitacao`, `fk_id_usuario`, `fk_id_time`, `aceitou`, `hora_envio`) VALUES
(1, 6, 10, 's', '2024-04-03 22:36:43'),
(2, 7, 10, 's', '2024-04-03 22:36:43'),
(10, 25, 10, 's', '2024-04-03 23:18:44'),
(11, 25, 10, 's', '2024-04-03 23:21:06'),
(12, 25, 10, 's', '2024-04-03 23:21:41'),
(19, 6, 20, 's', '2024-04-09 21:51:54'),
(21, 25, 20, 's', '2024-04-09 21:55:42'),
(23, 25, 33, 'n', '2024-04-09 22:18:34');

--
-- Acionadores `solicitacao_time_usuario`
--
DELIMITER $$
CREATE TRIGGER `tgr_time_solic` AFTER UPDATE ON `solicitacao_time_usuario` FOR EACH ROW INSERT INTO time_usuario(fk_id_usuario, fk_id_time) VALUES(NEW.fk_id_usuario, NEW.fk_id_time)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `time`
--

CREATE TABLE `time` (
  `id_time` int(11) NOT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `fk_id_capitao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `time`
--

INSERT INTO `time` (`id_time`, `nome`, `fk_id_capitao`) VALUES
(9, 'JRS Team', 4),
(10, 'Aviões do Forró', 6),
(11, 'clebunho', 4),
(12, 'nao sei fc', 6),
(13, 'palmeiras', 10),
(14, 'gremio', 1),
(15, 'sexo FC', 3),
(16, 'Inter', 10),
(17, 'Junior Barranquilla', 6),
(18, 'Atl. Mineiro', 6),
(19, 'Coringas', 4),
(20, 'Cuiabá', 6),
(21, 'Real Vardrid', 1),
(22, 'Bar sem lona', 10),
(24, 'Pererecos FC', 1),
(25, 'Lusa', 1),
(33, 'pauzudos FC', 33),
(34, 'awdawdadw', 25),
(35, 'pintudos CF', 33);

--
-- Acionadores `time`
--
DELIMITER $$
CREATE TRIGGER `tgr_time_user` AFTER INSERT ON `time` FOR EACH ROW INSERT INTO time_usuario(fk_id_usuario, fk_id_time) VALUES(NEW.fk_id_capitao, NEW.id_time)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `time_campeonato`
--

CREATE TABLE `time_campeonato` (
  `id_time_campeonato` int(11) NOT NULL,
  `fk_id_time` int(11) DEFAULT NULL,
  `fk_id_campeonato` int(11) DEFAULT NULL,
  `fase` varchar(20) NOT NULL,
  `jogo` varchar(10) NOT NULL,
  `chave` varchar(20) NOT NULL,
  `data_hora` datetime DEFAULT NULL,
  `aconteceu` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `time_campeonato`
--

INSERT INTO `time_campeonato` (`id_time_campeonato`, `fk_id_time`, `fk_id_campeonato`, `fase`, `jogo`, `chave`, `data_hora`, `aconteceu`) VALUES
(1390, 10, 1, 'oitavas', '1', 'esquerda', NULL, 's'),
(1391, 22, 1, 'oitavas', '1', 'esquerda', NULL, 's'),
(1392, 11, 1, 'oitavas', '2', 'esquerda', NULL, 's'),
(1395, 14, 1, 'oitavas', '2', 'esquerda', NULL, 's'),
(1397, 9, 1, 'oitavas', '3', 'esquerda', NULL, 's'),
(1399, 25, 1, 'oitavas', '3', 'esquerda', NULL, 's'),
(1400, 12, 1, 'oitavas', '4', 'esquerda', NULL, 's'),
(1401, 13, 1, 'oitavas', '4', 'esquerda', NULL, 's'),
(1402, 24, 1, 'oitavas', '1', 'direita', NULL, 's'),
(1403, 21, 1, 'oitavas', '1', 'direita', NULL, 's'),
(1404, 15, 1, 'oitavas', '2', 'direita', NULL, 's'),
(1405, 18, 1, 'oitavas', '2', 'direita', NULL, 's'),
(1407, 19, 1, 'oitavas', '3', 'direita', NULL, 's'),
(1408, 16, 1, 'oitavas', '3', 'direita', NULL, 's'),
(1409, 17, 1, 'oitavas', '4', 'direita', NULL, 's'),
(1817, 18, 45, 'oitavas', '1', 'esquerda', NULL, 's'),
(1818, 10, 45, 'oitavas', '2', 'esquerda', NULL, 's'),
(1819, 34, 45, 'oitavas', '1', 'esquerda', NULL, 's'),
(1820, 22, 45, 'oitavas', '2', 'esquerda', NULL, 's'),
(1821, 11, 45, 'oitavas', '3', 'esquerda', NULL, 's'),
(1822, 19, 45, 'oitavas', '3', 'esquerda', NULL, 's'),
(1823, 20, 45, 'oitavas', '4', 'esquerda', NULL, 's'),
(1824, 14, 45, 'oitavas', '4', 'esquerda', NULL, 's'),
(1825, 16, 45, 'oitavas', '1', 'direita', NULL, 's'),
(1826, 9, 45, 'oitavas', '1', 'direita', NULL, 's'),
(1827, 17, 45, 'oitavas', '2', 'direita', NULL, 's'),
(1828, 13, 45, 'oitavas', '2', 'direita', NULL, 's'),
(1829, 33, 45, 'oitavas', '3', 'direita', NULL, 's'),
(1830, 15, 45, 'oitavas', '3', 'direita', NULL, 's'),
(1831, 21, 45, 'oitavas', '4', 'direita', NULL, 's'),
(1832, 25, 45, 'oitavas', '4', 'direita', NULL, 's'),
(1833, 35, 1, 'oitavas', '4', 'direita', NULL, 's'),
(1867, 13, 1, 'quartas', '2', 'esquerda', '2024-05-02 12:13:34', ''),
(1868, 25, 1, 'quartas', '2', 'esquerda', '2024-05-02 12:13:34', ''),
(1869, 14, 1, 'quartas', '1', 'esquerda', '2024-05-09 12:13:39', ''),
(1870, 10, 1, 'quartas', '1', 'esquerda', '2024-05-09 12:13:39', ''),
(1871, 35, 1, 'quartas', '2', 'direita', '2024-04-27 12:11:29', ''),
(1872, 16, 1, 'quartas', '2', 'direita', '2024-04-27 12:11:29', ''),
(1873, 18, 1, 'quartas', '1', 'direita', '2024-04-30 12:13:22', ''),
(1874, 24, 1, 'quartas', '1', 'direita', '2024-04-30 12:13:22', ''),
(1875, 21, 1, 'eliminado oitavas', '', '', NULL, ''),
(1876, 22, 1, 'eliminado oitavas', '', '', NULL, ''),
(1877, 15, 1, 'eliminado oitavas', '', '', NULL, ''),
(1878, 11, 1, 'eliminado oitavas', '', '', NULL, ''),
(1879, 19, 1, 'eliminado oitavas', '', '', NULL, ''),
(1880, 9, 1, 'eliminado oitavas', '', '', NULL, ''),
(1881, 17, 1, 'eliminado oitavas', '', '', NULL, ''),
(1882, 12, 1, 'eliminado oitavas', '', '', NULL, ''),
(1883, 14, 45, 'quartas', '2', 'esquerda', NULL, 's'),
(1884, 19, 45, 'quartas', '2', 'esquerda', NULL, 's'),
(1885, 22, 45, 'quartas', '1', 'esquerda', NULL, 's'),
(1886, 18, 45, 'quartas', '1', 'esquerda', NULL, 's'),
(1887, 25, 45, 'quartas', '2', 'direita', NULL, 's'),
(1888, 33, 45, 'quartas', '2', 'direita', NULL, 's'),
(1889, 13, 45, 'quartas', '1', 'direita', NULL, 's'),
(1890, 16, 45, 'quartas', '1', 'direita', NULL, 's'),
(1891, 9, 45, 'eliminado oitavas', '', '', NULL, ''),
(1892, 34, 45, 'eliminado oitavas', '', '', NULL, ''),
(1893, 17, 45, 'eliminado oitavas', '', '', NULL, ''),
(1894, 10, 45, 'eliminado oitavas', '', '', NULL, ''),
(1895, 15, 45, 'eliminado oitavas', '', '', NULL, ''),
(1896, 11, 45, 'eliminado oitavas', '', '', NULL, ''),
(1897, 21, 45, 'eliminado oitavas', '', '', NULL, ''),
(1898, 20, 45, 'eliminado oitavas', '', '', NULL, ''),
(1899, 19, 45, 'semis', '1', 'esquerda', NULL, 's'),
(1900, 22, 45, 'semis', '1', 'esquerda', NULL, 's'),
(1901, 33, 45, 'semis', '1', 'direita', NULL, 's'),
(1902, 13, 45, 'semis', '1', 'direita', NULL, 's'),
(1903, 16, 45, 'eliminado quartas', '', '', NULL, ''),
(1904, 18, 45, 'eliminado quartas', '', '', NULL, ''),
(1905, 25, 45, 'eliminado quartas', '', '', NULL, ''),
(1906, 14, 45, 'eliminado quartas', '', '', NULL, ''),
(1907, 33, 45, 'final', '1', 'esquerda', NULL, ''),
(1908, 22, 45, 'final', '1', 'esquerda', NULL, ''),
(1909, 13, 45, 'eliminado semis', '', '', NULL, ''),
(1910, 19, 45, 'eliminado semis', '', '', NULL, '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `time_usuario`
--

CREATE TABLE `time_usuario` (
  `id_time_usuario` int(11) NOT NULL,
  `fk_id_usuario` int(11) DEFAULT NULL,
  `fk_id_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `time_usuario`
--

INSERT INTO `time_usuario` (`id_time_usuario`, `fk_id_usuario`, `fk_id_time`) VALUES
(3, 4, 9),
(7, 1, 9),
(9, 3, 10),
(10, 6, 10),
(11, 7, 10),
(12, 4, 11),
(13, 6, 12),
(14, 10, 13),
(15, 1, 14),
(16, 3, 15),
(17, 10, 16),
(18, 6, 17),
(19, 6, 18),
(20, 4, 19),
(21, 6, 20),
(22, 1, 21),
(23, 10, 22),
(24, 1, 24),
(25, 1, 25),
(27, 25, 18),
(28, 7, 10),
(39, 25, 20),
(40, 33, 33),
(42, 25, 34),
(44, 33, 35);

--
-- Acionadores `time_usuario`
--
DELIMITER $$
CREATE TRIGGER `tgr_tira_convite` BEFORE DELETE ON `time_usuario` FOR EACH ROW DELETE FROM solicitacao_time_usuario WHERE fk_id_usuario = OLD.fk_id_usuario AND fk_id_time = OLD.fk_id_time
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `nome_usuario` varchar(25) DEFAULT NULL,
  `foto` varchar(120) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `cpf` varchar(11) NOT NULL,
  `celular` varchar(16) NOT NULL,
  `senha` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `nome_usuario`, `foto`, `email`, `cpf`, `celular`, `senha`) VALUES
(1, 'clebinho', 'clebs_01', '', 'clebs@gmail.com', '', '', '$2b$10$qT68tuKTOERoskLKtUAV1.9h6AUvHQ.M9q3Yk4TVgYNhQaJuMLm3S'),
(3, 'Jonas', 'jo_123', '', 'uaihgfui@onawfgona.com', '', '', '$2b$10$NVqm3IxvBiLLa4fYPHBySevQZKBvjG7PHSHvSY/pDJOh8H7B.uwHm'),
(4, 'Ghost Rider de Oliveira', 'ghst_0123', '', 'iuafgbhw@gmail.com', '', '', '$2b$10$kMu1X5tD2ytiLBzuxoJ16./YH.noKpoyjpfHj1ojpTbB68WAZSFfC'),
(6, 'Xande de Pilares', 'xnd_123', '', 'xandinho@gmail.com', '', '', '$2b$10$n2rZluB0NbgOeqhVQdHNbuTaNZidTk3dRzwlRoEuDoiblu1Z84.re'),
(7, 'João Pedro Fagundes', 'jojoca_901', '', 'joao@gmail.com', '', '', '1234'),
(10, 'Kaio Jorge Souza', 'kaio_0123', 'uploads\\1705970062907.png', 'seila@gmail.com', '12345678900', '15988315997', '$2b$10$RGlJ6/etIaryAUgFjtZdo.8qhNgLbzCzHOSWAWL.VxGdj5zge3gsq'),
(23, 'Kaio Jorge Souza', 'kaio_0123', 'userPhotos\\1710954916572.jpg', 'seila@gmail.com', '12345678900', '15988315997', '$2b$10$.B72iV4jni.CuzkieMoEAedxxPRpuqDzXiGQKjWGMXE4nQ2UVmLYq'),
(24, 'Kaio Jorge Souza', 'kaio_0123', 'userPhotos\\1710954919094.jpg', 'seila@gmail.com', '12345678900', '15988315997', '$2b$10$lfQ.0HWO1c.1Wd4Z2OA5Vek/CMXM0j0AQ6GBxNBx3ffwRaXuoyWZ6'),
(25, 'Gustavo Zaia Rodrigues', 'zaia08', 'fotoUsuarios\\1711410665334.jpeg', 'gustavozaia7755@gmail.com', '12345678900', '15988315997', '$2b$10$goIrWKeCE/HHmCHR5nK6N.Ho0KZM/LEvXBgWZla6IMFzxopQf87ai'),
(26, 'Alexia Putellas', 'put_01', 'fotoUsuarios\\1712197717494.webp', 'alexia@gmail.com', '', '(15) 98831-5', '$2b$10$gOmsIE8fKdaGk3I/P4b5JO2pv9/FpbNu2dyqD3iLgWtDDHQNyqKCy'),
(27, 'awdawd', 'awdawd', NULL, 'dwd@adwa', '', '(12) 31231-2', '$2b$10$Vv6AeF220Y7FlxQrdO407.0NP4KBcls1ePXVpzTj0GKyg9pfC39TK'),
(28, 'yumnty', 'agj', NULL, 'awd@Dasdg', '', '(12) 31321-2', '$2b$10$pvH2Az1yQEDg8WmAnOViUuOQGCQOlUdbWdoFZh7F/66EMmnlJ0zq2'),
(29, 'kjyukyuk', 'tyhth', NULL, 'awdwad@dasg', '', '(12) 31231-2312', '$2b$10$m4xk1Ta84tWX0vNmQHzLv.0c8BnKqBARlqrtKNdVTa01bCd7iWmIq'),
(30, 'yukyuk', 'jdghrh', NULL, 'thrtgh@adwadw', '', '(12) 31231-2312', '$2b$10$l6if4i.88mb03PAmRsekY.TMltQnxaO54xbzw2PjzjueeRFB9AToy'),
(31, 'awdawd', 'awfwf1', NULL, 'xandinho@gmail.comm', '', '(23) 12312-3123', '$2b$10$IHRJEY8gKRlvSNpN2xOD8.WD3VS0zLM1LD3fBzNn18Z8fYQ9gQF0m'),
(32, 'awdawd', 'wdawd', NULL, 'dfwaf@dawd', '', '(12) 31231-2312', '$2b$10$A431TD3mmcWJiV8gM.ZRTeq6cyAqr0N5j9HMCr0odxSBiRGt8gC2W'),
(33, 'Kid Bengala', 'kid', 'fotoUsuarios\\1712710869759.webp', 'kid@gmail.com', '', '(15) 98831-5997', '$2b$10$DRacg3oG204Ig/DWiZtZmeQnn011XzN2iVSEHtyh7MnzGSZ8MAeb.');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `campeonato`
--
ALTER TABLE `campeonato`
  ADD PRIMARY KEY (`id_campeonato`);

--
-- Índices para tabela `live_on`
--
ALTER TABLE `live_on`
  ADD PRIMARY KEY (`id_liveon`);

--
-- Índices para tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id_pagamento`),
  ADD KEY `fk_id_campeonato` (`fk_id_campeonato`),
  ADD KEY `fk_id_time` (`fk_id_time`);

--
-- Índices para tabela `solicitacao_time_usuario`
--
ALTER TABLE `solicitacao_time_usuario`
  ADD PRIMARY KEY (`id_solicitacao`),
  ADD KEY `fk_id_time` (`fk_id_time`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- Índices para tabela `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id_time`),
  ADD KEY `fk_id_capitao` (`fk_id_capitao`);

--
-- Índices para tabela `time_campeonato`
--
ALTER TABLE `time_campeonato`
  ADD PRIMARY KEY (`id_time_campeonato`),
  ADD KEY `fk_id_campeonato` (`fk_id_campeonato`),
  ADD KEY `fk_id_time` (`fk_id_time`);

--
-- Índices para tabela `time_usuario`
--
ALTER TABLE `time_usuario`
  ADD PRIMARY KEY (`id_time_usuario`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`),
  ADD KEY `fk_id_time` (`fk_id_time`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `campeonato`
--
ALTER TABLE `campeonato`
  MODIFY `id_campeonato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `live_on`
--
ALTER TABLE `live_on`
  MODIFY `id_liveon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `id_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `solicitacao_time_usuario`
--
ALTER TABLE `solicitacao_time_usuario`
  MODIFY `id_solicitacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `time`
--
ALTER TABLE `time`
  MODIFY `id_time` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `time_campeonato`
--
ALTER TABLE `time_campeonato`
  MODIFY `id_time_campeonato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1911;

--
-- AUTO_INCREMENT de tabela `time_usuario`
--
ALTER TABLE `time_usuario`
  MODIFY `id_time_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`fk_id_campeonato`) REFERENCES `campeonato` (`id_campeonato`),
  ADD CONSTRAINT `pagamentos_ibfk_2` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`);

--
-- Limitadores para a tabela `solicitacao_time_usuario`
--
ALTER TABLE `solicitacao_time_usuario`
  ADD CONSTRAINT `solicitacao_time_usuario_ibfk_1` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`),
  ADD CONSTRAINT `solicitacao_time_usuario_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `time`
--
ALTER TABLE `time`
  ADD CONSTRAINT `fk_id_capitao` FOREIGN KEY (`fk_id_capitao`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `time_campeonato`
--
ALTER TABLE `time_campeonato`
  ADD CONSTRAINT `time_campeonato_ibfk_1` FOREIGN KEY (`fk_id_campeonato`) REFERENCES `campeonato` (`id_campeonato`),
  ADD CONSTRAINT `time_campeonato_ibfk_2` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`);

--
-- Limitadores para a tabela `time_usuario`
--
ALTER TABLE `time_usuario`
  ADD CONSTRAINT `fk_id_time` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`) ON DELETE CASCADE,
  ADD CONSTRAINT `time_usuario_ibfk_1` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
