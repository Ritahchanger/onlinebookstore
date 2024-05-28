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

import WishList from './users/pages/WishList'

import Account from './users/pages/Account/Account'

import Profile from './users/pages/Account/Profile'

import MyBooks from './users/pages/Account/MyBooks'

import PendingApprovals from './users/pages/Account/PendingApprovals'

import BooksRead from './users/pages/Account/BooksRead'

import Publishing from './users/pages/Account/Publishing'

import EditingAndPublishing from './users/pages/Account/EditingAndPublishing'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
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
                <CategoriesNavbar />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/check-out'
            element={
              <ProtectedRoutes>
                <Checkout />
              </ProtectedRoutes>
            }
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<PasswordChanging />} />
          <Route
            path='/shop'
            element={
              <ProtectedRoutes>
                <Shop />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/wish-list'
            element={
              <ProtectedRoutes>
                <WishList />
              </ProtectedRoutes>
            }
          />

          <Route path='/account' element={<Account />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route path='/approvals' element={<PendingApprovals />} />
          <Route path='/books-read' element={<BooksRead />} />
          <Route path='/publishing' element={<Publishing />} />
          <Route path='/editing-publishing' element={<EditingAndPublishing/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
