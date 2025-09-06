import React from 'react';
import './App.scss' 
import RouterPage from './routes/RouterPage'
import UserDetail from './features/user/UserDetail'
import '@fortawesome/fontawesome-free/css/all.min.css'; // ✅ Make sure this is NOT commented
import ToastProvider from './components/ReactToastify';   

function App() {
  return (
    <>
      <UserDetail />
      <RouterPage />
      <ToastProvider />
    </>
  )
}

export default App
