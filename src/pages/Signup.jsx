import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = userCredential.user
      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      navigate("/")

    } catch (error) {
      console.log(error)
      if(error.code === "auth/weak-password"){
        alert("Password should be at least 6 characters")
      }
      else{
        alert("An error occurred while logging in. We are already working on fixing the problem.")
      }
    }
  }
  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input type="email"
        placeholder='Your email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password"
        placeholder='Your password'
        required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button type='sumbit' className='signup-button'>Signup</button>

      </form>
       <p>Need to Login ? <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Signup