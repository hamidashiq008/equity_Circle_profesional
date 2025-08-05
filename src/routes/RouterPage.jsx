import React from 'react';
import RegisterPage from '../features/auth/RegisterPage';
import LoginPage from '../features/auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import UserProfile from '../features/user/UserProfile'
import Home from '../pages/Home';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Education from '../pages/Education';
import Joblist from '../pages/Joblist';
import Feeds from '../pages/Feeds';
import EventCalendar from '../pages/EventCalendar';

const RouterPage = () => {
    return (
        <div>
            <Routes>

                <Route element={<AuthLayout />}>
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/login/:moiveId' element={<LoginPage />} />

                </Route>

                {/* Private Routes */}
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/feeds' element={<Feeds />} />
                    <Route path='/education' element={<Education />} />
                    <Route path='/joblist' element={<Joblist />} />
                    <Route path='/event-calendar' element={<EventCalendar />} />
                    <Route path='/userProfile' element={<UserProfile />} />

                </Route>

            </Routes>
        </div>
    )
}

export default RouterPage
