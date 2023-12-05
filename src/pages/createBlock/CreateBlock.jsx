import React, { useState, useEffect } from 'react'
import Header from '../Home/Header/header'
import style from './CreateBlock.module.scss'
import Block from './Block/Block'
import {database} from '../../firebase/firebase'
import { push, ref } from 'firebase/database';
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
/* авпва */
import {getDatabase, set} from 'firebase/database'
const CreateBlock = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');


  console.log("home username: " + username)


  const handleLogout = async () =>{
    await signOut(auth)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/login")
  }

  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    console.log(blocks)
  }, [blocks])

  const handleBlockChange = (newBlocks) => {
    setBlocks(newBlocks);
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const newBlock = {
      title: title,
      description: description,
      blocks: blocks
    }
    const databaselocal = getDatabase()
    const userref = ref(databaselocal, 'blocks')
    set(userref, newBlock)
    console.log('Данные успешно сохранены в Firebase.');
  }
  return (
    <>
        <Header username={username} handleLogout={handleLogout}/>
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
            <div>
              <input
                className={style.description}
                 type="text"
                 placeholder='Enter a description(not necessary)'
                 onChange={(event) => setDescription(event.target.value)}
                 id='inputDescription'
              />
              <label className={style.label} htmlFor="inputDescription">Description</label>
            </div>

             <Block blocks={blocks} onBlockChange={handleBlockChange} />
            <button>Submit</button>
          </form>
        </div>
    </>
  )
}

export default CreateBlock