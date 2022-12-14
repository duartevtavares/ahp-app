-- MySQL Script generated by MySQL Workbench
-- Fri Dec 30 18:29:34 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`decision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`decision` (
  `decision_id` INT NOT NULL AUTO_INCREMENT,
  `goal` TEXT NULL,
  PRIMARY KEY (`decision_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`criteria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`criteria` (
  `criterion_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`criterion_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`alternatives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`alternatives` (
  `alternative_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`alternative_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`participants` (
  `participant_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`participant_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`decision_criteria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`decision_criteria` (
  `decision_id` INT NOT NULL,
  `criteria_id` INT NOT NULL,
  `criterion_value` INT NULL,
  PRIMARY KEY (`decision_id`, `criteria_id`),
  INDEX `fk_decision_has_criteria_criteria1_idx` (`criteria_id` ASC) VISIBLE,
  INDEX `fk_decision_has_criteria_decision_idx` (`decision_id` ASC) VISIBLE,
  CONSTRAINT `fk_decision_has_criteria_decision`
    FOREIGN KEY (`decision_id`)
    REFERENCES `mydb`.`decision` (`decision_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_decision_has_criteria_criteria1`
    FOREIGN KEY (`criteria_id`)
    REFERENCES `mydb`.`criteria` (`criterion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`decision_alternatives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`decision_alternatives` (
  `decision_id` INT NOT NULL,
  `alternatives_id` INT NOT NULL,
  `alternative_value` INT NULL,
  PRIMARY KEY (`decision_id`, `alternatives_id`),
  INDEX `fk_decision_has_alternatives_alternatives1_idx` (`alternatives_id` ASC) VISIBLE,
  INDEX `fk_decision_has_alternatives_decision1_idx` (`decision_id` ASC) VISIBLE,
  CONSTRAINT `fk_decision_has_alternatives_decision1`
    FOREIGN KEY (`decision_id`)
    REFERENCES `mydb`.`decision` (`decision_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_decision_has_alternatives_alternatives1`
    FOREIGN KEY (`alternatives_id`)
    REFERENCES `mydb`.`alternatives` (`alternative_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`decision_participant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`decision_participant` (
  `decision_id` INT NOT NULL,
  `participants_id` INT NOT NULL,
  `decision_participant` INT NULL,
  `done` BIT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`decision_id`, `participants_id`),
  INDEX `fk_decision_has_participants_participants1_idx` (`participants_id` ASC) VISIBLE,
  INDEX `fk_decision_has_participants_decision1_idx` (`decision_id` ASC) VISIBLE,
  CONSTRAINT `fk_decision_has_participants_decision1`
    FOREIGN KEY (`decision_id`)
    REFERENCES `mydb`.`decision` (`decision_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_decision_has_participants_participants1`
    FOREIGN KEY (`participants_id`)
    REFERENCES `mydb`.`participants` (`participant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`parwise_criteria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`parwise_criteria` (
  `id_parwise_criteria` INT NOT NULL,
  `decision_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `criteria1_id` INT NOT NULL,
  `criteria2_id` INT NOT NULL,
  `value` INT NULL,
  INDEX `criteria_id_idx` (`criteria1_id` ASC) VISIBLE,
  INDEX `criteria2_id_idx` (`criteria2_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`id_parwise_criteria`),
  CONSTRAINT `decision_id`
    FOREIGN KEY (`decision_id`)
    REFERENCES `mydb`.`decision` (`decision_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `criteria1_id`
    FOREIGN KEY (`criteria1_id`)
    REFERENCES `mydb`.`criteria` (`criterion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `criteria2_id`
    FOREIGN KEY (`criteria2_id`)
    REFERENCES `mydb`.`criteria` (`criterion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pairwise_alternatives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pairwise_alternatives` (
  `id_pairwise_alternatives` INT NOT NULL,
  `decision_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `criteria_id` INT NOT NULL,
  `alternative1_id` INT NOT NULL,
  `alternative2_id` INT NOT NULL,
  `value` INT NULL,
  PRIMARY KEY (`id_pairwise_alternatives`),
  INDEX `decision_id_idx` (`decision_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `criteria_id_idx` (`criteria_id` ASC) VISIBLE,
  INDEX `alternative1_id_idx` (`alternative1_id` ASC) VISIBLE,
  INDEX `alternative2_id_idx` (`alternative2_id` ASC) VISIBLE,
  CONSTRAINT `decision_id`
    FOREIGN KEY (`decision_id`)
    REFERENCES `mydb`.`decision` (`decision_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `criteria_id`
    FOREIGN KEY (`criteria_id`)
    REFERENCES `mydb`.`criteria` (`criterion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `alternative1_id`
    FOREIGN KEY (`alternative1_id`)
    REFERENCES `mydb`.`alternatives` (`alternative_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `alternative2_id`
    FOREIGN KEY (`alternative2_id`)
    REFERENCES `mydb`.`alternatives` (`alternative_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
