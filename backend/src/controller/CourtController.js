const CourtModel = require("../model/CourtModel.js");

async function addCourt(req, res) {
  const court = await CourtModel.insertCourt(req.body);
  if(!court.error){
    return res.json({
      statusCode: 200,
      court: court,
    });
  }
  return res.json({
    statusCode: 400
  });
}

async function getCourtById(req, res) {
  const court = await CourtModel.getCourt(req.body);
  if(!court.error){
    return res.json({
      statusCode: 200,
      court: court,
    });
  }
  return res.json({
    statusCode: 400
  });
}

async function getAllCourts(req, res) {
  const courts = await CourtModel.getAllCourts();
  if(!courts.error){
    return res.json({
      statusCode: 200,
      courts: courts,
    });
  }
  return res.json({
    statusCode: 400
  });
}

async function deleteCourt(req, res) {
  const returnCourt = await CourtModel.deleteCourt(req.body);
  if(!returnCourt.error){
    return res.json({
      statusCode: 200,
      court: returnCourt,
    });
  }
  return res.json({
    statusCode: 400
  });
}

async function updateCourt(req, res) {
  const returnCourt = await CourtModel.updateCourt(req.body);
  if(!returnCourt.error){
    return res.json({
      statusCode: 200,
      court: returnCourt,
    });
  }
  return res.json({
    statusCode: 400
  });
}

module.exports = {
  addCourt,
  getCourtById,
  getAllCourts,
  deleteCourt,
  updateCourt,
};
