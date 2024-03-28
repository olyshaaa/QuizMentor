import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'


import style from './style.module.scss'

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [incorrectMessage, setIncorrectMessage] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkbox = document.getElementById('rememberme')
    if (checkbox.checked){
      await setPersistence(auth, browserLocalPersistence)
      .then (data=> {
        console.log('persistence')
        signInWithEmailAndPassword(auth, login, password)
        navigate('/home')
      })
    } else {
      signInWithEmailAndPassword(auth, login, password).then(data => {
        navigate('/home')
      }).catch(error => {
        switch(error.code){
          case 'auth/invalid-credential':
            setIncorrectMessage('Invalid email or password')
          case 'auth/too-many-requests':
            setIncorrectMessage('Too many tries')
          default:
          setIncorrectMessage('Failed to login')
          console.log(error.code + ' error code')
        }
      })
    }
  }

  return (
    <div className={style.wrapper}>
      <h2>QuizMentor</h2>
      <h1 className={style.title}>Login</h1>
      <form onSubmit={handleSubmit} className={style.signup}>
        <input type="text"
        placeholder='Username'
        required
        value={login}
        name="username"
        onChange={(e) => setLogin(e.target.value)}
        />
        <input type="password"
        placeholder='Your password'
        required
        value={password}
        name="password"
        onChange={(e)=>setPassword(e.target.value)}
        />
        <p className={incorrectMessage ? style.usernameInUse : style.hidden}>{incorrectMessage}</p>
        <label htmlFor="rememberme" className={style.rememberMe}>
          <input type="checkbox" id='rememberme' name='rememberme' className={style.inputRememberMe}/>
          remember me
          </label>
        <button type='sumbit' className='login-button'>Login</button>

      </form>
       <p>Need to Signup ? <Link to='/signup'>Create an account</Link></p>
    </div>
  )
}

export default Login