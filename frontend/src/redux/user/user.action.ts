import { ThunkAction } from "redux-thunk";
import userSlice, { initialUserState } from "./user.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { User } from "./user.state";
import { editAccount, getAccount, getProfileService } from "../../service/accountService";

export const userActions = userSlice.actions;

export const getProfile = ():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const {email}:any = await getProfileService();
        if(email){
            const respone:User = await getAccount("", email);
            dispatch(userActions.setUser(respone));
        }
    }
}

export const logout = ():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) =>{
        dispatch(userActions.setUser(initialUserState.user));
    }
}

export const getUser = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const response :User = await getAccount(id, "");
        dispatch(userActions.setUser(response));
    }
}

export const editUser = (user: User):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        dispatch(userActions.setUser({...user}));
        await editAccount(user);
    }
}