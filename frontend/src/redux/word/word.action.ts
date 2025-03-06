import { ThunkAction } from "redux-thunk";
import wordSlice from "./word.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { Word } from "./word.state";

export const wordActions = wordSlice.actions;

export const setListWord = (listWord: Word[]):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async(dispatch, getState)=>{
        dispatch(wordActions.setWordList(listWord));
    }
}

export const addWord = (word: Word):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async(dispatch, getState)=>{
        dispatch(wordActions.setWordList([...getState().word.listWord, word]));
    }
}

export const deleteWord = (id: string):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async(dispatch, getState)=>{
        const newList:Word[] = getState().word.listWord.filter(item => item._id!==id);
        dispatch(wordActions.setWordList(newList));
    }
}