import React from 'react'
import QRCode from 'react-qr-code'
import "./qrcode.css"

const Qrcode = ({value}) => {
  return (
    <div className='margin-qrcode'>
        <QRCode value={value} />
    </div>
  )
}

export {Qrcode}