-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23-Jan-2023 às 23:12
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `final_thesis`
--

CREATE SCHEMA IF NOT EXISTS `final_thesis` DEFAULT CHARACTER SET utf8 ;
USE `final_thesis` ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `alternatives`
--

CREATE TABLE `alternatives` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `alternatives_comparisons`
--

CREATE TABLE `alternatives_comparisons` (
  `id` int(11) NOT NULL,
  `decision_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `criterion_id` int(11) NOT NULL,
  `alternative_1_id` int(11) NOT NULL,
  `alternative_2_id` int(11) NOT NULL,
  `pairwise_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `alternatives_comparisons`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `criteria`
--

CREATE TABLE `criteria` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `criteria`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `category`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `criteria_comparisons`
--

CREATE TABLE `criteria_comparisons` (
  `id` int(11) NOT NULL,
  `decision_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `criterion_1_id` int(11) NOT NULL,
  `criterion_2_id` int(11) NOT NULL,
  `pairwise_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `criteria_comparisons`
--



-- --------------------------------------------------------

--
-- Estrutura da tabela `decision`
--

CREATE TABLE `decision` (
  `id` int(11) NOT NULL,
  `goal` text DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `done` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `decision`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `decision_alternatives`
--

CREATE TABLE `decision_alternatives` (
  `decision_id` int(11) NOT NULL,
  `alternative_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estrutura da tabela `decision_alternatives_criterion_values`
--

CREATE TABLE `decision_alternatives_criterion_values` (
  `id` int(11) NOT NULL,
  `decision_id` int(11) NOT NULL,
  `alternative_id` int(11) DEFAULT NULL,
  `criterion_id` int(11) NOT NULL,
  `alternative_criterion_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `decision_alternatives`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `decision_criteria`
--

CREATE TABLE `decision_criteria` (
  `decision_id` int(11) NOT NULL,
  `criterion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `decision_criteria`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `category_criteria`
--

CREATE TABLE `category_criteria` (
  `category_id` int(11) NOT NULL,
  `criterion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `category_criteria`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `decision_participant`
--

CREATE TABLE `decision_participant` (
  `id` int(11) NOT NULL,
  `decision_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `participant_weight` int(11) DEFAULT NULL,
  `done` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `decision_participant`
--



-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `users_final_results`
--

CREATE TABLE `users_final_results` (
  `decision_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `alternative_id` int(11) NOT NULL,
  `final_result` float(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users_final_results`
--


-- --------------------------------------------------------

--
-- Estrutura da tabela `decision_final_results`
--

CREATE TABLE `decision_final_results` (
  `decision_id` int(11) NOT NULL,
  `alternative_id` int(11) NOT NULL,
  `final_result` float(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `decision_final_results`
--

-- -----------------------------------------------------------------------------------------------------------

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `alternatives`
--
ALTER TABLE `alternatives`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `alternatives_comparisons`
--
ALTER TABLE `alternatives_comparisons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `decision_id` (`decision_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `criterion_id` (`criterion_id`),
  ADD KEY `alternative_1_id` (`alternative_1_id`),
  ADD KEY `alternative_2_id` (`alternative_2_id`);

--
-- Índices para tabela `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);


--
-- Índices para tabela `criteria`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `criteria_comparisons`
--
ALTER TABLE `criteria_comparisons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `decision_id` (`decision_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `criterion_1_id` (`criterion_1_id`),
  ADD KEY `criterion_2_id` (`criterion_2_id`);

--
-- Índices para tabela `decision`
--
ALTER TABLE `decision`
  ADD PRIMARY KEY (`id`);


--
-- Índices para tabela `decision_alternatives`
--
ALTER TABLE `decision_alternatives`
  ADD PRIMARY KEY (`alternative_id`, `decision_id`),
  ADD KEY `fk_decision_has_alternative_alternative1_idx` (`alternative_id`),
  ADD KEY `fk_decision_has_alternatives_decision1_idx` (`decision_id`);


--
-- Índices para tabela `decision_alternatives_criterion_values`
--
ALTER TABLE `decision_alternatives_criterion_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_decision_has_alternative_alternative1_idx` (`alternative_id`),
  ADD KEY `fk_decision_has_criterion_criterion1_idx` (`criterion_id`),
  ADD KEY `fk_decision_has_alternatives_decision1_idx` (`decision_id`);


--
-- Índices para tabela `decision_criteria`
--
ALTER TABLE `decision_criteria`
  ADD PRIMARY KEY (`decision_id`,`criterion_id`),
  ADD KEY `fk_decision_has_criterion_criterion1_idx` (`criterion_id`),
  ADD KEY `fk_decision_has_criteria_decision1_idx` (`decision_id`);


--
-- Índices para tabela `category_criteria`
--
ALTER TABLE `category_criteria`
  ADD PRIMARY KEY (`criterion_id`, `category_id`),
  ADD KEY `fk_decision_has_criterion_criterion2_idx` (`criterion_id`),
  ADD KEY `fk_decision_has_criterion_category1_idx` (`category_id`);


--
-- Índices para tabela `decision_participant`
--
ALTER TABLE `decision_participant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_decision_has_users_users1_idx` (`user_id`),
  ADD KEY `fk_decision_has_participants_decision1_idx` (`decision_id`);


--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


--
-- Índices para tabela `users_final_results`
--
ALTER TABLE `users_final_results`
ADD PRIMARY KEY (`decision_id`, `user_id`, `alternative_id`),
  ADD KEY `fk_decision_has_alternatives_decision5_idx` (`decision_id`),
  ADD KEY `fk_decision_has_users_users5_idx` (`user_id`),
  ADD KEY `fk_decision_has_alternative_alternative5_idx` (`alternative_id`);


--
-- Índices para tabela `decision_final_results`
--
ALTER TABLE `decision_final_results`
ADD PRIMARY KEY (`decision_id`, `alternative_id`),
  ADD KEY `fk_decision_has_alternatives_decision6_idx` (`decision_id`),
  ADD KEY `fk_decision_has_alternative_alternative6_idx` (`alternative_id`);



-- -------------------------------------------------------------------------------------------



--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alternatives`
--
ALTER TABLE `alternatives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `alternatives_comparisons`
--
ALTER TABLE `alternatives_comparisons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `criteria_comparisons`
--
ALTER TABLE `criteria_comparisons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `decision`
--
ALTER TABLE `decision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `decision_alternatives_criterion_values`
--
ALTER TABLE `decision_alternatives_criterion_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `decision_participant`
--
ALTER TABLE `decision_participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restrições para despejos de tabelas
--


-- -----------------------------------------------------------------------------------


--
-- Limitadores para a tabela `alternatives_comparisons`
--
ALTER TABLE `alternatives_comparisons`
  ADD CONSTRAINT `alternatives_comparisons_ibfk_1` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`),
  ADD CONSTRAINT `alternatives_comparisons_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `alternatives_comparisons_ibfk_3` FOREIGN KEY (`criterion_id`) REFERENCES `criteria` (`id`),
  ADD CONSTRAINT `alternatives_comparisons_ibfk_4` FOREIGN KEY (`alternative_1_id`) REFERENCES `alternatives` (`id`),
  ADD CONSTRAINT `alternatives_comparisons_ibfk_5` FOREIGN KEY (`alternative_2_id`) REFERENCES `alternatives` (`id`);

--
-- Limitadores para a tabela `criteria_comparisons`
--
ALTER TABLE `criteria_comparisons`
  ADD CONSTRAINT `criteria_comparisons_ibfk_1` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`),
  ADD CONSTRAINT `criteria_comparisons_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `criteria_comparisons_ibfk_3` FOREIGN KEY (`criterion_1_id`) REFERENCES `criteria` (`id`),
  ADD CONSTRAINT `criteria_comparisons_ibfk_4` FOREIGN KEY (`criterion_2_id`) REFERENCES `criteria` (`id`);

--
-- Limitadores para a tabela `decision_alternatives`
--

ALTER TABLE `decision_alternatives`
  ADD CONSTRAINT `fk_decision_has_alternative_alternative` FOREIGN KEY (`alternative_id`) REFERENCES `alternatives` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_alternatives_decision1` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `decision_alternatives_criterion_values`
--

ALTER TABLE `decision_alternatives_criterion_values`
  ADD CONSTRAINT `fk_decision_has_criterion_criterion1` FOREIGN KEY (`criterion_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_alternative_alternative1` FOREIGN KEY (`alternative_id`) REFERENCES `alternatives` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_alternatives_decision` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `decision_criteria`
--
ALTER TABLE `decision_criteria`
  ADD CONSTRAINT `fk_decision_has_criterion_criterion` FOREIGN KEY (`criterion_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_criterion_decision1` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Limitadores para a tabela `category_criteria`
--
ALTER TABLE `category_criteria`
  ADD CONSTRAINT `fk_decision_has_criterion_criterion2` FOREIGN KEY (`criterion_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_criterion_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Limitadores para a tabela `decision_participant`
--
ALTER TABLE `decision_participant`
  ADD CONSTRAINT `fk_decision_has_participants_decision1` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_users_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Limitadores para a tabela `users_final_results`
--
ALTER TABLE `users_final_results`
  ADD CONSTRAINT `fk_decision_has_participants_decision5` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_users_users5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_alternative_alternative5` FOREIGN KEY (`alternative_id`) REFERENCES `alternatives` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Limitadores para a tabela `decision_final_results`
--
ALTER TABLE `decision_final_results`
  ADD CONSTRAINT `fk_decision_has_participants_decision6` FOREIGN KEY (`decision_id`) REFERENCES `decision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_decision_has_alternative_alternative5` FOREIGN KEY (`alternative_id`) REFERENCES `alternatives` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
  




COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
