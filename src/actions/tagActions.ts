//type imports
import { AddCategoryFormValues } from '../pages/AdminCategoriesPage';
import { CategoryItem } from '../slices/categoriesSlice';

//action imports
import { addTag, getTags, updateTags, removeTag } from '../slices/tagsSlice';
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
        setTimeout(() => {dispatch(changeMessage(''))}, 1000);
        return;
    }

    dispatch(addTag(data.tag));
    dispatch(changeMessage('Tag added'));
    setTimeout(() => {dispatch(changeMessage(''))}, 1000);
}



export const fetchTags = () => async (dispatch: any) => {
    dispatch(changeMessage('Getting tags...'));

    const res = await fetch(`${process.env.REACT_APP_API}/tags/gettags`);
    const data = await res.json();
    if (data && data.error) {
        console.log(data.error);
        dispatch(changeMessage(data.error));
        setTimeout(() => {
            dispatch(changeMessage(''));
        }, 1000);
        return;
    }

    if (data && data.tags.length === 0) {
        dispatch(changeMessage('No tags found'));
        setTimeout(() => {dispatch(changeMessage(''));}, 2000);
        return;
    }

    dispatch(getTags(data.tags));
    dispatch(changeMessage(''));
}



export const getTagBySlug = (slug: string) => {
    return fetch(`${process.env.REACT_APP_API}/tags/gettag/${slug}`)
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log(error);
            return {error: 'Something went wrong (action)'}
        })
}



export const updateTag = (title: string, description: string, _id: string, token: string) => async (dispatch: any) => {
    dispatch(changeMessage('Updating Tag...'));

    const res = await fetch(`${process.env.REACT_APP_API}/tags/updatetag`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, description, _id})
    });

    const data = await res.json();
    if (data && data.error) {
        dispatch(changeMessage(data.error));
        setTimeout(() => {
            dispatch(changeMessage(''));
        }, 1000);
        return;
    }

    dispatch(updateTags(data.tag));
    dispatch(changeMessage('Tag updated'));
    setTimeout(() => {dispatch(changeMessage(''))}, 1000);
}



export const deleteTag = (tagId: string, token: string) => async (dispatch: any) => {
    dispatch(changeMessage('Deleting Tag...')); //watch out! AdminCategoryPage depends on the exact wording of this message!

    const res = await fetch(`${process.env.REACT_APP_API}/tags/deletetag/${tagId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    const data = await res.json();

    if (data && data.error) {
        dispatch(changeMessage(data.error)); 
        return;
    }

    dispatch(removeTag(tagId));
    dispatch(changeMessage('Tag deleted. Redirecting...')); //watch out! AdminCategoryPage depends on the exact wording of this message! Which I know is totally retarded but it was not my idea to put `dispatch` into tagActions. I am only adapting to stupid requirements.
}