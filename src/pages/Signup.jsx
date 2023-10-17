import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'
import {getDatabase, ref, set} from 'firebase/database'
import style from './style.module.scss'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  function generateRandomNumber() {
    return Math.floor(Math.random()*900000) + 100000
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = userCredential.user

      const customUid = user.uid;

      const userdata = {
        email: user.email,
        uid: customUid,
        username: username
      }

      if (user) {
        const db = getDatabase();

        const userRef = ref(db, `users/${customUid}`);

        await set(userRef, userdata);
      }

      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(userdata))
      navigate("/")

    } catch (error) {
      console.log(error)
      if(error.code === "auth/weak-password"){
        alert("Password should be at least 6 characters")
      } else if(error.code === "auth/email-already-in-use"){
        alert("This email is already in use.")
      }
      else{
        alert("An error occurred while logging in. We are already working on fixing the problem.")
      }
    }
  }
  return (
    <div className={style.wrapper}>
      <h2>QuizMentor</h2>
      <h1 className={style.title}>Signup</h1>
      <form onSubmit={handleSubmit} className={style.signup}>
        <input type="text" placeholder='Your name/nickname'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}

        />
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