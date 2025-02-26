const { deleteAllCardService } = require("../services/cardService");
const { getListFlashcardService, addFlashcardService, editNumFlashcardService, deleteFlashcardService } = require("../services/flashcardService");


const getListFlashcard = async(req, res)=>{
    const {id} = req.query;
    const data = await getListFlashcardService(id);
    return res.status(200).json(data);
}

const addFlashcard = async(req,res)=>{
    const {name, idUser} = req.body;
    const response = await addFlashcardService(name, idUser);
    return res.status(200).json(response);
}

const editNumFlashcard = async(req, res)=>{
    const {id, type} = req.query;
    const response = await editNumFlashcardService(id, type);
    return res.status(200).json(response);
}

const deleteFlashCard = async(req, res)=>{
    const {id} = req.query;
    const response = await deleteFlashcardService(id);
    await deleteAllCardService(id);
    return res.status(200).json(response);
}

module.exports = {
    getListFlashcard, addFlashcard, editNumFlashcard, deleteFlashCard
}