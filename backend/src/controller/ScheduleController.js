const ScheduleModel = require("../model/ScheduleModel.js");

async function insertSchedule(req, res) {
    const schedule = await ScheduleModel.insertSchedule(req.body);
    return res.json({
        statusCode: 200,
        schedule
    });
}

async function deleteSchedule(req, res) {
    const schedule = await ScheduleModel.deleteSchedule(req.body);
    return res.json({
        statusCode: 200,
        schedule
    });
}

async function getAllSchedules(req, res) {
    const schedules = await ScheduleModel.getAllSchedules();
    return res.json({
        statusCode: 200,
        schedules
    });
}

module.exports = {
    insertSchedule,
    deleteSchedule,
    getAllSchedules
}