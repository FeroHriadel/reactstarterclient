import React, { useEffect } from 'react';
import { fetchTags } from '../../actions/tagActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';



const TagsList = () => {
  //VALUES
  const message = useSelector((state: RootState )=> state.message);
  const tags = useSelector((state: RootState )=> state.tags);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  //GET CATEGORIES
  useEffect(() => {
    if (tags && tags.length === 0) { //only make api call when there's nothing in state.tags
      dispatch(fetchTags());
    }
  }, [tags]);



  return (
    <div>
        {
            tags && tags.length === 0
            ?
            <p className='text-center'>No tags found</p>
            :
            <ListGroup>
              <ListGroup.Item>
                <small className='text-muted'>Click tag to view/edit</small>
              </ListGroup.Item>
              {
                tags.map(tag => (
                <ListGroup.Item 
                  key={tag._id} 
                   
                  style={{cursor: 'pointer'}}
                  onClick={() => navigate(`/admin/tags/${tag.slug}`)}
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <p style={{margin: 0, padding: 0}}>{tag.title}</p>
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

export default TagsList