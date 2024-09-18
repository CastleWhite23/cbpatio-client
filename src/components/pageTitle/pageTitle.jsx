import React from 'react'
import "./pageTitle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageTitle = ({text, icon}) => {
  return (
    <h1 className='pgTitle'>{icon && <FontAwesomeIcon icon={icon} />} {text} </h1>
    
  )
}

export {PageTitle}
