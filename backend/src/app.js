const express = require("express");
const cors = require("cors");
const { createTables, populateTables } = require("./model/DatabaseModel");

const router = require("./routes/routes.js");
const app = express();

app.use(express.json());
app.use(cors());

// createDBTables = true to create Tables / createDBTables = false if tables was already created
const createDBTables = false;
if (createDBTables) {
  createTables();
}

app.use(router);

app.listen(3001, () => console.log("Server is Running!"));
