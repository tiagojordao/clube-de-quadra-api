const { db_open } = require("../database/initDB.js");

const DB_ERROR_OBJ = (e) => {
  return {
    statusCode: 500,
    pessoa: {},
    error: e,
    message: "Could not connect to the database",
  };
};

async function insertPersonGame(personGame) {
  try {
    var db = await db_open();
    try {
      const personGameResult = await db.run(
        "INSERT INTO PessoaPartida (CPF_pessoa, id_partida) VALUES (?,?)",
        [personGame.pessoa_cpf, personGame.partida_id]
      );
      return personGameResult;
    } catch (e) {
      return {
        personGame: personGame,
        message: "Something went wrong, could not insert into database",
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function deletePersonGame(personGame) {
  try {
    var db = await db_open();
    try {
      const personGameResult = await db.get(
        "SELECT * FROM PessoaPartida WHERE CPF_pessoa=? AND id_partida=?",
        [personGame.pessoa_cpf, personGame.partida_id]
      );
      await db.get(
        "DELETE FROM PessoaPartida WHERE CPF_pessoa=? AND id_partida=?",
        [personGame.pessoa_cpf, personGame.partida_id]
      );
      return personGameResult;
    } catch (e) {
      return personGame;
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getAllPersonGame() {
  try {
    var db = await db_open();

    try {
      const personGameReturn = await db.all("SELECT * FROM PessoaPartida, Pessoa, Partida WHERE PessoaPartida.id_partida=Partida.id AND PessoaPartida.CPF_pessoa=Pessoa.CPF");
      return {personGame: personGameReturn};
    } catch (e) {
      return {
        personGame: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

module.exports = {
  insertPersonGame,
  deletePersonGame,
  getAllPersonGame
};
