import React, { useEffect, useState } from 'react'
import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { getDatabase, ref, onValue, set } from "firebase/database";
import style from './style.module.scss'


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [incorrectMessage, setIncorrectMessage] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password, username).then(data => {
      updateProfile(auth.currentUser, {
        displayName: username
      }).then(() => {
        const uid = auth.currentUser.uid;
        const userDataRef = ref(getDatabase(), `UserData/${uid}`);
        const userData = {
          username: username,
          email: email,
        };
        set(userDataRef, userData)
          .then(() => {
            console.log("User data successfully written!");
            console.log(auth.currentUser.uid)
            navigate('/login');
          })
          .catch(error => {
            console.error("Error writing user data: ", error);
            setIncorrectMessage('An error occurred while signing up.');
          });
      });
    }).catch(error => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setIncorrectMessage('The email address is already in use.');
          break;
        case 'auth/weak-password':
          console.log('catch!')
          setIncorrectMessage('The password is too weak.');
          break;
        default:
          setIncorrectMessage('An error occurred while signing up.');
      }
    })
  }


  return (
    <div className={style.wrapper}>
      <h2>QuizMentor</h2>
      <h1 className={style.title}>Signup</h1>
      <form onSubmit={e => handleSubmit(e)}  className={style.signup}>
         <input type="text" placeholder='Your name/nickname'
        required
        value={username}
        name='username'
        onChange={(e) => setUsername(e.target.value)}
        />
        <input type="email"
        placeholder='Your email'
        required
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password"
        placeholder='Your password'
        required
        name='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <p className={incorrectMessage ? style.usernameInUse : style.hidden}>{incorrectMessage}</p>
        <button type='sumbit' className='signup-button'>Signup</button>

      </form>
       <p>Need to Login ? <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Signup