import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Item } from '../../pages/ItemsPage';
import CategoriesSelect from './CategoriesSelect';



const ItemForm: React.FC<{
    values: Item;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}> = ({values, handleChange, handleSubmit}) => {
  //VALUES



  //RENDER
  return (
    <Form>
        <p className="text-muted text-center">
          <small>Fields marked * are required</small>
      </p>

        <div className="form-group mb-3">
          <label htmlFor="category">*Category</label>
          <CategoriesSelect />
        </div>
    </Form>
  )
}

export default ItemForm