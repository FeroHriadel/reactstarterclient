import { RecordWithTtl } from 'dns';
import React from 'react';
import { Form, Button } from 'react-bootstrap';



//TYPES
export interface formValues {
    email: string;
    password: string;
}



//COMPONENT
const EmailPasswordForm: React.FC<{values: formValues; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void}> = ({values, handleChange, handleSubmit}) => {
    //VALUES
    const {email, password} = values;



    //RENDER
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter email"
                    value={email}
                    name='email'
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter password"
                    value={password}
                    name='password'
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className='col-12'>
                Submit
            </Button>
        </Form>
    )
}

export default EmailPasswordForm

