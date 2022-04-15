import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './slices/itemsSlice'; //this is a mind-fuck. itemsSlice.ts exports no such thing => it must be something that reacttoolkit does
import categoriesReducer from "./slices/categoriesSlice";
import tagsReducer from "./slices/tagsSlice";
import messageReducer from "./slices/messageSlice";


export const store = configureStore({
    reducer: {
        items: itemsReducer,
        categories: categoriesReducer,
        tags: tagsReducer,
        message: messageReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch