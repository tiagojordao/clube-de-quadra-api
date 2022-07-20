const { db_open } = require("../database/initDB.js");

async function insertCourt(court) {
  try {
    var db = await db_open();
    try {
      const courtResult = await db.run(
        "INSERT INTO Quadra (descricao, id_endereco) VALUES (?,?)",
        [court.descricao, court.id_endereco]
      );
      return courtResult;
    } catch (e) {
      return {
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

async function getAllCourts() {
  try {
    var db = await db_open();
    try {
      const courts = await db.all("SELECT Quadra.id, Quadra.descricao, Endereco.CEP, Endereco.numero, Endereco.complemento, Endereco.UF, Endereco.logradouro, Endereco.bairro, Endereco.localidade, Endereco.latitude, Endereco.longitude FROM Quadra, Endereco WHERE Quadra.id_endereco=Endereco.id");
      return courts;
    } catch (e) {
      return {
        courts: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getCourt(court) {
  try {
    var db = await db_open();
    try {
      const courtResult = await db.get("SELECT Quadra.id, Quadra.descricao, Endereco.CEP, Endereco.numero, Endereco.complemento, Endereco.UF, Endereco.logradouro, Endereco.bairro, Endereco.localidade, Endereco.latitude, Endereco.longitude FROM Quadra, Endereco WHERE Quadra.id=? AND Quadra.id_endereco=Endereco.id", [court.id]);
      return courtResult;
    } catch (e) {
      return { error: e };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function deleteCourt(court) {
  try {
    var db = await db_open();
    try {
      const courtResult = await db.get("DELETE FROM Quadra WHERE id=?", [court.id]);
      if(courtResult)
        return courtResult;
      return {
        error: "Court not Found!"
      }
    } catch (e) {
      return { 
        court,
        error: e
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function updateCourt(court) {
  try {
    var db = await db_open();
    try {
      const oldCourt = await db.get("SELECT * FROM Quadra WHERE id=?", [
        court.id,
      ]);
      await db.run(
        "UPDATE Quadra SET descricao=?, id_endereco=? WHERE id=?",
        [
          court.descricao,
          court.id_endereco,
          court.id,
        ]
      );
      const newCourt = await db.get("SELECT * FROM Quadra WHERE id=?", [
        court.id,
      ]);
      return {
        oldCourt,
        newCourt,
      };
    } catch (e) {
      return DB_ERROR_OBJ(e);
    }
  } catch (e) {
    return { error: e };
  } finally {
    db.close();
  }
}

module.exports = {
  insertCourt,
  getAllCourts,
  getCourt,
  deleteCourt,
  updateCourt,
};
