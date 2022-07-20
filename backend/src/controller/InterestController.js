const InterestModel = require("../model/InterestModel");
const GameModel = require("../model/GameModel.js");
const PersonGameModel = require("../model/PersonGameModel.js");

async function insertInterest(req, res) {

    const interestReturn = await InterestModel.insertInterest(req.body);

    if(!interestReturn.error){
        const allInterested = await InterestModel.getAllInterested(req.body);
        if(allInterested.interested_amout == allInterested.necessary_amout){
            const game = {
                modalidade_id: allInterested.players[0].id_modalidade,
                quadra_id: 1,
                horario_id: allInterested.players[0].id_horario
            };

            const gameIDReturn = await GameModel.createGame(game);
            
            if(!gameIDReturn.error){
                var reqPersonGame;
                for(const player of allInterested.players) {
                    reqPersonGame = {
                        pessoa_cpf: player.CPF,
                        partida_id: gameIDReturn.id
                    };
                    const pgResult = await PersonGameModel.insertPersonGame(reqPersonGame);
                }
            } else {
                return res.json({
                    error: "Can't insert player into game!"
                });
            }
            return res.json({
                statusCode: 200,
                message: "A game was created!"
            });
        }

        return res.json({
            statusCode: 200,
            interestReturn
        });
    } else {
        return res.json ({
            statusCode: 400,
            message: "The operation could not be completed!"
        });
    }
}

async function deleteInterest(req, res) {

    const interestReturn = await InterestModel.deleteInterest(req.body);
    return res.json({
        statusCode: 200,
        interestReturn
    });

}

async function getInterestByCPF(req, res) {

    const interestReturn = await InterestModel.getInterestByCPF(req.body);
    return res.json({
        statusCode: 200,
        interestReturn
    });

}

async function getAllInterested(req, res) {
    const allInterested = await InterestModel.getAllInterested(req.body);
    if(!allInterested.error){
        return res.json({
            statusCode: 200,
            allInterested
        });
    } else {
        return res.json({
            statusCode: 400,
            message: "Can't find any interested!"
        });
    }
}

module.exports = {
    insertInterest,
    deleteInterest,
    getInterestByCPF,
    getAllInterested
    
}