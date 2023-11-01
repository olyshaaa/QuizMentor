import React, { useState } from 'react'
import Header from '../Home/Header/header'
import style from './CreateBlock.module.scss'
import Block from './Block/Block'
const CreateBlock = () => {
  const [cards, setCards] = useState([])
  const handleSubmit =(e) =>{
    e.preventDefault()
    addCard()
  }
  return (
    <>
        <Header />
        <div onSubmit={handleSubmit} className={style.createBlockWrapper}>
          <p>Create a new study block</p>
          <form action="">
            <input className={style.title} type="text" required placeholder='Enter a title'/>
            <input className={style.description} type="text" placeholder='Enter a description(not necessary)' />
            <button>Submit</button>
          </form>
          <Block />
        </div>
    </>
  )
}

export default CreateBlock