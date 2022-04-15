//type imports
import { AddCategoryFormValues } from '../pages/AdminCategoriesPage';
import { CategoryItem } from '../slices/categoriesSlice';

//action imports
import { addTag } from '../slices/tagsSlice';
import { changeMessage } from '../slices/messageSlice';



//categories and tags have the same data {title, description...} but I dont want to confuse other peope by asigning tag: CategoryItem. That's why I declared TagItem here:
type AddTagFormValues = AddCategoryFormValues;
type TagItem = CategoryItem;



//action creators
export const createTag = (values: AddTagFormValues, token: string) => async (dispatch: any) => {
    dispatch(changeMessage('Adding Tag...'));

    const res = await fetch(`${process.env.REACT_APP_API}/tags/createtag`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });

    const data = await res.json();
    if (data && data.error) {
        console.log(data.error);
        dispatch(changeMessage(data.error || 'Something went wrong (action)'));
        return;
    }

    dispatch(addTag(data.tag));
    dispatch(changeMessage('Tag added'));
    setTimeout(() => {dispatch(changeMessage(''))}, 1000);
} 