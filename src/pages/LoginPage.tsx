import React, { useState } from 'react';
import EmailPasswordForm, { formValues } from '../components/forms/EmailPasswordForm';
import { Link } from 'react-router-dom';
import { checkEmail } from '../helpers/checkEmail';
import { Alert, Spinner } from 'react-bootstrap';




const LoginPage: React.FC = () => {
    //VALUES
    const [values, setValues] = useState<formValues>({email: '', password: ''});
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { email, password } = values;



    //HANDLERS
    const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        setMessage('');
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = e => {
        e.preventDefault();
        if (password.trim() === '') return setMessage('Please, enter password');
        if (!checkEmail(email)) return setMessage('Please, enter a valid email');

        setLoading(true);
        
        console.log(values);
    }



    //RENDER
    return (
        <div className='container'>
            <h1 className='text-center my-5'>Login</h1>

            <div className='row mb-5'>
                <div className='col-md-6 offset-md-3'>
                    {
                        loading
                        ?
                        <div className='text-center'>
                            <Spinner animation="border" />
                        </div>
                        :
                        <EmailPasswordForm values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
                    }
                </div>
            </div>

            {
                message
                &&
                <Alert variant='primary' className='text-center'>{message}</Alert>
            }

            <div className='text-center'>
                <p style={{margin: 0, padding: 0}}>Don't have an account? <Link to='/signup' style={{textDecoration: 'none'}}><span className='text-muted'>Sign up</span></Link> </p>
                <p style={{margin: 0, padding: 0}}>Forgot your password? <Link to='/forgotpassword' style={{textDecoration: 'none'}}><span className='text-muted'>Click here</span></Link> </p>
            </div>
        </div>
    )
}

export default LoginPage;