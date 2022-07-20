const { db_open } = require("../database/initDB.js");

const DB_ERROR_OBJ = (e) => {
  return {
    statusCode: 500,
    pessoa: {},
    error: e,
    message: "Could not connect to the database",
  };
};

async function insertPessoa(pessoa) {
  try {
    var db = await db_open();
    try {
      const pessoaResult = await db.run(
        "INSERT INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          pessoa.CPF,
          pessoa.nome,
          pessoa.dataNascimento,
          pessoa.genero,
          pessoa.altura,
          pessoa.peso,
          pessoa.email,
          pessoa.senha,
          pessoa.ladoDominante,
        ]
      );
      return {
        pessoa: pessoaResult,
      };
    } catch (e) {
      return {
        pessoa: pessoa,
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

async function selectPessoas() {
  try {
    var db = await db_open();

    try {
      const pessoas = await db.all("SELECT Pessoa.CPF, Pessoa.nome, Pessoa.dataNasc, Pessoa.genero FROM Pessoa");
      return pessoas;
    } catch (e) {
      return {
        pessoas: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function selectPessoa(CPF) {
  try {
    var db = await db_open();
    try {
      const pessoa = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [CPF]);
      return pessoa;
    } catch (e) {
      return {
        statusCode: 400,
        pessoa: {},
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      pessoa: {},
      message: "Could not connect to the database",
      error: e,
    };
  } finally {
    db.close();
  }
}

async function updatePessoa(pessoa) {
  try {
    var db = await db_open();
    try {
      const pessoaOld = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [
        pessoa.CPF,
      ]);

      await db.run(
        "UPDATE Pessoa SET nome=?, dataNasc=?, genero=?, altura=?, peso=?, email=?, senha=?, ladoDominante=?  WHERE CPF=?",
        [
          pessoa.nome,
          pessoa.dataNascimento,
          pessoa.genero,
          pessoa.altura,
          pessoa.peso,
          pessoa.email,
          pessoa.senha,
          pessoa.ladoDominante,
          pessoa.CPF,
        ]
      );

      const pessoaNew = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [
        pessoa.CPF,
      ]);

      return {
        statusCode: 200,
        pessoa_old: pessoaOld,
        pessoa_new: pessoaNew,
      };
    } catch (e) {
      return {
        statusCode: 400,
        pessoa: {},
        message: "Could not update the entry in database",
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  }
}

async function deletePessoa(CPF) {
  var db;
  try {
    db = await db_open();
    try {
      const pessoa = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [CPF]);
      await db.get("DELETE FROM Pessoa WHERE CPF=?", [CPF]);
    } catch (e) {
      return pessoa;
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

module.exports = {
  deletePessoa,
  updatePessoa,
  selectPessoa,
  selectPessoas,
  insertPessoa,
};
