import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../context/userContext';
import { Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createTag } from '../actions/tagActions';
import { changeMessage } from '../slices/messageSlice';
import { AddCategoryFormValues } from './AdminCategoriesPage';
import { RootState } from '../store';
import TitleDescriptionForm from '../components/forms/TitleDescriptionForm';
import TagsList from '../components/lists/TagsList';




type AddTagFormValues = AddCategoryFormValues;



const AdminTagsPage = () => {
  //VALUES
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const message = useSelector((state: RootState )=> state.message);
  const [addFormShown, setAddFormShown] = useState(false);
  const [values, setValues] = useState({title: '', description: ''});
  const { title } = values;
  const endOfList = useRef<HTMLDivElement>(null);



  //ADD TAG HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeMessage(''));
      setValues({...values, [e.target.name]: e.target.value})
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (title.trim() === '') {
          dispatch(changeMessage('Title is required'));
          return;
      }
      
      dispatch(createTag(values, user!.token!));
      setTimeout(() => {
        endOfList.current!.scrollIntoView();
      }, 750)
    }



  //RENDER
  return (
    <div className='container'>
        <h1 className='text-center my-5'>Manage Tags</h1>

        <div className='row add-tag-section'>
          <div className='col-md-6 offset-md-3'>
            <Button 
              variant='secondary' 
              className='col-12 mb-3' 
              onClick={() => setAddFormShown(!addFormShown)}>{addFormShown ? 'Hide' : 'Add Tag'}
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
          <h4 className='text-center'>Tags - List</h4>
          <div className='col-md-6 offset-md-3'>
            <TagsList />
            <div className='end-of-list' ref={endOfList} />
          </div>
        </div>      
    </div>
  )
}

export default AdminTagsPage