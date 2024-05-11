import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './users/pages/Home'

import SignUp from './users/components/authentication/users/Signup'

import Login from './users/components/authentication/users/Login'
import Blog from './users/pages/Blog'

import SingleBlog from './users/pages/SingleBlog'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/single-blog' element={<SingleBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
