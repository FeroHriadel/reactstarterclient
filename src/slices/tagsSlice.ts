import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagItem } from '../models/models';



type TagsState = TagItem[];
const initialState: TagsState = [];



export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTag: (state, action: PayloadAction<TagItem>) => {
            state.push(action.payload);
        },
        getTags: (state, action: PayloadAction<TagItem[]>) => {
            return state = [...action.payload];
        },
        updateTags: (state, action: PayloadAction<TagItem>) => {
            const idx = state.findIndex(item => item._id === action.payload._id);
            state = state.splice(idx, 1, action.payload);
        },
        removeTag: (state, action: PayloadAction<string>) => {
            return state.filter(tag => tag._id !== action.payload);
        }
    }
});

export const { addTag, getTags, updateTags, removeTag } = tagsSlice.actions;
export default tagsSlice.reducer;




