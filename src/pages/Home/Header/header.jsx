import React, { useState, useEffect, useContext } from 'react'
import style from './header.module.scss'
import Search from './search/search'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../firebase/firebase'
import { signOut } from 'firebase/auth'
import { Context } from '../../../firebase/authContext'

const Header = () => {
  const {user} = useContext(Context)
  console.log(user)
  const username = user ? user.displayName : "";
  console.log('from header' + user.uid)
  localStorage.setItem('uid', user.uid)

  const [showOption, setShowOption] = useState(false)
  // profile menu but for mobiles
  const [showBar, setShowBar] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(data => {
      navigate('/login')
    })
  }

  const handleLogoClick = () =>{
    navigate("/home")
  }

  const handleCommunityClick = () =>{
    navigate("/community")
  }

  const handleUsernameClick = () =>{
    setShowOption(!showOption)
  }

  //fixing selecting username when click
  useEffect(()=>{
    const usernameDom = document.getElementById('username')

    usernameDom.addEventListener('contextenu', e =>{
    e.preventDefault()
  })

    usernameDom.addEventListener('selectstart', e=>{
    e.preventDefault()

  })
  }, [])


  return (
    <header>
      <h1 onClick={handleLogoClick} className={style.h1Title}>QuizMentor</h1>
      <h1 onClick={handleLogoClick} className={style.h1Adapt}>Q</h1>
      <p onClick={handleCommunityClick} className={style.community}>Community</p>
      <Search />
      <div className={style.user}>
      <div className={style.username} onClick={handleUsernameClick} id='username'>{username}</div>
        {showOption && (
          <div className={style.optionmenu}>
          <p onClick={handleLogout}>logout</p>
        </div>
        )}
      </div>
      <FontAwesomeIcon icon={faBars} className={style.faBar} onClick={() =>setShowBar(!showBar)} />
      {showBar && (
          <div className={style.headerAdapt}>
          <p onClick={handleCommunityClick} className={style.community}>Community</p>
          <hr />
          <div className={style.user}>

          <div className={style.username} onClick={handleUsernameClick} id='username'>{username}</div>
            {showOption && (
              <div className={style.optionmenu}>
              <p onClick={handleLogout}>logout</p>
            </div>
            )}
          </div>
          </div>
      )}

    </header>
  )
}

export default Header