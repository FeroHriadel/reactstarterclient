import React from 'react';
import { Item, TagItem } from '../../../models/models';



const TagCheckbox: React.FC<{tag: TagItem, toggleTag: (tag: TagItem) => void, values: Item}> = ({ tag, toggleTag, values }) => {
  //if bad tag data:
  if (!tag || !tag._id) return (
      <p className="text-center text-muted">
          <small>Bad Tag data</small>
      </p>
  )



  //RENDER
  return (
    <div 
      className='tag-checkbox' 
      onClick={() => toggleTag(tag)} 
      style={
        values.tags.includes(tag._id)
        ?
        {boxShadow: '0 0 10px #b02304'}
        :
        {}
      }
    >
        <p>{tag.title}</p>
    </div>
  )
}

export default TagCheckbox