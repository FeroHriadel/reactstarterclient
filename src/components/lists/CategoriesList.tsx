import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCategories } from '../../slices/categoriesSlice';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const CategoriesList = () => {
  //VALUES
  const [message, setMessage] = useState('');
  const categories = useSelector((state: RootState )=> state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  //GET CATEGORIES
  useEffect(() => {
    if (categories && categories.length === 0) { //only make api call when there's nothing in state.categories
      setMessage('Loading categories...')
      fetchCategories()
          .then(data => {
              if (data && data.error) {
                    setMessage('Loading categories failed');
              } else {
                  setMessage('');
                  dispatch(getCategories(data.categories));
              }
          })
    }
    
  }, [categories]);



  return (
    <div>
        {
            categories && categories.length === 0
            ?
            <p className='text-center'>No categories found</p>
            :
            <ListGroup>
              <ListGroup.Item className='text-center'>
                <small className='text-muted'>Click category to view/edit</small>
              </ListGroup.Item>
              {
                categories.map(category => (
                <ListGroup.Item 
                  key={category._id} 
                  className='text-center' 
                  style={{cursor: 'pointer'}}
                  onClick={() => navigate(`/categories/${category.slug}`)}
                >
                  {category.title}
                </ListGroup.Item>
                ))
              }
            </ListGroup>
        }

        {
          message && <p className='text-center'>{message}</p>
        }
    </div>
  )
}

export default CategoriesList