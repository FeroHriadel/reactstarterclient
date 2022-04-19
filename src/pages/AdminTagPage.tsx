import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeMessage } from '../slices/messageSlice';
import { RootState } from '../store';
import { getTagBySlug } from '../actions/tagActions';
import TitleDescriptionForm from '../components/forms/TitleDescriptionForm';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../components/modals/ConfirmModal';
import { updateTag } from '../actions/tagActions';



const AdminTagPage = () => {
  //VALUES
  const navigate = useNavigate();
  const params = useParams();
  const message = useSelector((state: RootState )=> state.message);
  const dispatch = useDispatch();
  const [formShown, setFormShown] = useState(true);
  const [values, setValues] = useState({title: '', description: '', _id: '', slug: '', createdAt: '', updatedAt: ''});
  const { title, description, _id } = values;
  const { user } = useContext(UserContext);
  const [modalShown, setModalShown] = useState(false);
  const [actionConfirmed, setActionConfirmed] = useState(false);
  const [deleteButtonShown, setDeleteButtonShown] = useState(true);


  //GET TAG
  useEffect(() => {
    const slug = params.slug!;
    dispatch(changeMessage('Getting tag...'));
    getTagBySlug(slug)
        .then(data => {
            if (data && data.error) {
                dispatch(changeMessage(data.error));
            } else {
                setValues(data.tag);
                dispatch(changeMessage(''));
            }
        })
  }, [params, dispatch]);



    //EDIT CATEGORY HANDLERS
    //change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMessage(''));
        setValues({...values, [e.target.name]: e.target.value})
      }
    
        //submit handler
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === '') return dispatch(changeMessage('Title is required'));
        
        setFormShown(false);
        dispatch(updateTag(title, description, _id, user!.token!));
      }




  //RENDER
  return (
    <div className='container mb-5'>
      <h1 className='text-center my-5'>Edit/Delete Tag</h1>

      {
        values._id && formShown
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

      <div className='row mt-1'>
        <div className='col-md-6 offset-md-3'>
          {
            deleteButtonShown
            &&
            <Button variant='danger' className='col-12 mb-1' onClick={() => setModalShown(true)}>
              Delete Tag
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

export default AdminTagPage