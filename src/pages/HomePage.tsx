import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const HomePage: React.FC = () => {
    //VARIABLES
    const navigate = useNavigate();



    //RENDER
    return (
        <div className='home-page'>
            <div className='container'>
                <h1 className='my-5 text-center'>HomePage</h1>

                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <Button variant="primary" className='col-12 m-1' onClick={() => navigate('/login')}>Login</Button>
                        <Button variant="primary" className='col-12 m-1' onClick={() => navigate('/admin')}>Admin</Button>
                        <Button variant="primary" className='col-12 m-1' onClick={() => navigate('/categories')}>Categories</Button>
                        <Button variant="primary" className='col-12 m-1' onClick={() => navigate('/items')}>Items</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage