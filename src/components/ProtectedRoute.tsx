import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Navigate, Outlet } from 'react-router-dom';



const ProtectedRoute = () => {
  //VALUES
  const { user } = useContext(UserContext);



  //RENDER
  return user && user.user
    ?
    <Outlet />
    :
    <Navigate to='/login' />
}

export default ProtectedRoute