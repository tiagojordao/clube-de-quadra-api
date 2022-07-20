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
-- Table `mydb`.`Pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pessoa` (
  `CPF` CHAR(11) NOT NULL,
  `nome` VARCHAR(45) NULL,
  `dataNasc` DATE NULL,
  `endereco` VARCHAR(45) NULL,
  `genero` CHAR(1) NULL,
  `Jogadorcol` VARCHAR(45) NULL,
  PRIMARY KEY (`CPF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Jogador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Jogador` (
  `altura` INT(3) NULL,
  `Pessoa_CPF` CHAR(11) NOT NULL,
  `peso` DECIMAL(3,2) NULL,
  `Jogadorcol` VARCHAR(45) NULL,
  PRIMARY KEY (`Pessoa_CPF`),
  CONSTRAINT `fk_Jogador_Pessoa`
    FOREIGN KEY (`Pessoa_CPF`)
    REFERENCES `mydb`.`Pessoa` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Quadra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Quadra` (
  `ID` INT NOT NULL,
  `descricao` VARCHAR(280) NULL,
  `endereco` VARCHAR(70) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Modalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Modalidade` (
  `ID` INT NOT NULL,
  `descricao` VARCHAR(280) NULL,
  `qtdJogadores` INT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Horario` (
  `ID` INT NOT NULL,
  `dataHoraInicio` DATETIME NULL,
  `dataHoraFim` DATETIME NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Partida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Partida` (
  `ID` INT NOT NULL,
  `Horario_ID` INT NOT NULL,
  `Quadra_ID` INT NOT NULL,
  `Modalidade_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_Partida_Horario1_idx` (`Horario_ID` ASC) VISIBLE,
  INDEX `fk_Partida_Quadra1_idx` (`Quadra_ID` ASC) VISIBLE,
  INDEX `fk_Partida_Modalidade1_idx` (`Modalidade_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Partida_Horario1`
    FOREIGN KEY (`Horario_ID`)
    REFERENCES `mydb`.`Horario` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Partida_Quadra1`
    FOREIGN KEY (`Quadra_ID`)
    REFERENCES `mydb`.`Quadra` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Partida_Modalidade1`
    FOREIGN KEY (`Modalidade_ID`)
    REFERENCES `mydb`.`Modalidade` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Interesse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Interesse` (
  `ID` INT NOT NULL,
  `Jogador_Pessoa_CPF` CHAR(11) NOT NULL,
  `Horario_ID` INT NOT NULL,
  `Modalidade_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `Jogador_Pessoa_CPF`, `Horario_ID`, `Modalidade_ID`),
  INDEX `fk_Interesse_Jogador1_idx` (`Jogador_Pessoa_CPF` ASC) VISIBLE,
  INDEX `fk_Interesse_Horario1_idx` (`Horario_ID` ASC) VISIBLE,
  INDEX `fk_Interesse_Modalidade1_idx` (`Modalidade_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Interesse_Jogador1`
    FOREIGN KEY (`Jogador_Pessoa_CPF`)
    REFERENCES `mydb`.`Jogador` (`Pessoa_CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Interesse_Horario1`
    FOREIGN KEY (`Horario_ID`)
    REFERENCES `mydb`.`Horario` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Interesse_Modalidade1`
    FOREIGN KEY (`Modalidade_ID`)
    REFERENCES `mydb`.`Modalidade` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Quadra_has_Modalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Quadra_has_Modalidade` (
  `Quadra_ID` INT NOT NULL,
  `Modalidade_ID` INT NOT NULL,
  PRIMARY KEY (`Quadra_ID`, `Modalidade_ID`),
  INDEX `fk_Quadra_has_Modalidade_Modalidade1_idx` (`Modalidade_ID` ASC) VISIBLE,
  INDEX `fk_Quadra_has_Modalidade_Quadra1_idx` (`Quadra_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Quadra_has_Modalidade_Quadra1`
    FOREIGN KEY (`Quadra_ID`)
    REFERENCES `mydb`.`Quadra` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quadra_has_Modalidade_Modalidade1`
    FOREIGN KEY (`Modalidade_ID`)
    REFERENCES `mydb`.`Modalidade` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comentario` (
  `id` INT NOT NULL,
  `mensagem` VARCHAR(280) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ComentarioPartida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ComentarioPartida` (
  `Comentario_id` INT NOT NULL,
  `Jogador_Pessoa_CPF` CHAR(11) NOT NULL,
  `Partida_ID` INT NOT NULL,
  PRIMARY KEY (`Comentario_id`, `Jogador_Pessoa_CPF`),
  INDEX `fk_ComentarioPartida_Jogador1_idx` (`Jogador_Pessoa_CPF` ASC) VISIBLE,
  INDEX `fk_ComentarioPartida_Partida1_idx` (`Partida_ID` ASC) VISIBLE,
  CONSTRAINT `fk_ComentarioPartida_Comentario1`
    FOREIGN KEY (`Comentario_id`)
    REFERENCES `mydb`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ComentarioPartida_Jogador1`
    FOREIGN KEY (`Jogador_Pessoa_CPF`)
    REFERENCES `mydb`.`Jogador` (`Pessoa_CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ComentarioPartida_Partida1`
    FOREIGN KEY (`Partida_ID`)
    REFERENCES `mydb`.`Partida` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comentario_has_Comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comentario_has_Comentario` (
  `Comentario_id` INT NOT NULL,
  `Comentario_id1` INT NOT NULL,
  PRIMARY KEY (`Comentario_id`, `Comentario_id1`),
  INDEX `fk_Comentario_has_Comentario_Comentario2_idx` (`Comentario_id1` ASC) VISIBLE,
  INDEX `fk_Comentario_has_Comentario_Comentario1_idx` (`Comentario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comentario_has_Comentario_Comentario1`
    FOREIGN KEY (`Comentario_id`)
    REFERENCES `mydb`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_has_Comentario_Comentario2`
    FOREIGN KEY (`Comentario_id1`)
    REFERENCES `mydb`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
