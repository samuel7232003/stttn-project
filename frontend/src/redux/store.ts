import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { messageSlice } from "./message/message.slice";
import { transSlice } from "./trans/trans.slice";
import userSlice from "./user/user.slice";

export const store = configureStore({
    reducer: {
        message:messageSlice.reducer,
        trans:transSlice.reducer,
        user:userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch