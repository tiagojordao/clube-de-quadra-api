const CourtSportModel = require("../model/CourtSportModel.js");

async function insertCourtSport(req, res) {
    const courtSport = await CourtSportModel.insertCourtSport(req.body.court_id, req.body.sport_id);
    return res.json({
        statusCode: 200,
        ...courtSport
    });
}

async function deleteCourtSport(req, res) {
    const courtSport = await CourtSportModel.deleteCourtSport(req.body.court_id, req.body.sport_id);
    console.log(courtSport);
    return res.json({
        statusCode: 200,
        courtSport: courtSport
    });
}

module.exports = {
    insertCourtSport,
    deleteCourtSport
}