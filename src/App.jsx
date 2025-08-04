import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import RegisterPage from './features/auth/RegisterPage'
import RouterPage from './routes/RouterPage'
import UserDetail from './features/user/UserDetail'

function App() {
  return (
    <>
      <UserDetail />
      <RouterPage />
    </>
  )
}

export default App
