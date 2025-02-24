import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trans, TransModel } from "./trans.state";

export const initalTransState:TransModel ={
    listTrans: [],
}

export const transSlice = createSlice({
    name: "trans",
    initialState: initalTransState,
    reducers: {
        setListTrans(state, action: PayloadAction<Trans[]>){
            state.listTrans = action.payload;
        }
    }
})