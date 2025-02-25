const { getListCardService, addCardService } = require("../services/cardService");
const { editNumFlashcardService } = require("../services/flashcardService");

const getListCard = async(req, res)=>{
    const {id} = req.query;
    const data = await getListCardService(id);
    return res.status(200).json(data);
}

const addCard = async(req,res)=>{
    const card = req.body;
    const response = await addCardService(card);
    const response_ = await editNumFlashcardService(card.idFlashcard, "add");
    return res.status(200).json(response);
}

module.exports = {
    getListCard, addCard
}