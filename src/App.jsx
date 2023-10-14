import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './firebase/auth'

function App() {


  return (
    <>
      <h1><AuthProvider /></h1>

    </>
  )
}

export default App
