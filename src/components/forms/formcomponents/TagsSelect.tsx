import React, { useEffect } from 'react';
import TagCheckbox from './TagCheckbox';
import { fetchTags } from '../../../actions/tagActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { wrap } from 'module';



const TagsSelect: React.FC = () => {
  //VALUES
  const tags = useSelector((state: RootState) => state.tags);
  const message = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();



  //FETCH TAGS
  useEffect(() => {
    if (!tags || tags.length === 0) {
      dispatch(fetchTags());
    }
  }, [tags])



  //RENDER
  return (
    <div>
        {
          message
          &&
          <p className='text-center text-muted'>
            <small>{message}</small>
          </p>
        }

        {
          !message && tags.length === 0
          &&
          <p className='text-center text-muted'>
            <small>No tags found</small>
          </p>
        }

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {
            tags.map(t => (
              <TagCheckbox key={t._id} tag={t} />
            ))
          }
        </div>
    </div>
  )
}

export default TagsSelect