const { db_open } = require("../database/initDB");

function createTablePessoa() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Pessoa` (" +
        " `CPF` CHAR(11) NOT NULL," +
        " `nome` VARCHAR(45) NULL," +
        " `dataNasc` DATE NULL," +
        " `genero` CHAR(1) NULL," +
        " `altura` INT(3) NULL," +
        " `peso` DECIMAL(3,2) NULL," +
        " `email` VARCHAR(45) NULL," +
        " `senha` VARCHAR(12) NULL," +
        " `ladoDominante` CHAR(1) NULL," +
        "PRIMARY KEY (`CPF`))"
    );
  });
}

function createTableEndereco() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Endereco` (" +
        " `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        " `CEP` VARCHAR(8) NULL," +
        " `numero` VARCHAR(9) NULL," +
        " `complemento` VARCHAR(45) NULL," +
        " `UF` CHAR(2) NULL," +
        " `logradouro` VARCHAR(45) NULL," +
        " `bairro` VARCHAR(45) NULL," +
        " `localidade` VARCHAR(45) NULL," +
        " `latitude` DECIMAL(4,4) NULL," +
        " `longitude` DECIMAL(4,4) NULL)"
    );
  });
}

function createTableQuadra() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Quadra` (" +
        " `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        " `descricao` VARCHAR(280) NULL," +
        " `id_endereco` INT NOT NULL," +
        " CONSTRAINT `fk_Quadra_Endereco1`" +
        "   FOREIGN KEY (`id_endereco`)" +
        "   REFERENCES `Endreco` (`id`)" +
        "   ON DELETE CASCADE" +
        "   ON UPDATE NO ACTION)"
    );
  });
}

function createTableModalidade() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Modalidade` (" +
        " `id` INTEGER NOT NULL," +
        " `nome` VARCHAR(32) NOT NULL," +
        " `descricao` VARCHAR(280) NULL," +
        " `qtdJogadores` INT NULL," +
        " PRIMARY KEY (`id`))"
    );
  });
}

function createTableHorario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Horario` (" +
        " `id` INTEGER PRIMARY KEY NOT NULL," +
        " `dataHoraInicio` VARCHAR(19) NULL," + //"YYYY-MM-DD HH:MM:SS"
        " `dataHoraFim` VARCHAR(19) NULL)" //"YYYY-MM-DD HH:MM:SS"
    );
  });
}

function createTablePartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Partida` (" +
        " `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        " `id_horario` INT NOT NULL," +
        " `id_quadra` INT NOT NULL," +
        " `id_modalidade` INT NOT NULL," +
        "CONSTRAINT `fk_Partida_Horario1`" +
        "    FOREIGN KEY (`id_horario`)" +
        "    REFERENCES `Horario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Partida_Quadra1`" +
        "    FOREIGN KEY (`id_quadra`)" +
        "    REFERENCES `Quadra` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Partida_Modalidade1`" +
        "    FOREIGN KEY (`id_modalidade`)" +
        "    REFERENCES `Modalidade` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

function createTableInteresse() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Interesse` (" +
        " `CPF_pessoa` CHAR(11) NOT NULL," +
        " `id_horario` INT NOT NULL," +
        " `id_modalidade` INT NOT NULL," +
        " PRIMARY KEY (`CPF_pessoa`, `id_horario`, `id_modalidade`)," +
        " CONSTRAINT `fk_Interesse_Horario1`" +
        "   FOREIGN KEY (`id_horario`)" +
        "   REFERENCES `Horario` (`id`)" +
        "   ON DELETE NO ACTION" +
        "   ON UPDATE NO ACTION," +
        " CONSTRAINT `fk_Interesse_Modalidade1`" +
        "   FOREIGN KEY (`id_modalidade`)" +
        "   REFERENCES `Modalidade` (`id`)" +
        "   ON DELETE NO ACTION" +
        "   ON UPDATE NO ACTION," +
        " CONSTRAINT `fk_Interesse_Pessoa1`" +
        "   FOREIGN KEY (`CPF_pessoa`)" +
        "   REFERENCES `Pessoa` (`CPF`)" +
        "   ON DELETE NO ACTION" +
        "   ON UPDATE NO ACTION)"
    );
  });
}

function createTableQuadraModalidade() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `QuadraModalidade` (" +
        " `id_quadra` INT NOT NULL," +
        " `id_modalidade` INT NOT NULL," +
        "PRIMARY KEY (`id_quadra`, `id_modalidade`)," +
        "CONSTRAINT `fk_QuadraModalidade_Quadra1`" +
        "    FOREIGN KEY (`id_quadra`)" +
        "    REFERENCES `Quadra` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_QuadraModalidade_Modalidade1`" +
        "    FOREIGN KEY (`id_modalidade`)" +
        "    REFERENCES `Modalidade` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

function createTablePessoaPartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `PessoaPartida` (" +
        " `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        " `CPF_pessoa` CHAR(11) NOT NULL," +
        " `id_partida` INT NOT NULL," +
        "CONSTRAINT `fk_PessoaPartida_Pessoa1`" +
        "    FOREIGN KEY (`CPF_pessoa`)" +
        "    REFERENCES `Pessoa` (`CPF`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_PessoaPartida_Partida1`" +
        "    FOREIGN KEY (`id_partida`)" +
        "    REFERENCES `Partida` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

function createTableComentario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Comentario` (" +
        " `id` INT NOT NULL," +
        " `mensagem` VARCHAR(280) NULL," +
        "PRIMARY KEY (`id`))"
    );
  });
}

function createTableComentarioPartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `ComentarioPartida` (" +
        "  `cpf_pessoa` CHAR(11) NOT NULL," +
        "  `id_comentario` INT NOT NULL," +
        "  `id_partida` INT NOT NULL," +
        "  PRIMARY KEY (`cpf_pessoa`, `id_comentario`)," +
        "  CONSTRAINT `fk_ComentarioPartida_Comentario1`" +
        "    FOREIGN KEY (`id_comentario`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "  CONSTRAINT `fk_ComentarioPartida_Partida1`" +
        "    FOREIGN KEY (`id_partida`)" +
        "    REFERENCES `Partida` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "  CONSTRAINT `fk_ComentarioPartida_Pessoa1`" +
        "    FOREIGN KEY (`cpf_pessoa`)" +
        "    REFERENCES `Pessoa` (`CPF`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

function createTableComentarioComentario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `ComentarioComentario` (" +
        " `id_comentario` INT NOT NULL," +
        " `id_comentario_reply` INT NOT NULL," +
        "PRIMARY KEY (`id_comentario`, `id_comentario_reply`)," +
        "CONSTRAINT `fk_Comentario_has_Comentario_Comentario1`" +
        "    FOREIGN KEY (`id_comentario`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Comentario_has_Comentario_Comentario2`" +
        "    FOREIGN KEY (`id_comentario_reply`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

function selectTables(req, res) {
  console.log("Listing tables...");
  db_open()
    .then((db) => {
      db.all("SELECT * FROM Comentario");
    })
    .then((tables) => res.json(tables));
  console.log(" done.");
}

function createTables() {
  createTablePessoa();
  createTableHorario();
  createTableEndereco();
  createTableQuadra();
  createTableModalidade();
  createTablePartida();
  createTablePessoaPartida();
  createTableInteresse();
  createTableQuadraModalidade();
  createTableComentario();
  createTableComentarioPartida();
  createTableComentarioComentario();

  console.log("Database tables was successfully created.");
}

module.exports = {
  createTables
}