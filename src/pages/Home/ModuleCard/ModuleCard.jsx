import React, { useState, useEffect } from 'react';
import style from "./ModuleCard.module.scss"
import { useNavigate } from 'react-router-dom';


const ModuleCard = ({moduleId, moduleName, cards, authorUsername}) =>{
    const totalTerms = cards.filter(card => card.term !== '').length
    const navigateToModule = useNavigate()
    const handleClick = () =>{
        navigateToModule(`/card/${moduleId}`, {
            state: {moduleId, moduleName, cards, authorUsername: authorUsername }
        })
    }

    return (
        <div className={style.wrapper} onClick={handleClick}>
            <p className={style.moduleName}>{moduleName}</p>
            <p className={style.terms}>{totalTerms} terms</p>
            {authorUsername && (<p className={style.author}>author: {authorUsername}</p>)}
        </div>
    )
}

export default ModuleCard;