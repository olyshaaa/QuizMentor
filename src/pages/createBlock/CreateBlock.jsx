import React, { useState} from 'react'
import Header from '../Home/Header/header'
import style from './CreateBlock.module.scss'
import Block from './Block/Block'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set, push } from "firebase/database";

const CreateBlock = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');

  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState('')
  const navigateToHome = useNavigate()
  const [show, setShow] = useState(false)


  const messageStyle = {
    display: show ? "block" : "none",
    color: "#db0000",
  }

  const handleBlockChange = (newBlocks) => {
    setBlocks(newBlocks);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const uid = localStorage.getItem('uid')
    const db = getDatabase()
    const cardsref = ref(db, `UserData/${uid}/cards`)
   push(cardsref, {
    title: title,
    ...blocks
  })
  }
  return (
    <>
        <Header />
        <div className={style.createBlockWrapper}>
          <p className={style.blockTitle}>Create a new study block</p>
          <form onSubmit={handleSubmit} action="">
            <div>
              <input
                className={style.title}
                type="text"
                required
                placeholder='Enter a title'
                onChange={(event) => setTitle(event.target.value)}
                id='inputTitle'
              />
              <label className={style.label} htmlFor="inputTitle">Title</label>
            </div>
             <Block blocks={blocks} onBlockChange={handleBlockChange} />
            <button className={style.create} type='submit'>Create</button>
            <p style={messageStyle}>You should add at leat 3 cards</p>
          </form>
        </div>
    </>
  )
}

export default CreateBlock;