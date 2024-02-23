import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Layout from './components/Layout'
import Userinfo from './components/Userinfo'
import AuthState from './context/auth/AuthState'


function App() {

  return (
    <>
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Layout><Home/></Layout>} />
            <Route exact path="/register" element= {<Layout><Register/></Layout>} />
            <Route exact path="/login" element={<Layout><Login/></Layout>} />
            <Route exact path="/user" element={<Layout><Userinfo/></Layout>} />
            <Route exact path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
        </AuthState>
    </>
  )
}

export default App
