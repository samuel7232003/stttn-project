const { getListCardService, addCardService, setListCardService, deleteAllCardService, doneOneCardService } = require("../services/cardService");
const { editNumFlashcardService, editFlashcardService } = require("../services/flashcardService");

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

const setListCard = async(req, res)=>{
    const list = req.body;
    const response = await setListCardService(list);
    const countDone = list.reduce((count, card) => card.status === true ? count + 1 : count, 0);
    await editFlashcardService({_id: list[0].idFlashcard, done: countDone, sum: list.length});
    return res.status(200).json(response);
}

const deleteAllCard = async(req, res)=>{
    const {id} = req.query;
    const response = await deleteAllCardService(id);
    return res.status(200).json(response);
}

const doneOneCard = async(req, res)=>{
    const card = req.body;
    const response = await doneOneCardService(card._id);
    await editNumFlashcardService(card.idFlashcard, "done");
    return res.status(200).json(response);
}

module.exports = {
    getListCard, addCard, setListCard, deleteAllCard, doneOneCard
}