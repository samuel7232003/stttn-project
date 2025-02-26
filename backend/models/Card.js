const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    front: String,
    front_note: String,
    back: String,
    back_note: String,
    status: Boolean,
    no:Number,
    idFlashcard: String
})

const cardModel = mongoose.model("Card", cardSchema)
module.exports = cardModel