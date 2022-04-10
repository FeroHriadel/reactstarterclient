import { AddCategoryFormValues } from '../pages/AdminCategoriesPage';



export const createCategory = (values: AddCategoryFormValues, token: string) =>  {
    return fetch(`${process.env.REACT_APP_API}/categories/createcategory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        return res.json()
    })
    .catch(error => {
        console.log(error);
        return {error: 'Something went wrong (action)'}
    })
}