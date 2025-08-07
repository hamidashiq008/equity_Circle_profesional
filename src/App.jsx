
import './App.scss' 
import RouterPage from './routes/RouterPage'
import UserDetail from './features/user/UserDetail'
import '@fortawesome/fontawesome-free/css/all.min.css'; // ✅ Make sure this is NOT commented



function App() {
  return (
    <>
      <UserDetail />
      <RouterPage />
    </>
  )
}

export default App
