import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../slices/categoriesSlice';
import TitleDescriptionForm from '../components/forms/TitleDescriptionForm';
import { RootState } from '../store';
import { createCategory } from '../actions/categoryActions';



export type AddCategoryFormValues = {
  title: string;
  description: string;
}



const AdminCategoriesPage = () => {
  //VALUES
  const categories = useSelector((state: RootState )=> state.categories);
  const dispatch = useDispatch();
  const [addFormShown, setAddFormShown] = useState(false);
  const [values, setValues] = useState({title: '', description: ''});
  const { title } = values;
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);
  


  //ADD CATEGORY HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return setMessage('Title is required');

    setMessage('Creating Category');
    createCategory(values, user!.token!)
      .then(data => {
        if (data && data.error) {
          return setMessage(data.error);
        } else {
          setMessage('Category created');
          dispatch(addCategory(data.category));
          setTimeout(() => {setMessage('')}, 1000);
        }
      })
  }



  //RENDER
  return (
    <div className='container'>
        <h1 className='text-center my-5'>Manage Categories</h1>

        <div className='row add-category-section'>
          <div className='col-md-6 offset-md-3'>
            <Button 
              variant='secondary' 
              className='col-12 mb-3' 
              onClick={() => setAddFormShown(!addFormShown)}>{addFormShown ? 'Hide' : 'Add Category'}
            </Button>

            {
              addFormShown
              &&
              <TitleDescriptionForm values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
            } 

            {
              message && addFormShown
              &&
              <Alert className='text-center mt-2' variant='primary'>{message}</Alert>
            }

          </div>  
        </div>

        <div className='row my-5 all-categories-section'>
          <h4 className='text-center'>Categories - List</h4>
          <div className='col-md-6 offset-md-3'>
            {
              categories && categories.length === 0
              ?
              <p className='text-center'>No categories found</p>
              :
              categories.map(category => (
                <p key={category._id}>{category.title}</p>
              ))
            }
          </div>
        </div>      
    </div>
  )
}

export default AdminCategoriesPage