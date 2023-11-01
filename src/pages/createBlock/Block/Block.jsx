import React from 'react'
import style from './Block.module.scss'
const Block = () => {
  return (
    <div className={style.blockWrapper}>
        <form className={style.form} action="">
            <input type="text" className={style.term} placeholder='Entern term'/>
            <input type="text" className={style.definition} placeholder='Enter definiton' />
        </form>
    </div>
  )
}

export default Block