const GameModel = require("../model/GameModel.js");

async function createGame(req, res) {
    const gameReturn = await GameModel.createGame(req.body);
    return res.json({
        statusCode: 200,
        game: gameReturn
    });
}

async function deleteGame(req, res) {
    const gameReturn = await GameModel.deleteGame(req.body);
    return res.json({
        statusCode: 200,
        gameReturn
    });
}

async function getAllGames(req, res) {
    const gameReturn = await GameModel.getAllGames();
    return res.json({
        statusCode: 200,
        gameReturn
    });
}

module.exports = {
    createGame,
    deleteGame,
    getAllGames
}