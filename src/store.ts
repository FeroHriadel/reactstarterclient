import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './slices/itemsSlice'; //this is a mind-fuck. itemsSlice.ts exports no such thing => it must be something that reacttoolkit does


export const store = configureStore({
    reducer: {
        items: itemsReducer,
        //add more reducers here
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch