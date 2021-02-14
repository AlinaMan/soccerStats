import React, { useEffect, useRef, useState } from 'react'
import './Select.scss'

const SelectYear = props => {
  const select = useRef(null);
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(props.selected || '')

  useEffect(() => {
    const handleClickOutside = event => {
      if (select.current && !select.current.contains(event.target))
        setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectYear = year => {
    setSelected(year)
    setOpen(false)
    
    if (props.onSelect)
      props.onSelect(year)
  }

  return (
    <div className="select" ref={select}>
      {props.label && <h5>{props.label}:</h5>}

      <div className="select-wrapper">
        <div className="select-input" onClick={() => setOpen(!open)}>{selected || 'All years'}</div>

        <ul className={`select-dropdown ${open ? 'opened' : ''}`}>
          {props.years.map(year =>
            <li
              key={year}
              className={year === selected ? 'active' : ''}
              onClick={() => selectYear(year)}
            >{year}</li>)}

          <li
            className={selected === '' ? 'active' : ''}
            onClick={() => selectYear('')}
          >All years</li>
        </ul>
      </div>
    </div>
  )
}

export default SelectYear