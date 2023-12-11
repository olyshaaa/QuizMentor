import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/header'
import Add from './Add'



const Home = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');


  console.log("home username: " + username)


  const handleLogout = async () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('username')
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