import React, { useEffect, useState } from 'react';
import TagCheckbox from './TagCheckbox';
import { fetchTags } from '../../../actions/tagActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TagItem } from '../../../models/models';
import { Item } from '../../../models/models';




const TagsSelect: React.FC<{setValues: (values: Item) => void; values: Item}> = ({ setValues, values }) => {
  //VALUES
  const tags = useSelector((state: RootState) => state.tags);
  const message = useSelector((state: RootState) => state.message); //this shows fetchTags error
  const dispatch = useDispatch();
  const { tags : selectedTags } = values;



  //FETCH TAGS
  useEffect(() => {
    if (!tags || tags.length === 0) {
      dispatch(fetchTags());
    }
  }, [tags]);



  //(UN)/SELECT CLICKED TAG
  const toggleTag = (tag: TagItem) => {
    const existingTags = [...selectedTags];
    const clickedTagIdx = existingTags.indexOf(tag._id);
    if (clickedTagIdx === -1) {
      existingTags.push(tag._id);
    } else {
      existingTags.splice(clickedTagIdx, 1);
    }

    setValues({...values, tags: existingTags});
  }



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
              <TagCheckbox key={t._id} tag={t} toggleTag={toggleTag} values={values}/>
            ))
          }
        </div>
    </div>
  )
}

export default TagsSelect