import React from 'react';
import RegisterPage from '../features/auth/RegisterPage';
import LoginPage from '../features/auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import UserProfile from '../features/user/UserProfile'
import Home from '../pages/Home';

const RouterPage = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/userProfile' element={<UserProfile />} />

            </Routes>
        </div>
    )
}

export default RouterPage
