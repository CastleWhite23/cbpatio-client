import React, { useContext, useEffect, useState } from 'react'
import "./payload.css"
import { Qrcode } from '../qrcode/qrcode'
import { decodeHashId } from '../../services/formatFunctions'
import { useParams } from 'react-router-dom'
import { Api } from '../../services/Api'
import { AuthContext } from '../../context/context'
import QRCode from 'react-qr-code'

const Payload = () => {

    const [payload, setPayload] = useState({})
    const [loading, setLoading] = useState(false)
    const [ocurred, setOcurred] = useState(false)
    const [qrcode, setQrcode] = useState("") 

    const {ids: coded} = useParams()
    const ids = decodeHashId(coded)
    const split = ids.split('-')
    const id_campeonato = split[0]
    const id_time = split[1]
    const {getUserData} = useContext(AuthContext)
    console.log(getUserData())
    
    useEffect(() => {
        
        const getPayment = async () => {
            setLoading(true)
                const { data: getQrCode } = await Api.post(`/campeonato/pagar`, {
                    name: `${getUserData().nome_completo}`,
                    telefone: `${getUserData().celular}`,
                    email: `${getUserData().email}`,
                })
                setPayload(getQrCode)

            setLoading(false)
            setOcurred(true)
        }
    
        if(!ocurred){
            getPayment()

        }
        
    }, [])
  
    useEffect(() => {
        console.log(payload)

    }, [payload])


    return (
        <div>
            {
            loading 
            
            ?
            'carregando krl'
            :
            
            <QRCode value={ocurred ? payload?.point_of_interaction.transaction_data.qr_code : ""}/>

            }
        </div>
    )
}

export {Payload}