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

import PaymentDetails from './users/pages/Account/PaymentDetails'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:userId' element={<SingleBlog />} />
          <Route path='/authors' element={<Authors />} />


          <Route path='/authors/:id' element={<BookByAuthor />} />


          <Route path='/cart' element={<Cart />} />
          <Route path='/categories' element={<CategoriesNavbar />} />
          <Route path='/check-out' element={<Checkout />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<PasswordChanging />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/wish-list' element={<WishList />} />
          <Route path='/account' element={<Account />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route path='/approvals' element={<PendingApprovals />} />
          <Route path='/books-read' element={<BooksRead />} />
          <Route path='/publishing' element={<Publishing />} />
          <Route
            path='/editing-publishing'
            element={<EditingAndPublishing />}
          />
          <Route path='/pending-payments' element={<PaymentDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
