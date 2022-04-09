import React, { useState, useEffect } from 'react';
import { getUserAndToken, removeCookie } from '../actions/userActions';



export type UserDetails = {
  _id: string;
  email: string;
  role: string;
}

type UserState = {
  user: UserDetails | null;
  token: string | undefined;
}

type UserContextObj = {
  user: UserState | null;
  login: (userDetails: UserState) => void;
  logout: () => void;
}



export const UserContext = React.createContext<UserContextObj>({
  user: null,
  login: () => {},
  logout: () => {}
})



const UserContextProvider: React.FC = (props) => {
  const [user, setUser] = useState<UserState | null>(null);

  const loginHandler = (userDetails: UserState) => {
    setUser(userDetails);
  }

  const logoutHandler = () => {
    setUser(null);
    removeCookie('token');
  }

  const contextValue: UserContextObj = {
    user,
    login: loginHandler,
    logout: logoutHandler
  }

  useEffect(() => {
    const userWithToken = getUserAndToken();
    if (userWithToken) {
      // delete userWithToken.token;    //actually, I want the token in the state
      setUser(userWithToken);
    }
  }, [])

  return <UserContext.Provider value={contextValue}>
    {props.children}
  </UserContext.Provider>
}



export default UserContextProvider;