import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type MessageType = string;
const initialState: MessageType = '';



export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        changeMessage: (state, action: PayloadAction<MessageType>) => {
            return state = action.payload;
        }
    }
});

export const { changeMessage } = messageSlice.actions;
export default messageSlice.reducer;