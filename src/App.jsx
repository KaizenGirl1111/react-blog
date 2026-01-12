
import './App.css'
import AddBlog from './components/AddBlog'
import AllBlogs from './components/AllBlogs'
import Home from './components/Home'
import ProtectedRouteCookie from './components/ProtectedRouteCookie'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import TestBootstrap from './components/TestBootstrap'
import { Routes,Route } from 'react-router-dom'
function App() {

  return (
    <>
    {/* <TestBootstrap/> */}
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<SignIn/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route exact path='/add-blog' element={<ProtectedRouteCookie><AddBlog/></ProtectedRouteCookie>}/>
     <Route path='/all-blogs' element={<ProtectedRouteCookie><AllBlogs/></ProtectedRouteCookie>}/>
    </Routes>
    </>
  )
}

export default App
