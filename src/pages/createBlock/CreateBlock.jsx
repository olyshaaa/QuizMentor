import React, { useState, useEffect } from 'react'
import Header from '../Home/Header/header'
import style from './CreateBlock.module.scss'
import Block from './Block/Block'
import { useNavigate } from 'react-router-dom'

const CreateBlock = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username');
  const handleLogout = async () =>{
    fetch("https://quizmentorbackend.onrender.com/logout", {
      method: "POST",
    }).then(response =>{
      if(response.ok){
        localStorage.removeItem('username')
        localStorage.removeItem("authenticated")
        navigate("/login")
      }
    })
  }

  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState('')
  const navigateToHome = useNavigate()
  const [show, setShow] = useState(false)

  useEffect(()=>{
    console.log(blocks)
    console.log(blocks.length)
  }, [blocks])

  const messageStyle = {
    display: show ? "block" : "none",
    color: "#db0000",
  }

  const handleBlockChange = (newBlocks) => {
    setBlocks(newBlocks);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(blocks.length <=2){
      setShow(true)
    }else{
    try{
      const response = await fetch('https://quizmentorbackend.onrender.com/createModule',{
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
            <p style={messageStyle}>You should add at leat 3 cards</p>
          </form>
        </div>
    </>
  )
}

export default CreateBlock;