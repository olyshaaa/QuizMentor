import React, { useState, useEffect } from 'react'
import style from './header.module.scss'
import Search from './search/search'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({username, handleLogout}) => {
  //showing the profile menu
  const [showOption, setShowOption] = useState(false)
  // profile menu but for mobiles
  const [showBar, setShowBar] = useState(false)
  const navigate = useNavigate()

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