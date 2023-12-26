import React, { useState } from 'react'
import Header from '../Home/Header/header'
import { useLocation, useParams } from 'react-router-dom';
import Slider from './Slider/Slider';

const CardDetail = () =>{
    const {moduleId} = useParams()
    const location = useLocation()

    const {moduleName, cards} = location.state

    console.log('Module ID:', moduleId);
  console.log('Module Name:', moduleName);
  console.log('Cards:', cards);
    const username = localStorage.getItem('username');
    const handleLogout = async () =>{
        fetch("http://localhost:8080/logout", {
          method: "POST",
        }).then(response =>{
          if(response.ok){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate("/login")
          }
        })
      }
    return(
        <>
            <Header username={username} handleLogout={handleLogout} />
            <p>Card Detail</p>
            <Slider cards={cards}/>
        </>
    )
}

export default CardDetail