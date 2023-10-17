import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'
import {getDatabase, ref, set} from 'firebase/database'
import style from './style.module.scss'
import { get, child } from 'firebase/database';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const database = getDatabase()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const userId = user.uid
      const userRef = ref(getDatabase(), `users/${userId}`)

      const usernameSnapshot = await get(userRef)

      if (usernameSnapshot.exists()) {
        const userData = usernameSnapshot.val()
        const username = userData.username;
        console.log("username from database", username);

        localStorage.setItem('token', user.accessToken)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('username', username)

        navigate("/")
      } else {
        alert("The user was not found in the database.")
      }
    } catch (error) {
      console.log(error)
      if (error.code === "auth/invalid-login-credentials") {
        alert("Incorrect email address or password. Check this information or make sure you are registered.")
      } else {
        alert("An error occurred while logging in. We are already working to fix it.")
      }
    }
  }


  return (
    <div className={style.wrapper}>
      <h2>QuizMentor</h2>
      <h1 className={style.title}>Login</h1>
      <form onSubmit={handleSubmit} className={style.signup}>
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