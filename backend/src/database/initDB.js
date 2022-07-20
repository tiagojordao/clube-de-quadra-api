const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const db_filepath = "./src/database/clube_de_quadra.db";

// you would have to import / invoke this in another file
async function db_open() {
  return open({
    filename: db_filepath,
    driver: sqlite3.Database,
  });
}

module.exports = {
  db_open,
  db_filepath,
};
