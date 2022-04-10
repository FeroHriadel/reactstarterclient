import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type CategoryItem = {
    title: string;
    slug: string;
    description: string;
    _id: string;
    createdAt: string;
    upadatedAt: string;
}

type CategoriesState = CategoryItem[];

const initialState: CategoriesState = [];




export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<CategoryItem>) => {
            state.push(action.payload);
        },
    }
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;




