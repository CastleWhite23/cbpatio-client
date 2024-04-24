import React, { useContext, useEffect, useState } from 'react'
import "./payload.css"
import { Qrcode } from '../qrcode/qrcode'
import { decodeHashId } from '../../services/formatFunctions'
import { useParams } from 'react-router-dom'
import { Api } from '../../services/Api'
import { AuthContext } from '../../context/context'

const Payload = () => {

    const [payload, setPayload] = useState([])

    const {ids: coded} = useParams()
    const ids = decodeHashId(coded)
    const split = ids.split('-')
    const id_campeonato = split[0]
    const id_time = split[1]
    const {getUserData} = useContext(AuthContext)
    console.log(getUserData())
    
    useEffect(() => {
        const getPayment = async () => {
            const {data: getQrCode} = await Api.post(`/campeonato/pagar`, {
                
                name: `${getUserData().nome_completo}`,
                telefone: `${getUserData().celular}`
            })

            setPayload(getQrCode)
        }

        getPayment()
    })

    console.log(payload)
  
    return (
        <div>
            <Qrcode value={''}/>
        </div>
    )
}

export {Payload}