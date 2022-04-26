import React, { useState } from 'react';
import ItemForm from '../components/forms/ItemForm';
import { Item } from './ItemsPage';




const ItemAddPage: React.FC = () => {
  //VALUES
  const [values, setValues] = useState<Item>({
      category: '',
      tags: [],
      title: '',
      description: ''
  });



  //FORM HANDLERS
    //change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      //setError('')
      setValues({...values, [e.target.name]: e.target.value});
  }

    //submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(values);
  }



  //RENDER
  return (
    <div className='container'>
        <h1 className="my-5 text-center">
            Add Item
        </h1>

        <div className='row'>
            <div className="col-md-6 offset-md-3">
                <ItemForm values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    </div>
  )
}

export default ItemAddPage