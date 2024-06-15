import React from 'react'
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
import BooksRead from './users/pages/Account/BooksRead'
import Publishing from './users/pages/Account/Publishing'
import EditingAndPublishing from './users/pages/Account/EditingAndPublishing'
import PaymentDetails from './users/pages/Account/PaymentDetails'
import PendingApprovals from './users/pages/Account/PendingApprovals'
import Logout from './users/components/authentication/users/Logout'
import ShopCategories from './users/pages/ShopCategories'
import About from './users/pages/About'
import Complete_payment from './users/pages/Complete_payment'
import CancelOrder from './users/pages/CancelOrder'
import { useSelector } from 'react-redux'
import AutoLogoutHandler from './users/components/authentication/users/AutoLogoutHandler'

// ADMIN ROUTES
import UnapprovedBooks from './administration/pages/UnapprovedBooks'
import AllBooksAdministration from './administration/pages/AllBooksAdministration'
import BlogsAdministration from './administration/pages/BlogsAdministration'
import TerminationAdministration from './administration/pages/TerminationAdministration'
import UsersAdministration from './administration/pages/UsersAdministration'
import AdminAuthors from './administration/pages/AdminAuthors'
import AdminNewsLetter from './administration/pages/AdminNewsLetter'
//

const App = () => {
  const user = useSelector(state => state.auth.user)

  return (
    <div className='app'>
      <BrowserRouter>
        {user && <AutoLogoutHandler user={user} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:userId' element={<SingleBlog />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/authors/books/:id' element={<BookByAuthor />} />

          <Route path='/categories' element={<CategoriesNavbar />} />
          <Route path='/check-out' element={<Checkout />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/change-password/:email'
            element={<PasswordChanging />}
          />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:category' element={<ShopCategories />} />
          <Route path='/wish-list' element={<WishList />} />
          <Route
            path='/account'
            element={
              <ProtectedRoutes>
                <Account />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/profile/:currentEmail/user_id/:userId'
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/mybooks'
            element={
              <ProtectedRoutes>
                <MyBooks />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/approvals'
            element={
              <ProtectedRoutes>
                <PendingApprovals />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/books-read'
            element={
              <ProtectedRoutes>
                <BooksRead />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/publishing'
            element={
              <ProtectedRoutes>
                <Publishing />
              </ProtectedRoutes>
            }
          />
          <Route path='/complete-order' element={<Complete_payment />} />
          <Route path='/cancel-order' element={<CancelOrder />} />
          <Route
            path='/editing-publishing'
            element={
              <ProtectedRoutes>
                <EditingAndPublishing />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/pending-payments'
            element={
              <ProtectedRoutes>
                <PaymentDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/logout'
            element={
              <ProtectedRoutes>
                <Logout />
              </ProtectedRoutes>
            }
          />

          {/* ADMINISTRATION */}

          <Route
            path='/admin/unapproved'
            element={
              <ProtectedRoutes>
                <UnapprovedBooks />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/blogs'
            element={
              <ProtectedRoutes>
                <BlogsAdministration />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/termination-accounts'
            element={
              <ProtectedRoutes>
                <TerminationAdministration />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/users'
            element={
              <ProtectedRoutes>
                <UsersAdministration />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/all-books'
            element={
              <ProtectedRoutes>
                <AllBooksAdministration />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/authors'
            element={
              <ProtectedRoutes>
                <AdminAuthors />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/admin/newsletter'
            element={
              <ProtectedRoutes>
                <AdminNewsLetter />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
