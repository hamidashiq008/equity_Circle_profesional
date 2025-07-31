import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import RegisterPage from './features/auth/RegisterPage'
import RouterPage from './routes/RouterPage' 

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <RouterPage />
    </>
  )
}

export default App
