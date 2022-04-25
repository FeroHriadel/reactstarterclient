import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ExpandingCards from '../components/webcomponents/ExpandingCards';



const HomePage: React.FC = () => {
    //VARIABLES
    const navigate = useNavigate();
    const [cardsBg, setCardsBg3] = useState('transparent')



    //RENDER
    return (
        <div className='home-page'>
            <div className='webcomponent-wrapper' style={{width: '100%', height: '200px'}}>
                <ExpandingCards cardsBg={cardsBg} />
            </div>

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