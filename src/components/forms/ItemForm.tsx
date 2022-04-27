import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Item } from '../../pages/ItemsPage';
import CategoriesSelect from './formcomponents/CategoriesSelect';
import TagsSelect from './formcomponents/TagsSelect';



const ItemForm: React.FC<{
    values: Item;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}> = ({values, handleChange, handleSubmit}) => {
  //VALUES
  //...no values yet



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

        <div className="form-group mb-3">
          <label>Tags</label>
          <TagsSelect />
        </div>
    </Form>
  )
}

export default ItemForm