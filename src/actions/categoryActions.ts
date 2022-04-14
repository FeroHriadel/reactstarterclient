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



export const fetchCategories = () => {
    return fetch(`${process.env.REACT_APP_API}/categories/getcategories`)
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log(error);
            return {error: 'Something went wrong (action)'}
        })
}



export const getCategoryBySlug = (slug: string) => {
    return fetch(`${process.env.REACT_APP_API}/categories/getcategory/${slug}`)
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log(error);
            return {error: 'Something went wrong (action)'}
        })
}



export const updateCategory = (title: string, description: string, _id: string, token: string) => {
    return fetch(`${process.env.REACT_APP_API}/categories/updatecategory`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, description, _id})
    })
    .then(res => {
        return res.json();
    })
    .catch(error => {
        console.log(error);
        return {error: 'Something went wrong (action'}
    })
}



export const deleteCategory = (categoryId: string, token: string) => {
    return fetch(`${process.env.REACT_APP_API}/categories/deletecategory/${categoryId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(error => {
        return {error: 'Something went wrong (action)'}
    })
}