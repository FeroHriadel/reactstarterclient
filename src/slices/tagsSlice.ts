import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem } from './categoriesSlice';



type TagItem = CategoryItem;
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
    }
});

export const { addTag, getTags, updateTags } = tagsSlice.actions;
export default tagsSlice.reducer;




