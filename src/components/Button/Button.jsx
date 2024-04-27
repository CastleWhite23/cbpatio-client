import React from 'react'
import "./Button.css"

const Button = ({type, variant, text, width, padding, margin, onClick, height, fontSize, disabled, borderRadius}) => {
  return (
    <div className='ct-btn'>
      <button className={`button ${variant}`} type={type} disabled={disabled} style={{width, padding, margin, height, fontSize, borderRadius}} onClick={onClick}>
          {text}
      </button>
    </div>

  )
}

export {Button}