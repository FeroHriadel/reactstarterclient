import React, { useState } from 'react';
import EmailPasswordForm, { formValues } from '../components/forms/EmailPasswordForm';
import { Link } from 'react-router-dom';
import { checkEmail } from '../helpers/checkEmail';
import { Alert, Spinner } from 'react-bootstrap';
import { signup } from '../actions/userActions';



const SignupPage: React.FC = () => {
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
      signup(values)
        .then(data => {
          setLoading(false);
          if (data && data.error) {
            setMessage(data.error);
          } else {
            setMessage('Thank you for signing up. Redirecting...')
            setLoading(true); //nothing is loading but I need to hide the submit button
          }
        })
      
  }



  //RENDER
  return (
    <div className='container'>
      <h1 className='text-center my-5'>Sign up</h1>

      <div className='row mb-3'>
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

      {
        !loading
        &&
        <div className='text-center'>
          <p style={{margin: 0, padding: 0}}>Have an account? <Link to='/login' style={{textDecoration: 'none'}}><span className='text-muted'>Log in</span></Link> </p>
        </div>
      }

    </div>
  )
}

export default SignupPage