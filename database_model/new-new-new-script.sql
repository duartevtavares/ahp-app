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

CREATE TABLE Users (
     `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `username` VARCHAR(45) NULL,
    password TEXT NOT NULL,
);

CREATE TABLE Decisions (
     `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
    description TEXT,
    status TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES Users(id)
);

CREATE TABLE Criteria (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    criterion TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS `decision_criteria` (
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


CREATE TABLE Comparisons (
    id INTEGER PRIMARY KEY,
    decision_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    criterion_1_id INTEGER NOT NULL,
    criterion_2_id INTEGER NOT NULL,
    value INTEGER NOT NULL,
    FOREIGN KEY (decision_id) REFERENCES Decisions(id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (criterion_1_id) REFERENCES Criteria(id),
    FOREIGN KEY (criterion_2_id) REFERENCES Criteria(id)
);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
