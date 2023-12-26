import React, { useState, useEffect } from 'react';
import style from "./ModuleCard.module.scss"
import { useNavigate } from 'react-router-dom';


const ModuleCard = ({moduleId, moduleName, cards}) =>{
    const totalTerms = cards.filter(card => card.term !== '').length
    const navigateToModule = useNavigate()
    const handleClick = () =>{
        navigateToModule(`/card/${moduleId}`, {
            state: {moduleId, moduleName, cards }
        })
    }

    return (
        <div className={style.wrapper} onClick={handleClick}>
            <p className={style.moduleName}>{moduleName}</p>
            <p className={style.terms}>{totalTerms} terms</p>
        </div>
    )
}

export default ModuleCard;