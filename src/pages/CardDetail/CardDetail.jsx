import React, { useState } from 'react'
import Header from '../Home/Header/header'
import { useLocation, useParams } from 'react-router-dom';
import Slider from './Slider/Slider';

import style from "./CardDetail.module.scss"

const CardDetail = () =>{
    const {moduleId} = useParams()
    const location = useLocation()

    const {moduleName, cards} = location.state


    const username = localStorage.getItem('username');
    const handleLogout = async () =>{
        fetch("http://localhost:8080/logout", {
          method: "POST",
        }).then(response =>{
          if(response.ok){
            localStorage.removeItem('username')
            navigate("/login")
          }
        })
      }
    return(
        <>
            <Header username={username} handleLogout={handleLogout} />
            <p className={style.title}>{moduleName}</p>
            <Slider cards={cards}/>
        </>
    )
}

export default CardDetail