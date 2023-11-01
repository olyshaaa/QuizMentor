import React, { useState, useEffect } from 'react'
import style from './header.module.scss'
import Search from './search/search'

const Header = ({username, handleLogout}) => {
  //showing the profile menu
  const [showOption, setShowOption] = useState(false)

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
      <h1>QuizMentor</h1>
      <a href="" className={style.community}>Community</a>
      <Search />
      <div className={style.user}>

      <div className={style.username} onClick={handleUsernameClick} id='username'>{username}</div>
        {showOption && (
          <div className={style.optionmenu}>
          <p onClick={handleLogout}>logout</p>
        </div>
        )}
      </div>

    </header>
  )
}

export default Header