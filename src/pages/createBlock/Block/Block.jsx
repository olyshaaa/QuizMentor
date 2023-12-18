import React, { useState, useEffect } from 'react'
import style from './Block.module.scss'
const Block = ({blocks, onBlockChange}) => {
  const [localBlocks, setLocalBlocks] = useState([
    {term: ' ', definition: ' '}
  ])

  useEffect(() => {
    setLocalBlocks(blocks);
  }, [blocks]);

  const handleTitleChange = (event, index) =>{
    const updatedBlocks = [...localBlocks]
    updatedBlocks[index].term = event.target.value;
    setLocalBlocks(updatedBlocks)
    onBlockChange(updatedBlocks);
  }

  const handleDefinitionChange = (event, index) =>{
    const updatedBlocks = [...localBlocks]
    updatedBlocks[index].definition = event.target.value
    setLocalBlocks(updatedBlocks)
    onBlockChange(updatedBlocks);
  }

  const addCard = () =>{
    const updatedBlocks = [...localBlocks, {term: '', definition: ''}]
    setLocalBlocks(updatedBlocks)
    onBlockChange(updatedBlocks);
  }
  return (
    <div>
        <div className={style.form} action="">
          {blocks.map((block, index) =>(
            <div className={style.blockWrapper}>
              <p className={style.index}>{index+1}</p>
              <input
               type="text"
               className={style.term}
               placeholder='Entern term'
               onChange={(event) => handleTitleChange(event, index)}
               />

              <input
               type="text"
               className={style.definition}
               placeholder='Enter definiton'
               onChange={(event) => handleDefinitionChange(event, index)}
               />
            </div>
          ))}
            </div>
        <button className={style.addCard} onClick={addCard}>Add a card</button>
    </div>
  )
}

export default Block