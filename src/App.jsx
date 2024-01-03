import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  useEffect(()=>{
    navigate('/login')
  }, [navigate])
  return (
    <>
      <div className='App'>
        <Outlet />
      </div>

    </>
  )
}

export default App
