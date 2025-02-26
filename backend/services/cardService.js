const cardModel = require("../models/Card");
const mongoose = require('mongoose');

const getListCardService = async(listId)=>{
    try {
        const result = await cardModel.find({idFlashcard: listId});
        return result;
    } catch (error) {
        return null;
    }
}

const setListCardService = async (list) => {
    try {
        if(list.length>0) await cardModel.deleteMany({idFlashcard: list[0].idFlashcard}); // Xóa toàn bộ dữ liệu cũ
        
        const newCards = list.map(card => ({
            ...card,
            _id: new mongoose.Types.ObjectId() // Tạo ObjectId mới cho từng bản ghi
        }));

        const result = await cardModel.insertMany(newCards);
        return result;
    } catch (error) {
        console.error("Error replacing cards with new list:", error);
        return null;
    }
};

const deleteAllCardService = async(id)=>{
    try {
        const result = await cardModel.deleteMany({idFlashcard: id});
        return result;
    } catch (error) {
        console.error("Error replacing cards with new list:", error);
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

const doneOneCardService = async(id)=>{
    try {
        const response = await cardModel.updateOne(
            {_id: id},
            {status: true} 
        )
        return response;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getListCardService, addCardService, setListCardService, deleteAllCardService, doneOneCardService
}