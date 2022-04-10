import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const AdminIndexPage = () => {
  //VALUES
  



  //RENDER
  return (
    <div className='container'>
        <h1 className='text-center my-5'>Admin Page</h1>

        <h6 className='mb-5 text-center'>As admin you can do CRUD operations with the following:</h6>

        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <Link to='/admin/categories'>
                    <Button variant='dark' className='col-12 m-1'>Categories</Button>
                </Link>

                <Link to='/admin/tags'>
                    <Button variant='dark' className='col-12 m-1'>Tags</Button>
                </Link>

                <Link to='/admin/items'>
                    <Button variant='dark' className='col-12 m-1'>Items</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminIndexPage