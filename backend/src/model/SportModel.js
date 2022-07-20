const { db_open } = require("../database/initDB.js");

async function insertSport(sport) {
  try {
    var db = await db_open();
    try {
      const sportResult = await db.run(
        "INSERT INTO Modalidade (nome, descricao, qtdJogadores) VALUES (?,?,?)",
        [sport.nome, sport.descricao, sport.qtdJogadores]
      );
      return sportResult;
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

async function getSport(id) {
  try {
    var db = await db_open();

    try {
      const sport = await db.get("SELECT * FROM Modalidade WHERE id=?", [id]);
      return sport;
    } catch (e) {
      return {
        sport: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getAllSports() {
  try {
    var db = await db_open();

    try {
      const sports = await db.all("SELECT * FROM Modalidade");
      return sports;
    } catch (e) {
      return {
        sports: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function deleteSport(id) {
  try {
    var db = await db_open();
    try {
      const sport = await db.get("SELECT * FROM Modalidade WHERE id=?", [id]);
      await db.get("DELETE FROM Modalidade WHERE id=?", [id]);
    } catch (e) {
      console.log(sport);
      return sport;
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function updateSport(sport) {
  try {
    var db = await db_open();
    try {
      const sportOld = await db.get("SELECT * FROM Modalidade WHERE id=?", [
        sport.id,
      ]);
      await db.run(
        "UPDATE Modalidade SET nome=?, descricao=?, qtdJogadores=? WHERE id=?",
        [sport.nome, sport.descricao, sport.qtdJogadores, sport.id]
      );

      const sportNew = await db.get("SELECT * FROM Modalidade WHERE id=?", [
        sport.id,
      ]);

      return {
        pessoa_old: sportOld,
        pessoa_new: sportNew,
      };
    } catch (e) {
      return {
        statusCode: 400,
        sport: {},
        message: "Could not update the entry in database",
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  }
}

module.exports = {
  getSport,
  insertSport,
  getAllSports,
  deleteSport,
  updateSport,
};
