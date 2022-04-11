import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryBySlug } from '../actions/categoryActions';
import TitleDescriptionForm from '../components/forms/TitleDescriptionForm';
import { updateCategory } from '../actions/categoryActions';
import { updateCategories } from '../slices/categoriesSlice';
import { useDispatch } from 'react-redux';



const CategoryPage = () => {
  //VALUES
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [formShown, setFormShown] = useState(true);
  const [values, setValues] = useState({title: '', description: '', _id: '', slug: '', createdAt: '', updatedAt: ''});
  const { title, description, _id } = values;
  const [message, setMessage] = useState('Getting category details...');
  const { user } = useContext(UserContext);


  
  //GET CATEGORY
  useEffect(() => {
    const slug = params.slug!;
    setMessage('Getting category details...');
    getCategoryBySlug(slug)
      .then(data => {
        if (data && data.error) {
          setMessage(data.error);
        } else {
          setValues(data.category);
          setMessage('');
        }
      })
  }, [params]);



  //EDIT CATEGORY HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return setMessage('Title is required');
    
    setMessage('Updating category...');
    updateCategory(title, description, _id, user!.token!)
      .then(data => {
        if (data && data.error) {
          setMessage(data.error);
        } else {
          setMessage('Category Updated');
          setTimeout(() => {setMessage('')}, 1000);
          dispatch(updateCategories(values));
        }
      })
  }




  //RENDER
  return (
    <div className='container'>
      <h1 className='text-center my-5'>Edit/Delete Category</h1>

      {
        values.title && formShown
        &&
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <TitleDescriptionForm values={{title, description}} handleChange={handleChange} handleSubmit={handleSubmit} />
          </div>
        </div>
      }

      {
        message 
        && 
        <p className='my-5 text-center'>{message}</p>
      }
    </div>
  )
}

export default CategoryPage