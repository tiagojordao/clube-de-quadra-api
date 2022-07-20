const { db_open } = require("../database/initDB.js");

const DB_ERROR_OBJ = (e) => {
  return {
    statusCode: 500,
    pessoa: {},
    error: e,
    message: "Could not connect to the database",
  };
};

async function insertSchedule(schedule) {
  try {
    var db = await db_open();
    try {
      const scheduleResult = await db.run(
        "INSERT INTO Horario (dataHoraInicio, dataHoraFim) VALUES (?,?)",
        [schedule.dataInicio, schedule.dataFim]
      );
      return {
        schedule: scheduleResult,
      };
    } catch (e) {
      return {
        schedule: schedule,
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

async function deleteSchedule(schedule) {
  try {
    var db = await db_open();
    try {
      const scheduleResult = await db.get("SELECT * FROM Horario WHERE id=?", [
        schedule.id,
      ]);
      await db.get("DELETE FROM Horario WHERE id=?", [schedule.id]);
      return scheduleResult;
    } catch (e) {
      return schedule;
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getAllSchedules() {
  try {
    var db = await db_open();

    try {
      const schedules = await db.all("SELECT * FROM Horario");
      return schedules;
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

module.exports = {
  insertSchedule,
  deleteSchedule,
  getAllSchedules,
};
