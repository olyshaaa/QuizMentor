import React, { useState, useEffect } from 'react'
import Header from '../Home/Header/header'
import style from './CreateBlock.module.scss'
import Block from './Block/Block'
import { useNavigate } from 'react-router-dom'

const CreateBlock = () => {
  const navigate = useNavigate()

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

  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState('')
  const navigateToHome = useNavigate()

  useEffect(()=>{
    console.log(blocks)
  }, [blocks])

  const handleBlockChange = (newBlocks) => {
    setBlocks(newBlocks);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:8080/createModule',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          moduleName: title,
          cards: blocks,
          authorUsername: username,
        })
      })
      if(response.ok){
        navigateToHome("/home")
      }
    }
    catch(e){
      console.log("creating block failes: ", e)
    }

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
             <Block blocks={blocks} onBlockChange={handleBlockChange} />
            <button className={style.create} type='submit'>Create</button>
          </form>
        </div>
    </>
  )
}

export default CreateBlock;