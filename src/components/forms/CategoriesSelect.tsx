import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../slices/categoriesSlice';
import { fetchCategories } from '../../actions/categoryActions';
import { RootState } from '../../store';




const CategoriesSelect: React.FC = () => {
  //VALUES
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState )=> state.categories);
    const [message, setMessage] = useState('');



  //GET CATEGORIES
  useEffect(() => {
    if ((!categories) || (categories && categories.length === 0)) {
        setMessage('Getting Categories...')
        fetchCategories()
            .then(data => {
                if (data && data.error) {
                    setMessage(data.error);
                } else {
                    setMessage('');
                    dispatch(getCategories(data.categories));
                }
            })

    }
  }, [categories])



  //RENDER
  return (
    <div className='form-group mb-3'>
        {
            message
            &&
            <p className='text-center text-muted'>
                <small>
                    {message}
                </small>
            </p>
        }

        {
            categories && categories.length > 0
            &&
            <Form.Select name='category'>
                <option value=''>Select a Category</option>
                {
                    categories.map(c => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                    ))
                }
                
            </Form.Select>
        }
    </div>
  )
}

export default CategoriesSelect