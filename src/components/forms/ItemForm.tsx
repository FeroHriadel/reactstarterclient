import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Item } from '../../pages/ItemsPage';
import CategoriesSelect from './formcomponents/CategoriesSelect';
import TagsSelect from './formcomponents/TagsSelect';



const ItemForm: React.FC<{
    values: Item;
    setValues: (values: Item) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}> = ({values, setValues, handleChange, handleSubmit}) => {
  //VALUES
  //...no values yet



  //RENDER
  return (
    <Form onSubmit={handleSubmit} className="mb-5">
        <p className="text-muted text-center">
          <small>Fields marked * are required</small>
      </p>

        <div className="form-group mb-3">
          <label htmlFor="category">*Category</label>
          <CategoriesSelect handleChange={handleChange} values={values} />
        </div>

        <div className="form-group mb-3">
          <label>Tags</label>
          <TagsSelect setValues={setValues} values={values} />
        </div>

        <div className="form-group mb-3">
          <label>*Title</label>
          <Form.Control
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </div>

        <div className="form-group mb-3">
          <label>Description</label>
          <Form.Control
            as="textarea" 
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
        </div>

        <Button type="submit" variant='primary' className="col-12">Submit</Button>
    </Form>
  )
}

export default ItemForm