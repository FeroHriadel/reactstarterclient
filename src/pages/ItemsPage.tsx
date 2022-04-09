import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../slices/itemsSlice';
import { RootState } from '../store';

const ItemsPage: React.FC = () => {
  //VALUES
  const items = useSelector((state: RootState )=> state.items);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');



  const handleSubmit = () => {
      dispatch(addItem(input));
      setInput('');
  }



  return (
    <div className='container'>
        <h1 className='text-center my-5'>Items</h1>

        {
            items.value.map(item => (
                <p>{item}</p>
            ))
        }

        <input
            type='text'
            value={input}
            name='input'
            onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>
            Submit
        </button>


    </div>
  )
}

export default ItemsPage