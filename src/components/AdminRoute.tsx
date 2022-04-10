import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Outlet, Link } from 'react-router-dom';



const AdminRoute = () => {
  //VALUES
  const { user } = useContext(UserContext);



  //RENDER
  return user && user.user && user.user.role && user.user.role === 'admin'
    ?
    <Outlet />
    :
    <div className='container'>
        <h1 className='text-center my-5'>Access Denied</h1>
        <Link to='/' style={{textDecoration: 'none'}}>
            <p className='text-center'>Go Home</p>
        </Link>
    </div>
}

export default AdminRoute