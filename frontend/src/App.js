import {BrowserRouter,Routes,Route } from "react-router-dom"


import "./App.css"
import Home from './users/pages/Home'

const App = () => {
  return (
    <div className='app'>
      <Home/>
    </div>
  )
}

export default App
