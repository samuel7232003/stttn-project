import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageModel } from "./message.stage";

export const initalMessageState:MessageModel ={
    listMessage: [],
}

export const messageSlice = createSlice({
    name: "message",
    initialState: initalMessageState,
    reducers: {
        setListMessage(state, action: PayloadAction<Message[]>){
            state.listMessage = action.payload;
        }
    }
})