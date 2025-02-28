import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { Message } from "./message.stage";
import { messageSlice } from "./message.slice";
import { sendMessageServer} from "../../service/messageService"

export const messageAction = messageSlice.actions;

export const sendMessage = (content: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const newMess:Message = {_id: "", idUser: "", content: content, role: "USER" }
        const data: Message[] = [...getState().message.listMessage, newMess];
        dispatch(messageAction.setListMessage(data));
        const rep = await sendMessageServer(content);
        const repMess:Message = {_id: "", idUser: "", content: rep, role: "SYSTEM" };
        const newData: Message[] = [...data, repMess];
        dispatch(messageAction.setListMessage(newData));
    }
}

