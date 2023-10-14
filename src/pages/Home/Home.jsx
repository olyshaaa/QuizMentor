import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = async () =>{
    await signOut(auth)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/login")
  }
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home