import React from 'react'
import "./Card.css"
import logo from "../../assets/logo.png"


const Card = ({ children, variant, width, height, bgImage, gap, config = false }) => {
  const bgImageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    zIndex: '-1',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    borderRadius: '8px'
    }

  return (
    <div className={`card-${variant}`} style={{width: width, minHeight: height, gap: gap, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: "5px"}}>
      
      {config == true
      
      ?

      <div className='logo'><img src={logo} alt="" srcset="" /></div>
      
      :

      ""
      }
      
      <div style={bgImage && { ...bgImageStyle}}></div>
      <div className={`things ${config==true? "purpleBar" : ""}`}>
        {children}
      </div>
    </div>
  )
}

export { Card }
