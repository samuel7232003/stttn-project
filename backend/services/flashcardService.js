const { response } = require("express");
const flashcardModel = require("../models/Flashcard");

const getListFlashcardService = async(idUser)=>{
    try {
        const result = await flashcardModel.find({idUser: idUser});
        return result;
    } catch (error) {
        return null;
    }
}

const addFlashcardService = async(name, idUser)=>{
    try{
        const response = await flashcardModel.create(
            {
                name: name,
                done: 0,
                sum: 0,
                idUser: idUser,
            }
        )
        return response;
    } catch(error){
        return null;
    }
}

const editNumFlashcardService = async(id, type) =>{
    try{
        const flashcard = await flashcardModel.find({_id: id});
        if(type === "add"){
            const response = await flashcardModel.replaceOne(
                {_id: id},
                {
                    name: flashcard.name,
                    done: flashcard.done,
                    sum: flashcard.sum + 1,
                    idUser: flashcard.idUser,
                }
            )
        }
        else if(type === "done"){
            const response = await flashcardModel.replaceOne(
                {_id: id},
                {
                    name: flashcard.name,
                    done: flashcard.done+1,
                    sum: flashcard.sum,
                    idUser: flashcard.idUser,
                }
            )
        }
        else if(type === "remove"){
            const response = await flashcardModel.replaceOne(
                {_id: id},
                {
                    name: flashcard.name,
                    done: flashcard.done,
                    sum: flashcard.sum-1,
                    idUser: flashcard.idUser,
                }
            )
        }
        else if(type === "notdone"){
            const response = await flashcardModel.replaceOne(
                {_id: id},
                {
                    name: flashcard.name,
                    done: flashcard.done-1,
                    sum: flashcard.sum,
                    idUser: flashcard.idUser,
                }
            )
        }
        return response;
    } catch(error){
        return null;
    }
}

module.exports = {
    getListFlashcardService, addFlashcardService, editNumFlashcardService
}