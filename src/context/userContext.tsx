import React, { useState } from 'react';



export type UserDetails = {
  _id: string;
  email: string;
  role: string;
}

type UserState = {
  user: UserDetails | null;
  token: string;
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
  }

  const contextValue: UserContextObj = {
    user,
    login: loginHandler,
    logout: logoutHandler
  }

  return <UserContext.Provider value={contextValue}>
    {props.children}
  </UserContext.Provider>
}



export default UserContextProvider;