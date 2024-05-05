import React, { useContext, useEffect, useState } from 'react'
import "./payload.css"
import { Qrcode } from '../../components/qrcode/qrcode'
import { decodeHashId } from '../../services/formatFunctions'
import { useParams } from 'react-router-dom'
import { Api } from '../../services/Api'
import { AuthContext } from '../../context/context'
import QRCode from 'react-qr-code'
import { socket } from "../../services/socket";
import { useNavigate } from "react-router-dom";
import { SpinnerCustom } from '../../components/Spinner/Spinner';
import { Button } from '../../components/Button/Button'
import { PageTitle } from '../../components/pageTitle/pageTitle'
import { formataDinheiro } from '../../services/formatFunctions'
import omega from '../../assets/omega.png'
import { useToast } from '@chakra-ui/react'

const Payload = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const [payload, setPayload] = useState({})
    const [loading, setLoading] = useState(true)
    const [ocurred, setOcurred] = useState(false)
    const [campeonato, setCampeonato] = useState([])

    const { ids: coded } = useParams()
    const ids = decodeHashId(coded)
    const split = ids.split('-')
    const id_campeonato = split[0]
    const id_time = split[1]
    const { getUserData } = useContext(AuthContext)
    console.log(getUserData())

    const copiar = async (text) =>{
        try{
            await navigator.clipboard.writeText(text)
            toast({
                title: `Chave pix copiada com sucesso!`,
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }catch(e){
            alert(e)
        }
    }


    useEffect(() => {


        const getCampeonato = async () => {
            const { data: campeonatoData } = await Api.get(`campeonatos/id/${id_campeonato}`)
            setCampeonato(campeonatoData)
        }

        getCampeonato()

    }, [])

    //console.log(campeonato[0].valor_entrada)


    useEffect(() => {
        const getPayment = async () => {
            if (!ocurred && campeonato.length > 0) {
                setLoading(true)
                const { data: getQrCode } = await Api.post(`/campeonato/pagar`, {
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
            } else {
                console.log('ja foi amigo')
            }
        }

        if (!ocurred && campeonato.length > 0) {
            getPayment()
        }

    }, [campeonato, ocurred])

    useEffect(() => {
        socket.on("payed", async () => {
            navigate('/obrigado')
        })
    }, [ocurred]);



    return (
        <>
            {
                loading

                    ?
                    <SpinnerCustom />
                    :
                    <div className="qrcode">

                        <PageTitle text={campeonato[0].nome} />
                        <h3>pagamento pix</h3>
                        <h2>Valor da inscrição: <span>{formataDinheiro(campeonato[0].valor_entrada)} R$</span></h2>
                        <QRCode value={ocurred ? payload?.point_of_interaction.transaction_data.qr_code : ""} />
                        <Button text={loading ? <SpinnerCustom /> : "Copiar chave pix"} variant={"purple"} type={"submit"} width={"100%"} onClick={(e) => copiar(payload?.point_of_interaction.transaction_data.qr_code)} />
                        <p>Após a confirmação do pagamento você será automaticamente inscrito no campeonato!</p>
                        <div className='omega'>

                            <img src={omega} alt="" srcset="" />
                        </div>
                    </div>


            }
        </>
    )
}

export { Payload }