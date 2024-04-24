import React, { useEffect } from 'react'
import "./payload.css"
import { Qrcode } from '../qrcode/qrcode'
import { decodeHashId } from '../../services/formatFunctions'
import { useParams } from 'react-router-dom'
import { Api } from '../../services/Api'

const Payload = () => {
    const {ids: coded} = useParams()
    const ids = decodeHashId(coded)
    const split = ids.split('-')
    const id_campeonato = split[0]
    const id_time = split[1]

    
    useEffect(() => {
        const getPayment = async () => {
            const {data: getQrCode} = await Api.post(`/campeonato/pagar`, {
                
            })
        }
    })
  
    return (
        <div>
            <Qrcode value={''}/>
        </div>
    )
}

export {Payload}