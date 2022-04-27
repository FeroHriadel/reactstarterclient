import React, { useState, useContext } from 'react';
import EmailPasswordForm, { formValues } from '../components/forms/EmailPasswordForm';
import { Link } from 'react-router-dom';
import { checkEmail } from '../helpers/checkEmail';
import { Alert, Spinner } from 'react-bootstrap';
import RedirectLoggedUsers from '../components/RedirectLoggedUsers';
import { UserContext } from '../context/userContext';
import { signin, saveUserAndToken } from '../actions/userActions';




const LoginPage: React.FC = () => {
    //VALUES
    const { login } = useContext(UserContext);
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
        signin(values)
            .then(data => {
                setLoading(false);
                if (data && data.error) {
                    setMessage(data.error);
                } else {
                    saveUserAndToken(data.user, data.token); //save {user} in LS, token in cookies
                    login({user: data.user, token: data.token}); //dispatch to userContext
                    setMessage('You are in!. Redirecting...');
                    setLoading(true); //nothing is loading but I need to hide the submit button
                }
            })
    }



    //RENDER
    return (
        <div className='container'>
            <RedirectLoggedUsers />

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
                <div className='row'>
                    <div className='text-center col-md-6 offset-md-3'>
                        <Alert variant='primary' className='text-center'>{message}</Alert>
                    </div>
                </div>
            }

            <div className='text-center'>
                <p style={{margin: 0, padding: 0}}>Don't have an account? <Link to='/signup' style={{textDecoration: 'none'}}><span className='text-muted'>Sign up</span></Link> </p>
                <p style={{margin: 0, padding: 0}}>Forgot your password? <Link to='/forgotpassword' style={{textDecoration: 'none'}}><span className='text-muted'>Click here</span></Link> </p>
            </div>
        </div>
    )
}



export default LoginPage;