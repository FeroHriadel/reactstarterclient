import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export type CategoryItem = {
    title: string;
    slug: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

type CategoriesState = CategoryItem[];

const initialState: CategoriesState = [];




export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<CategoryItem>) => {
            state.push(action.payload); //you don't have to overwrite original state like in classical redux setup
        },
        getCategories: (state, action: PayloadAction<CategoryItem[]>) => {
            return state = [...action.payload]; //use `return` when you reasign the state value
        },
        updateCategories: (state, action: PayloadAction<CategoryItem>) => {
            const idx = state.findIndex(item => item._id === action.payload._id);
            state = state.splice(idx, 1, action.payload);
        }
    }
});

export const { addCategory, getCategories, updateCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;




