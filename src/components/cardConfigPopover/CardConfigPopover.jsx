import React from 'react'
import "./cardConfigPopover.css"
import { DividerComponent } from '../Divider/DividerComponent'


const CardConfigPopover = ({type}) => {
  return (
    <div className='cardConfigPopover'>
        <div className='popover'>
            Campeonato 1
        </div>

        <div className='cardConfigContent'>
            <div className='headerConfig'>
                {type}
            </div>
            <DividerComponent />
            <div className='mainConfig'>
            5
            </div>
        </div>
    </div>
  )
}

export {CardConfigPopover}