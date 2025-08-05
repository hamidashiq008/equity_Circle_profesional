// components/Layout/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <div className="auth-layout" style={{   maxWidth: '400px', margin: '0 auto' }}>
       <Outlet />
    </div>
  );
};

export default AuthLayout;
