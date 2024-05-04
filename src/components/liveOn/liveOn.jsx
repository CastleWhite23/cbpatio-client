import React from 'react'
import "./liveOn.css"

const LiveOn = () => {
  return (
    <div className='div__liveon'>
        <iframe src="https://player.twitch.tv/?channel=cbpatio&parent=cbpatio.vercel.app" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
    </div>
  )
}

export {LiveOn}