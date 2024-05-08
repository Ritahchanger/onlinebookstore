import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css'
import Home from './users/pages/Home'



import Login from './users/components/authentication/users/Login'


const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
