import React, { useState } from 'react'
import style from './search.module.scss'
import { Navigate, useNavigate } from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const handleSubmit = () =>{
      navigate(`/search?query=${encodeURIComponent(search)}`)
    }

    const handleKeyPress = (event) =>{
      if(event.key === "Enter"){
        event.preventDefault()
        handleSubmit()
      }
    }
  return (
    <div>
        <input className={style.search} type="text" placeholder='Search for modules' value={search} onChange={(e)=>setSearch(e.target.value)} onKeyPress={handleKeyPress} />
    </div>
  )
}

export default Search