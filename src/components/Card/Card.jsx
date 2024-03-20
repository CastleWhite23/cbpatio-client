import React from 'react'
import "./Card.css"


const Card = ({ children, variant, width, height, bgImage }) => {
  const bgImageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    filter: `blur(2px) grayscale(65%)`,
    zIndex: '-1',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    borderRadius: '10px',
    border: "5px solid #000"
  }

  return (
    <div className={`card-${variant}`} style={{width, height}}>
      <div style={{ ...bgImageStyle}}></div>
      <div className='things'>
        {children}
      </div>
    </div>
  )
}

export { Card }
