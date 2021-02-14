import React, { useState } from 'react'
import loupe from '../../assets/icons/loupe.png'
import './Input.scss'


export const Search = props => {
  const [inputText, setInputText] = useState(props.value || '')

  const onChange = event => {
    setInputText(event.target.value);
    
    if (props.onChange) 
      props.onChange(event.target.value);
  }

  return (
    <div className="input-search">
      <input 
        type="text"
        placeholder="Search"
        value={inputText}
        onChange={onChange}
      />
      <img src={loupe} alt="" />
    </div>
  )
}