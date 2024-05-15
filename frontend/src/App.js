import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './users/pages/Home'

import SignUp from './users/components/authentication/users/Signup'

import Login from './users/components/authentication/users/Login'
import Blog from './users/pages/Blog'

import SingleBlog from './users/pages/SingleBlog'

import Authors from './users/pages/Authors'

import BookByAuthor from './users/components/Books/BookByAuthor'

import Cart from './users/components/cart/Cart'


import ForgotPassword from './users/components/authentication/users/ForgotPassword'

import PasswordChanging from './users/components/authentication/users/PasswordChanging'

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
          <Route path='/authors' element={<Authors />} />
          <Route path='/:id' element={<BookByAuthor />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/change-password' element={<PasswordChanging/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
