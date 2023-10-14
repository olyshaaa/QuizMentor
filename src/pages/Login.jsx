import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = userCredential.user
      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      navigate("/")

    } catch (error) {
      console.log(error)
      if(error.code === "auth/invalid-login-credentials"){
        alert("Invalid email or password. Check this information or make sure you are registered ")
      }else{
        alert("An error occurred while logging in. We are already working on fixing the problem.")
      }
    }
  }
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className='login-form'>
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
        <button type='sumbit' className='login-button'>Login</button>

      </form>
       <p>Need to Signup ? <Link to='/signup'>Create an account</Link></p>

    </div>
  )
}

export default Login