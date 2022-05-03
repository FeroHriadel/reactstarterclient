import React from 'react';
import { TagItem } from '../../../models/models';



const TagCheckbox: React.FC<{tag: TagItem, toggleTag: (tag: TagItem) => void}> = ({ tag, toggleTag }) => {
  //if bad tag data:
  if (!tag || !tag._id) return (
      <p className="text-center text-muted">
          <small>Bad Tag data</small>
      </p>
  )



  //RENDER
  return (
    <div className='tag-checkbox' onClick={() => toggleTag(tag)}>
        <p>{tag.title}</p>
    </div>
  )
}

export default TagCheckbox