import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
      <div className='App'>
        <Outlet />
      </div>

    </>
  )
}

export default App
