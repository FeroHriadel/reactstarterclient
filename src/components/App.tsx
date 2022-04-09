import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserContextProvider from '../context/userContext';

import '../styles/bootstrap.min.css';

import MainNav from './MainNav';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ItemsPage from '../pages/ItemsPage';



function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <MainNav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/items' element={<ItemsPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
