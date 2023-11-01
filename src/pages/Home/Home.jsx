import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import Header from './Header/header'
import Add from './Add'



const Home = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');


  console.log("home username: " + username)


  const handleLogout = async () =>{
    await signOut(auth)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/login")
  }
  return (
    <div>
      <Header username={username} handleLogout={handleLogout} />
      <Add />
    </div>
  )
}

export default Home