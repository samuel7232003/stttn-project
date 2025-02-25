const cardModel = require("../models/Card");

const getListCardService = async(listId)=>{
    try {
        const result = await cardModel.find({idFlashcard: listId});
        return result;
    } catch (error) {
        return null;
    }
}

const addCardService = async(newCard)=>{
    try{
        const response = await cardModel.create(
            {
                front: newCard.front,
                front_note: newCard.front_note,
                back: newCard.back,
                back_note: newCard.back_note,
                status: true,
                no: newCard.no,
                idFlashCard: newCard.idFlashCard
            }
        )
        return response;
    } catch(error){
        return null;
    }
}

module.exports = {
    getListCardService, addCardService
}