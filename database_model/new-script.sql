-- MySQL Script generated by MySQL Workbench
-- Sun Dec  4 14:58:47 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema thesis
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema thesis
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `thesis` DEFAULT CHARACTER SET utf8 ;
USE `thesis` ;

-- -----------------------------------------------------
-- Table `thesis`.`decision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`decision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `goal` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`criteria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`criteria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`alternatives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`alternatives` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`participants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`decision_criteria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`decision_criteria` (
  `decision_id` INT NOT NULL,
  `criteria_id` INT NOT NULL,
  `criterion_value` INT NULL,
  PRIMARY KEY (`decision_id`, `criteria_id`),
  INDEX `fk_decision_has_criteria_criteria1_idx` (`criteria_id` ASC),
  INDEX `fk_decision_has_criteria_decision_idx` (`decision_id` ASC),
  CONSTRAINT `fk_decision_has_criteria_decision`
    FOREIGN KEY (`decision_id`)
    REFERENCES `thesis`.`decision` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_decision_has_criteria_criteria1`
    FOREIGN KEY (`criteria_id`)
    REFERENCES `thesis`.`criteria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`decision_alternatives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`decision_alternatives` (
  `decision_id` INT NOT NULL,
  `alternatives_id` INT NOT NULL,
  `alternative_value` INT NULL,
  PRIMARY KEY (`decision_id`, `alternatives_id`),
  INDEX `fk_decision_has_alternatives_alternatives1_idx` (`alternatives_id` ASC),
  INDEX `fk_decision_has_alternatives_decision1_idx` (`decision_id` ASC),
  CONSTRAINT `fk_decision_has_alternatives_decision1`
    FOREIGN KEY (`decision_id`)
    REFERENCES `thesis`.`decision` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_decision_has_alternatives_alternatives1`
    FOREIGN KEY (`alternatives_id`)
    REFERENCES `thesis`.`alternatives` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`decision_participant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`decision_participant` (
  `decision_id` INT NOT NULL,
  `participants_id` INT NOT NULL,
  `decision_participant` INT NULL,
  PRIMARY KEY (`decision_id`, `participants_id`),
  INDEX `fk_decision_has_participants_participants1_idx` (`participants_id` ASC),
  INDEX `fk_decision_has_participants_decision1_idx` (`decision_id` ASC),
  CONSTRAINT `fk_decision_has_participants_decision1`
    FOREIGN KEY (`decision_id`)
    REFERENCES `thesis`.`decision` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_decision_has_participants_participants1`
    FOREIGN KEY (`participants_id`)
    REFERENCES `thesis`.`participants` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `thesis`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
