import React, { useState } from 'react'
import Header from '../Home/Header/header'
import { useLocation, useParams } from 'react-router-dom';
import Slider from './Slider/Slider';

import style from "./CardDetail.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite, removeFromFavourites, selectFavourites, setFavourites } from '../../service/favouriteSlice';

const CardDetail = () =>{
    const {moduleId} = useParams()
    const location = useLocation()

    const dispatch = useDispatch()
    const favourites = useSelector(selectFavourites)

    const {moduleName, cards, authorUsername} = location.state

    const isModuleInFavourites = favourites.modules.some(item => item.moduleName === moduleName && item.authorUsername === authorUsername);
     const handleToggleFavourite = () =>{
      if(isModuleInFavourites){
        dispatch(removeFromFavourites({moduleName, authorUsername}))
      }else{
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || []
        const newFavourite = {moduleName, cards, authorUsername}
        dispatch(addToFavourite({moduleName, cards, authorUsername}))}
    }
    const username = localStorage.getItem('username');
    const handleLogout = async () =>{
        fetch("https://quizmentorbackend.onrender.com/logout", {
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
            <div className={style.buttonWrapper}>
            <button onClick={handleToggleFavourite}>{isModuleInFavourites ? 'Remove from favorites' : 'Add to favorites'}</button>
            </div>
        </>
    )
}

export default CardDetail