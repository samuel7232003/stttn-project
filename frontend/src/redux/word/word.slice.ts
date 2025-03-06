import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Word, WordModel } from "./word.state"

export const initialWordState:WordModel = {
    word: {
        _id: '',
        word: '',
        sym: '',
        mean: ''
    },
    listWord: []
}

export const wordSlice = createSlice({
    name: "word",
    initialState: initialWordState,
    reducers: {
        setWord(state, action: PayloadAction<Word>){
            state.word = action.payload
        },
        setWordList(state, action: PayloadAction<Word[]>){
            state.listWord = action.payload
        }
    }
})

export default wordSlice;