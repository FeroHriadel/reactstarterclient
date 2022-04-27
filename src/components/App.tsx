import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserContextProvider from '../context/userContext';

import '../styles/bootstrap.min.css';
import '../styles/index.scss';

import MainNav from './MainNav';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProtectedRoute from './ProtectedRoute';
import UserdetailsPage from '../pages/UserdetailsPage';

import AdminRoute from './AdminRoute';
import AdminIndexPage from '../pages/AdminIndexPage';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import CategoryPage from '../pages/AdminCategoryPage';
import AdminTagsPage from '../pages/AdminTagsPage';
import AdminTagPage from '../pages/AdminTagPage';

import ItemsPage from '../pages/ItemsPage';
import ItemAddPage from '../pages/ItemAddPage';

import WebComponentPage from '../pages/WebComponentPage';





function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
      
        <MainNav />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          <Route path='/userdetails' element={<ProtectedRoute />}>
            <Route path='/userdetails' element={<UserdetailsPage />} />
          </Route>

          <Route path='/admin' element={<AdminRoute />}>
            <Route path='/admin' element={<AdminIndexPage />} />
            <Route path='/admin/categories' element={<AdminCategoriesPage />} />
            <Route path='/admin/categories/:slug' element={<CategoryPage />} />
            <Route path='/admin/tags' element={<AdminTagsPage />} />
            <Route path='/admin/tags/:slug' element={<AdminTagPage />} />
          </Route>

          <Route path='/items' element={<ItemsPage />} />
          <Route path='/items/additem' element={<ProtectedRoute />}>
            <Route path='/items/additem' element={<ItemAddPage />} />
          </Route>

          <Route path='/webcomponent' element={<WebComponentPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
