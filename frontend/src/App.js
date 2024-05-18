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

import Shop from './users/pages/Shop'

import ProtectedRoutes from './users/components/authentication/users/ProtectedRoutes'

import CategoriesNavbar from './users/components/navigation/CategoriesNavbar'

import Checkout from './users/components/cart/Checkout'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/home'
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route
            path='/blog'
            element={
              <ProtectedRoutes>
                <Blog />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/single-blog'
            element={
              <ProtectedRoutes>
                <SingleBlog />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/authors'
            element={
              <ProtectedRoutes>
                <Authors />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/:id'
            element={
              <ProtectedRoutes>
                <BookByAuthor />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/cart'
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/categories'
            element={
              <ProtectedRoutes>
                <CategoriesNavbar/>
              </ProtectedRoutes>
            }
          />
          <Route
            path='/check-out'
            element={
              <ProtectedRoutes>
                <Checkout/>
              </ProtectedRoutes>
            }
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<PasswordChanging />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
