const mongoose = require('mongoose')

const flashcardSchema = mongoose.Schema({
    name: String,
    done: Number,
    sum: Number,
    idUser: String
})

const flashcardModel = mongoose.model("Flashcard", flashcardSchema)
module.exports = flashcardModel