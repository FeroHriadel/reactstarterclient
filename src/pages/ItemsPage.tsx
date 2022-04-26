import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';



export interface Item {
    category: string,
    tags: string[],
    title: string,
    description: string
}



const ItemsPage = () => {
  //VALUES
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  


  //RENDER
  return (
    <div className='container'>
        <h1 className="my-5 text-center">ITEMS PAGE</h1>

        {
            user && user.token
            &&
            <div className="row">
                <div className='col-md-6 offset-md-3'>
                    <Button className="col-12" variant='dark' onClick={() => navigate('/items/additem')}>Add Item</Button>
                </div>
            </div>
        }

    </div>
  )
}

export default ItemsPage