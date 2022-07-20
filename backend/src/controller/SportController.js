const SportModel = require('../model/SportModel.js');

async function insertSport(req, res) {
  const sportReturn = await SportModel.insertSport(req.body);
  return res.json({
    statusCode: 200,
    sport: sportReturn,
  });
}

async function getSport(req, res) {
  const sport = await SportModel.getSport(req.body.id);
  if (sport) {
    return res.json({
      statusCode: 200,
      sport,
    });
  } else {
    return res.json({
      statusCode: 400,
      message: "Sport not found",
    });
  }
}

async function getAllSports(req, res) {
  const sports = await SportModel.getAllSports();
  return res.json({
    statusCode: 200,
    sports: sports,
  });
}

async function deleteSport(req, res) {
  const sport = await SportModel.deleteSport(req.body.id);
  return res.json({
    statusCode: 200,
    sport: sport,
  });
}

async function updateSport(req, res) {
  const sport = await SportModel.updateSport(req.body);
  return res.json({
    statusCode: 200,
    sport: sport,
  });
}

module.exports = {
  insertSport,
  getSport,
  getAllSports,
  deleteSport,
  updateSport
}
