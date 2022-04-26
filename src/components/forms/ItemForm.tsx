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
        <CategoriesSelect />
    </Form>
  )
}

export default ItemForm