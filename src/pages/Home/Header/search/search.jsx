import React, { useState } from 'react'
import style from './search.module.scss'

const Search = () => {
    const [search, setSearch] = useState('')
  return (
    <div>
        <input className={style.search} type="text" placeholder='Search for modules' value={search} onChange={(e)=>setSearch(e.target.value)} />
    </div>
  )
}

export default Search