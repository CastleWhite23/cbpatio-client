import React from 'react'
import "./Button.css"

const Button = ({type, variant, text, width, padding, margin, onClick, height, fontSize, disabled}) => {
  return (
    <div className='ct-btn'>
      <button className={`button ${variant}`} type={type} disabled={disabled} style={{width, padding, margin, height, fontSize}} onClick={onClick}>
          {text}
      </button>
    </div>

  )
}

export {Button}