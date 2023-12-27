import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/header'
import Add from './Add'
import ModuleCard from "./ModuleCard/ModuleCard.jsx"

import style from "./Home.module.scss"

const Home = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');

  const [data, setData] = useState([]);

  const handleLogout = async () =>{
    fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        'Origin': 'http://localhost:5173',
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
    fetch(`http://localhost:8080/modules/${username}`)
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
    </div>
  )
}

export default Home