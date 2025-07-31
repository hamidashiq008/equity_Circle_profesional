import React from 'react'
import RegisterPage from '../features/auth/RegisterPage'
import LoginPage from '../features/auth/LoginPage'
import { Route, Routes } from 'react-router-dom'

const RouterPage = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/LoginPage' element={<LoginPage />} />
                {/* <Route path='/PrivatePage' element={<PrivatePage />} /> */}
            </Routes>
        </div>
    )
}

export default RouterPage
