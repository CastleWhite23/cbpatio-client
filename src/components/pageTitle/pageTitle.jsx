import React from 'react'
import "./pageTitle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageTitle = ({text, icon, variant = 'pgTitle'}) => {
  return (
    <h1 className={variant}>{icon && <FontAwesomeIcon icon={icon} />} {text} </h1>
    
  )
}

export {PageTitle}
