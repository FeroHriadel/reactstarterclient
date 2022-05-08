import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCategories } from '../../slices/categoriesSlice';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';



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
                    setTimeout(() => setMessage(''), 2000);
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
              <ListGroup.Item>
                <small className='text-muted'>Click category to view/edit</small>
              </ListGroup.Item>
              {
                categories.map(category => (
                <ListGroup.Item 
                  key={category._id} 
                   
                  style={{cursor: 'pointer'}}
                  onClick={() => navigate(`/admin/categories/${category.slug}`)}
                >
                  <div className='d-flex w-100 justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                      {
                        category && category.image && category.image.url
                        ?
                        <div
                          className='category-image'
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: `url(${category.image.url}) no-repeat center center/cover`,
                            margin: '0.25rem'
                          }}
                        />
                        :
                        <p style={{
                          transform: 'rotate(-45deg)',
                          margin: '0.25rem',
                          padding: '0',
                          lineHeight: '50px',
                          borderRadius: '50%',
                          border: '1px #666 solid',
                          minWidth: '50px',
                          fontSize: '0.5rem',
                          wordWrap: 'break-word',
                          textAlign: 'center'
                        }}
                        >No image</p>
                      }
                      <p style={{margin: 0, padding: 0}}>{category.title}</p>
                    </div>
                    <FaEdit />
                  </div>
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