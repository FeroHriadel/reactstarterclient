import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface ItemsState {
    value: string[]
}

const initialState: ItemsState = {
    value: []
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        }
    }
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
