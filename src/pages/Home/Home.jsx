import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/header'
import Add from './Add'
import ModuleCard from "./ModuleCard/ModuleCard.jsx"

import style from "./Home.module.scss"
import { useSelector } from 'react-redux'
import { selectFavourites } from '../../service/favouriteSlice.js'

const Home = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');

  const [data, setData] = useState([]);

  const favourites = useSelector(selectFavourites)

  const handleLogout = async () =>{
    fetch("https://quizmentorbackend.onrender.com/logout", {
      method: "POST",
      headers: {
        'Origin': 'https://quiz-mentor.vercel.app',
      },
    }).then(response =>{
      if(response.ok){
        localStorage.removeItem('username')
        localStorage.removeItem('authenticated');
        navigate('/login')
      }
    })

  }

  useEffect(() => {
    fetch(`https://quizmentorbackend.onrender.com/modules/${username}`)
    .then(response => response.json())
    .then((data) => setData(data))
  }, [])
  return (
    <div>
      <Header username={username} handleLogout={handleLogout} />
      <Add />
      <div className={style.bannerWrapper}>
        {data.map((moduleData, index) => (
          <div className={style.moduleCardWrapper} key={index} >
          <ModuleCard moduleId={index} {...moduleData}/>
          </div>
        ))}
      </div>
      <p className={style.favoriteTitle}>Favorites</p>
      <div className={style.bannerWrapper}>

          {favourites && console.log(favourites)}
          <div className={style.moduleCardWrapper}>
          {favourites && favourites.modules.map((moduleData, index) => (
            <ModuleCard moduleId={index} {...moduleData}/>
          ))}
          </div>
      </div>
    </div>
  )
}

export default Home