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
        }
    }
});

export const { addTag, getTags } = tagsSlice.actions;
export default tagsSlice.reducer;




