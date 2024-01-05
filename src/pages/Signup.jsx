import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './style.module.scss'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [usernameInuse, setUsernameInuse] = useState(false)

  const navigate = useNavigate()

    const handleSubmit = async (e) =>{
    e.preventDefault();
     try{
      const response = await fetch("https://quizmentorbackend.onrender.com/newuser", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
          email: email,
        }),
      })

      if(response.ok){
       localStorage.setItem('username', username)
      navigate('/login')
      }else if (response.status === 409){
        setUsernameInuse(true)
      }
    }catch(e){
      console.log('Registration failes:', e)
    }
  }

  return (
    <div className={style.wrapper}>
      <h2>QuizMentor</h2>
      <h1 className={style.title}>Signup</h1>
      <form onSubmit={handleSubmit}  className={style.signup}>
        <input type="text" placeholder='Your name/nickname'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}

        />
        <p className={usernameInuse ? style.usernameInUse : style.hidden}>this username is already in use</p>
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