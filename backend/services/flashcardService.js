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
        const flashcard = await flashcardModel.findOne({_id: id});
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

const editFlashcardService = async (newFlashcard) => {
    try {
        const { _id, ...updateData } = newFlashcard;
        const response = await flashcardModel.updateOne(
            { _id },
            { $set: updateData }
        );
        return response;
    } catch (error) {
        console.error("Error updating flashcard:", error);
        return null;
    }
};

const deleteFlashcardService = async(id)=>{
    try {
        const result = await flashcardModel.deleteOne({_id:id});
        return result;
    } catch (error) {
        console.error("Error replacing cards with new list:", error);
        return null;
    }
}

module.exports = {
    getListFlashcardService, addFlashcardService, editNumFlashcardService, editFlashcardService,deleteFlashcardService
}