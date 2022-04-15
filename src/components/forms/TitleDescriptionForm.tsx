import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { AddCategoryFormValues } from '../../pages/AdminCategoriesPage';



const TitleDescriptionForm: React.FC<{values: AddCategoryFormValues; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ values, handleChange, handleSubmit }) => {
  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <br />
                <Form.Text className="text-muted">
                    Title is required. Max. 30 characters
                </Form.Text>
                <Form.Control 
                    type="text" 
                    placeholder="Name" 
                    maxLength={30} 
                    name='title' 
                    value={values.title} onChange={handleChange} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="Description" 
                    name='description' 
                    value={values.description} 
                    onChange={handleChange} 
                />
            </Form.Group>

            <Button variant="primary" type="submit" className='col-12'>
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default TitleDescriptionForm