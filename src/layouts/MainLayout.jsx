

import React, { useState } from 'react';
import Sidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="main-layout">
      <Header toggleValue={toggleSidebar}>
        <div className="inner-layout">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default MainLayout;

