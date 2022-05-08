import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryBySlug } from '../actions/categoryActions';
import TitleDescriptionForm from '../components/forms/TitleDescriptionForm';
import { updateCategory, deleteCategory } from '../actions/categoryActions';
import { updateCategories, removeCategory } from '../slices/categoriesSlice';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../components/modals/ConfirmModal';
import SingleImageUpload from '../components/forms/formcomponents/SingleFileUpload';



const CategoryPage = () => {
  //VALUES
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [formShown, setFormShown] = useState(true);
  const [values, setValues] = useState({
    title: '', 
    description: '',
    image: {public_id: '', url: ''},
    _id: '', 
    slug: '', 
    createdAt: '', 
    updatedAt: ''
  });
  const { title, description, image, _id } = values;
  const [message, setMessage] = useState('Getting category details...');
  const { user } = useContext(UserContext);
  const [modalShown, setModalShown] = useState(false);
  const [actionConfirmed, setActionConfirmed] = useState(false);
  const [deleteButtonShown, setDeleteButtonShown] = useState(true);


  
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
    //change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setValues({...values, [e.target.name]: e.target.value})
  }

    //submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return setMessage('Title is required');
    
    setFormShown(false);
    setMessage('Updating category...');
    updateCategory(title, description, image, _id, user!.token!)
      .then(data => {
        if (data && data.error) {
          setMessage(data.error);
          setFormShown(true)
        } else {
          setMessage('Category Updated');
          setFormShown(true);
          setTimeout(() => {setMessage('')}, 1000);
          dispatch(updateCategories(values));
        }
      })
  }



  //DELETE CATEGORY
  useEffect(() => {
    if (actionConfirmed) {
      setMessage('Deleting Category...');
      setFormShown(false);
      deleteCategory(values._id, user!.token!)
        .then(data => {
          if (data && data.error) {
            setMessage(data.error);
            setFormShown(true);
            setTimeout(() => {setMessage('')}, 2000);
          } else {
            dispatch(removeCategory(values._id));
            setMessage('Category deleted');
            setDeleteButtonShown(false);
          }
        })
    }

  }, [actionConfirmed, values])






  //RENDER
  return (
    <div className='container mb-5'>
      <h1 className='text-center my-5'>Edit/Delete Category</h1>

      {
        values._id && formShown
        &&
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <label>Image</label>
            <SingleImageUpload values={values} setValues={setValues} />
            <div className='mb-3'></div>
            <TitleDescriptionForm values={{title, description}} handleChange={handleChange} handleSubmit={handleSubmit} />
          </div>
        </div>
      }

      {
        message 
        && 
        <p className='my-5 text-center'>{message}</p>
      }

      <div className='row mt-1'>
        <div className='col-md-6 offset-md-3'>
          {
            deleteButtonShown
            &&
            <Button variant='danger' className='col-12 mb-1' onClick={() => setModalShown(true)}>
              Delete Category
            </Button>
          }
          <Button variant='secondary' className='col-12 mb-1' onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>

      <ConfirmModal show={modalShown} onHide={() => setModalShown(false)} setActionConfirmed={setActionConfirmed} />
    </div>
  )
}

export default CategoryPage