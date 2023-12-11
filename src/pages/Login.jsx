import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './style.module.scss'
import Home from './Home/Home.jsx'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:8080/j_spring_security_check',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({
          login: email,
          password: password,
        }),
        //credentials: 'include',
      })

      if(response.ok){
        console.log('Login successful')
        //localStorage.setItem('username', responsedata.username)
        // тут нужно перенаправить на другую страницу
        navigate("/home")
      }else{
        console.log('Login failes')
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
        <input type="email"
        placeholder='Your email'
        required
        value={email}
        name="login"
        onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password"
        placeholder='Your password'
        required
        value={password}
        name="password"
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button type='sumbit' className='login-button'>Login</button>

      </form>
       <p>Need to Signup ? <Link to='/signup'>Create an account</Link></p>

    </div>
  )
}

export default Login