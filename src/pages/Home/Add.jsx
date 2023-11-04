import React from 'react'
import addIcon from '../../assets/addIcon.png'
import style from './Home.module.scss'
const Add = () => {
  return (
    <div className={style.addWrap}>
        <p>What are we going to learn today?</p>
        <a href="/createBlock">
        <img className={style.addIcon} src={addIcon} alt="" />
        </a>
    </div>
  )
}

export default Add