import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { transSlice } from "./trans.slice";
import { Trans } from "./trans.state";
import { transMessageServer } from "../../service/messageService";

export const transAction = transSlice.actions;

export const addTrans = (content: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const trans_en = await transMessageServer(content, "en");
        const trans_vi = await transMessageServer(trans_en, "vi");
        const newTran:Trans = {_id: "", idUser: "", content: trans_en, trans: trans_vi };
        const data: Trans[] = [...getState().trans.listTrans, newTran];
        dispatch(transAction.setListTrans(data));
    }
}

