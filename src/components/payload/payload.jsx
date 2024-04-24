import React, { useContext, useEffect, useState } from 'react'
import "./payload.css"
import { Qrcode } from '../qrcode/qrcode'
import { decodeHashId } from '../../services/formatFunctions'
import { useParams } from 'react-router-dom'
import { Api } from '../../services/Api'
import { AuthContext } from '../../context/context'
import QRCode from 'react-qr-code'
import { socket } from "../../services/socket";
import { useNavigate } from "react-router-dom";

const Payload = () => {
    
    const navigate = useNavigate()
    const [payload, setPayload] = useState({})
    const [loading, setLoading] = useState(false)
    const [ocurred, setOcurred] = useState(false)
    const [campeonato, setCampeonato] = useState([]) 

    const {ids: coded} = useParams()
    const ids = decodeHashId(coded)
    const split = ids.split('-')
    const id_campeonato = split[0]
    const id_time = split[1]
    const {getUserData} = useContext(AuthContext)
    console.log(getUserData())
    
    useEffect(() => {
        

        const getCampeonato = async () => {
            const {data: campeonatoData} = await Api.get(`campeonatos/id/${id_campeonato}`)
            setCampeonato(campeonatoData)
        }
    
        getCampeonato()
        
    }, [])

    //console.log(campeonato[0].valor_entrada)

  
    useEffect(() => {
        const getPayment = async () => {
            if(!ocurred && campeonato.length > 0){
                setLoading(true)
                    const {data: getQrCode} = await Api.post(`/campeonato/pagar`, {
                        name: `${getUserData().nome_completo}`,
                        telefone: `${getUserData().celular}`,
                        email: `${getUserData().email}`,
                        valor: `${campeonato[0].valor_entrada}`,
                        fk_id_time: id_time,
                        fk_id_campeonato: id_campeonato
                    })
                    setPayload(getQrCode)
    
                setLoading(false)
                setOcurred(true)
                console.log(campeonato[0].valor_entrada)
            }else{
                console.log('ja foi amigo')
            }
        }

        if(!ocurred && campeonato.length > 0){
            getPayment()
        }

    }, [campeonato, ocurred])

    useEffect(() => {
        socket.on("payed", async () =>{
            try{
                if(campeonato.length > 0){
                    const valor = parseFloat(campeonato[0]?.valor_entrada)
                    await Api.post(`/campeonatos/inscrever/pagamentos`, {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "valor_pagamento": valor
                    })
                }
            }catch(e){
                alert(e)
            }
            navigate('/classificacao')
            window.location.reload()
          })
    }, [ocurred]);



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