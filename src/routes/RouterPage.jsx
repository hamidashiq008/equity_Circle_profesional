import React from 'react';
import RegisterPage from '../features/auth/RegisterPage';
import LoginPage from '../features/auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import UserProfile from '../features/user/UserProfile'
import Home from '../pages/Home';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Education from '../pages/education/Education';
import Joblist from '../pages/Joblist';
import Feeds from '../pages/feeds/Feeds';
import EventCalendar from '../pages/EventCalendar';
import FeedsDetails from '../pages/feeds/FeedsDetails';
import EducationDetails from '../pages/education/EducationDetails';
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
                    <Route path="/feeds/:id" element={<FeedsDetails />} />
                    <Route path='/education' element={<Education />} />
                    <Route path='/education/:id' element={<EducationDetails />} />

                    <Route path='/joblist' element={<Joblist />} />
                    <Route path='/event-calendar' element={<EventCalendar />} />
                    <Route path='/userProfile' element={<UserProfile />} />
                </Route>

            </Routes>
        </div>
    )
}

export default RouterPage
