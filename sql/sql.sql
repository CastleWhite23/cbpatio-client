-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/04/2024 às 03:19
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

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
-- Estrutura para tabela `campeonato`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `campeonato`
--

INSERT INTO `campeonato` (`id_campeonato`, `nome`, `foto`, `data`, `sinopse`, `modalidade`, `valor_entrada`, `premiacao`, `jogadores`, `limite`) VALUES
(1, 'BoxFight 2v2 Fortnite', 'fotoCampeonatos\\1707533286367.jpeg', '2024-07-10 16:00:00', 'sei la oq nao sei o que la', 'BoxFight', 10, 1500, 2, 16),
(2, 'Fall guys (The ultimate batlle)', 'fotoCampeonatos\\1707533347499.jpg', '2023-06-11 16:00:00', 'vtnc pedro CB', 'Battle royale', 1.5, 200, 1, 40),
(45, 'COD Warzone', 'fotoCampeonatos\\1710966123452.jpg', '2024-03-28 17:21:00', 'wow cod warzone quye legal', 'Tiro', 15, 150, 2, 16);

-- --------------------------------------------------------

--
-- Estrutura para tabela `live_on`
--

CREATE TABLE `live_on` (
  `id_liveon` int(11) NOT NULL,
  `live_on` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `live_on`
--

INSERT INTO `live_on` (`id_liveon`, `live_on`) VALUES
(1, 's');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id_pagamento` int(11) NOT NULL,
  `fk_id_time` int(11) NOT NULL,
  `fk_id_campeonato` int(11) NOT NULL,
  `valor_pagamento` float NOT NULL,
  `hora_pagamento` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pagamentos`
--

INSERT INTO `pagamentos` (`id_pagamento`, `fk_id_time`, `fk_id_campeonato`, `valor_pagamento`, `hora_pagamento`) VALUES
(3, 18, 1, 10, '2024-03-06 12:41:32'),
(4, 10, 1, 10, '2024-03-06 12:41:32'),
(5, 22, 1, 10, '2024-03-06 12:41:32'),
(6, 11, 1, 10, '2024-03-06 12:41:32'),
(7, 19, 1, 10, '2024-03-06 12:41:32'),
(8, 20, 1, 10, '2024-03-06 12:41:32'),
(9, 14, 1, 10, '2024-03-06 12:41:32'),
(10, 16, 1, 10, '2024-03-06 12:41:32'),
(11, 9, 1, 10, '2024-03-06 12:41:32'),
(12, 17, 1, 10, '2024-03-06 12:41:32'),
(13, 25, 1, 10, '2024-03-06 12:41:32'),
(14, 12, 1, 10, '2024-03-06 12:41:32'),
(15, 13, 1, 10, '2024-03-06 12:41:32'),
(16, 24, 1, 10, '2024-03-06 12:41:32'),
(17, 21, 1, 10, '2024-03-06 12:41:32'),
(18, 15, 1, 10, '2024-03-06 12:41:32');

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
-- Estrutura para tabela `solicitacao_time_usuario`
--

CREATE TABLE `solicitacao_time_usuario` (
  `id_solicitacao` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_time` int(11) NOT NULL,
  `aceitou` varchar(1) NOT NULL,
  `hora_envio` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `solicitacao_time_usuario`
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
-- Estrutura para tabela `time`
--

CREATE TABLE `time` (
  `id_time` int(11) NOT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `fk_id_capitao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `time`
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
(34, 'awdawdadw', 25);

--
-- Acionadores `time`
--
DELIMITER $$
CREATE TRIGGER `tgr_time_user` AFTER INSERT ON `time` FOR EACH ROW INSERT INTO time_usuario(fk_id_usuario, fk_id_time) VALUES(NEW.fk_id_capitao, NEW.id_time)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `time_campeonato`
--

CREATE TABLE `time_campeonato` (
  `id_time_campeonato` int(11) NOT NULL,
  `fk_id_time` int(11) DEFAULT NULL,
  `fk_id_campeonato` int(11) DEFAULT NULL,
  `fase` varchar(20) NOT NULL,
  `jogo` varchar(10) NOT NULL,
  `chave` varchar(20) NOT NULL,
  `data_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `time_campeonato`
--

INSERT INTO `time_campeonato` (`id_time_campeonato`, `fk_id_time`, `fk_id_campeonato`, `fase`, `jogo`, `chave`, `data_hora`) VALUES
(1390, 10, 1, 'oitavas', '1', 'esquerda', '2024-03-18 09:45:00'),
(1391, 22, 1, 'oitavas', '1', 'direita', '2024-03-19 12:35:00'),
(1392, 11, 1, 'oitavas', '1', 'esquerda', '2024-03-18 09:45:00'),
(1394, 20, 1, 'oitavas', '1', 'direita', '2024-03-19 12:35:00'),
(1395, 14, 1, 'oitavas', '2', 'esquerda', '2024-03-18 12:35:00'),
(1397, 9, 1, 'oitavas', '2', 'direita', '2024-03-19 12:50:00'),
(1399, 25, 1, 'oitavas', '2', 'esquerda', '2024-03-18 12:35:00'),
(1400, 12, 1, 'oitavas', '2', 'direita', '2024-03-19 12:50:00'),
(1401, 13, 1, 'oitavas', '3', 'esquerda', '2024-03-18 12:50:00'),
(1402, 24, 1, 'oitavas', '3', 'direita', '2024-03-20 09:45:00'),
(1403, 21, 1, 'oitavas', '3', 'esquerda', '2024-03-18 12:50:00'),
(1404, 15, 1, 'oitavas', '3', 'direita', '2024-03-20 09:45:00'),
(1405, 18, 1, 'oitavas', '4', 'esquerda', '2024-03-19 09:45:00'),
(1407, 19, 1, 'oitavas', '4', 'direita', '2024-03-20 12:35:00'),
(1408, 16, 1, 'oitavas', '4', 'esquerda', '2024-03-19 09:45:00'),
(1409, 17, 1, 'oitavas', '4', 'direita', '2024-03-20 12:35:00'),
(1780, 10, 1, 'quartas', '1', 'esquerda', '2024-03-21 09:45:00'),
(1781, 14, 1, 'quartas', '1', 'esquerda', '2024-03-21 09:45:00'),
(1782, 13, 1, 'quartas', '2', 'esquerda', '2024-03-21 12:35:00'),
(1783, 16, 1, 'quartas', '2', 'esquerda', '2024-03-21 12:35:00'),
(1784, 22, 1, 'quartas', '1', 'direita', '2024-03-21 12:50:00'),
(1785, 9, 1, 'quartas', '1', 'direita', '2024-03-21 12:50:00'),
(1786, 24, 1, 'quartas', '2', 'direita', '2024-03-22 09:45:00'),
(1787, 17, 1, 'quartas', '2', 'direita', '2024-03-22 09:45:00'),
(1788, 20, 1, 'eliminado oitavas', '', '', NULL),
(1789, 11, 1, 'eliminado oitavas', '', '', NULL),
(1790, 12, 1, 'eliminado oitavas', '', '', NULL),
(1791, 25, 1, 'eliminado oitavas', '', '', NULL),
(1792, 15, 1, 'eliminado oitavas', '', '', NULL),
(1793, 21, 1, 'eliminado oitavas', '', '', NULL),
(1794, 19, 1, 'eliminado oitavas', '', '', NULL),
(1795, 18, 1, 'eliminado oitavas', '', '', NULL),
(1804, 14, 1, 'semis', '1', 'esquerda', '2024-03-25 09:45:00'),
(1805, 13, 1, 'semis', '1', 'esquerda', '2024-03-25 09:45:00'),
(1806, 24, 1, 'semis', '1', 'direita', '2024-03-25 12:35:00'),
(1807, 22, 1, 'semis', '1', 'direita', '2024-03-25 12:35:00'),
(1808, 9, 1, 'eliminado quartas', '', '', NULL),
(1809, 10, 1, 'eliminado quartas', '', '', NULL),
(1810, 17, 1, 'eliminado quartas', '', '', NULL),
(1811, 16, 1, 'eliminado quartas', '', '', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `time_usuario`
--

CREATE TABLE `time_usuario` (
  `id_time_usuario` int(11) NOT NULL,
  `fk_id_usuario` int(11) DEFAULT NULL,
  `fk_id_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `time_usuario`
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
(42, 25, 34);

--
-- Acionadores `time_usuario`
--
DELIMITER $$
CREATE TRIGGER `tgr_tira_convite` BEFORE DELETE ON `time_usuario` FOR EACH ROW DELETE FROM solicitacao_time_usuario WHERE fk_id_usuario = OLD.fk_id_usuario AND fk_id_time = OLD.fk_id_time
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
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
-- Índices de tabela `campeonato`
--
ALTER TABLE `campeonato`
  ADD PRIMARY KEY (`id_campeonato`);

--
-- Índices de tabela `live_on`
--
ALTER TABLE `live_on`
  ADD PRIMARY KEY (`id_liveon`);

--
-- Índices de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id_pagamento`),
  ADD KEY `fk_id_campeonato` (`fk_id_campeonato`),
  ADD KEY `fk_id_time` (`fk_id_time`);

--
-- Índices de tabela `solicitacao_time_usuario`
--
ALTER TABLE `solicitacao_time_usuario`
  ADD PRIMARY KEY (`id_solicitacao`),
  ADD KEY `fk_id_time` (`fk_id_time`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- Índices de tabela `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id_time`),
  ADD KEY `fk_id_capitao` (`fk_id_capitao`);

--
-- Índices de tabela `time_campeonato`
--
ALTER TABLE `time_campeonato`
  ADD PRIMARY KEY (`id_time_campeonato`),
  ADD KEY `fk_id_campeonato` (`fk_id_campeonato`),
  ADD KEY `fk_id_time` (`fk_id_time`);

--
-- Índices de tabela `time_usuario`
--
ALTER TABLE `time_usuario`
  ADD PRIMARY KEY (`id_time_usuario`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`),
  ADD KEY `fk_id_time` (`fk_id_time`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
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
  MODIFY `id_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `solicitacao_time_usuario`
--
ALTER TABLE `solicitacao_time_usuario`
  MODIFY `id_solicitacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `time`
--
ALTER TABLE `time`
  MODIFY `id_time` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `time_campeonato`
--
ALTER TABLE `time_campeonato`
  MODIFY `id_time_campeonato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1817;

--
-- AUTO_INCREMENT de tabela `time_usuario`
--
ALTER TABLE `time_usuario`
  MODIFY `id_time_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`fk_id_campeonato`) REFERENCES `campeonato` (`id_campeonato`),
  ADD CONSTRAINT `pagamentos_ibfk_2` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`);

--
-- Restrições para tabelas `solicitacao_time_usuario`
--
ALTER TABLE `solicitacao_time_usuario`
  ADD CONSTRAINT `solicitacao_time_usuario_ibfk_1` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`),
  ADD CONSTRAINT `solicitacao_time_usuario_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `time`
--
ALTER TABLE `time`
  ADD CONSTRAINT `fk_id_capitao` FOREIGN KEY (`fk_id_capitao`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `time_campeonato`
--
ALTER TABLE `time_campeonato`
  ADD CONSTRAINT `time_campeonato_ibfk_1` FOREIGN KEY (`fk_id_campeonato`) REFERENCES `campeonato` (`id_campeonato`),
  ADD CONSTRAINT `time_campeonato_ibfk_2` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`);

--
-- Restrições para tabelas `time_usuario`
--
ALTER TABLE `time_usuario`
  ADD CONSTRAINT `fk_id_time` FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`) ON DELETE CASCADE,
  ADD CONSTRAINT `time_usuario_ibfk_1` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
