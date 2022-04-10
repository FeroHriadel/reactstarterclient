import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { getLoggedInUser } from '../actions/userActions';



const UserdetailsPage = () => {
  //VALUES
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({email: '', _id: '', createdAt: '', updatedAt: '', role: ''});
  const [message, setMessage] = useState('Loading...');



  //GET USER'S DATA FROM DB
  useEffect(() => {
    getLoggedInUser(user!.token!)
        .then(data => {
            if (data && data.error) return setMessage(data.error)
            else {
                setMessage('');
                setUserDetails(data.user);
            }
        })
  }, [user])




  //RENDER
  return (
    <div className='container'>
      <h1 className='my-5 text-center'>My Details</h1>

      {
          message && <p className='text-center'>{message}</p>
      }

      {
          !message && userDetails
          &&
          <div>
              <p>You can display user details nicely here but I'm not gonna. This template is about functionality, not styling</p>
              <p><small>{JSON.stringify(userDetails)}</small></p>
          </div>
      }

    </div>
  )
}

export default UserdetailsPage