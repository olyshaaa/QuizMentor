import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import style from './style.module.scss'
import Home from './Home/Home.jsx'
const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [incorrectMessage, setIncorrectMessage] = useState(false)

  const urlParams = new URLSearchParams(window.location.search);
  const errorParam = urlParams.get('error');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch('https://quizmentorbackend.onrender.com/j_spring_security_check',{
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          login: login,
          password: password,
        }),
      })

      if(response.status === 200){
       localStorage.setItem("username", login)
       localStorage.setItem('authenticated', 'true');
        navigate("/home")
      }else if(response.status === 401){
        setIncorrectMessage(true)
      }
    }catch(e){
      console.log("Login failes:", e)
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
        <p className={incorrectMessage ? style.usernameInUse : style.hidden}>username or password is incorrect</p>
        <button type='sumbit' className='login-button'>Login</button>

      </form>
       <p>Need to Signup ? <Link to='/signup'>Create an account</Link></p>
       {errorParam && <p>Wrong username or password</p>}
    </div>
  )
}

export default Login