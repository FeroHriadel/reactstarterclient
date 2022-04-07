import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';



const RedirectLoggedUsers: React.FC = () => {
    //VALUES
    const { user, login, logout } = useContext(UserContext);
    const navigate = useNavigate();



    //REDIRECT LOGGED-IN USERS AWAY
    useEffect(() => {
        if (user && user.user && user.user.email) {
            setTimeout(() => {navigate('/')}, 1000);
        }
    }, [user])


    //RENDER
    return (
        <div></div>
    )
}

export default RedirectLoggedUsers