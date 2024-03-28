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
  return (
    <div>
      <Header/>
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
          <div className={style.moduleCardWrapper}>
          {favourites && favourites.modules.length > 0 ? (
             favourites.modules.map((moduleData, index) => (
              <ModuleCard moduleId={index} {...moduleData} key={index} />
      ))
    ) : (
          <p className={style.favouritesAvailable}>No favorites available</p>
    )}
          </div>
      </div>
    </div>
  )
}

export default Home