import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Api } from '../../services/Api'
import { AuthContext } from "../../context/context"
import { Link } from 'react-router-dom'
import { SpinnerCustom } from '../Spinner/Spinner'
import { hashId } from '../../services/formatFunctions'
import './MeusTimesQr.css'
import { useToast } from '@chakra-ui/react'
const MeusTimesQr = ({nameUserInvited, idUserInvited}) => {

    const [timesCapitao, setTimesCapitao] = useState([])
    const [timesJogador, setTimesJogador] = useState([])
    const { getUserData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [loadingJogador, setLoadingJogador] = useState(true)
    // PEGAR TIMES EM QUE O IDCAPITAO É DIFERENTE DO DO CARA LOGADO
    const toast = useToast();
    useEffect(() => {

        const getTimes = async () => {
            const { data: capitao } = await Api.get(`/times/time/capitao/${getUserData().id}`)
            setTimesCapitao(capitao)
            setLoading(false)
        }

        const getTimesJogador = async () => {

            const fetch = await Api.get(`/usuarios/time/userid/${getUserData().id}`)
            const timesJogador = fetch.data
            setTimesJogador(timesJogador)
            setLoadingJogador(false)
            console.log(timesJogador)

        }

        getTimes()
        getTimesJogador()

    }, [])

    async function handleSolicitation(userId, idTime){
        try {
            setLoading(true);

            const {data: jaEnviou} = await Api.get(`/usuarios/time/jaEnviou/${userId}/${idTime}`)
            const {data: jaEstaEmCampeonato} = await Api.get(`/campeonatos/time/times/nome/ids/${idTime}`)


            if(jaEstaEmCampeonato.length > 0){
                toast({
                    title: 'Você não pode adicionar pessoas em um time após se inscrever em um campeonato.',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)
                return
            }


            if(jaEnviou.length > 0){
                toast({
                    title: 'Você já enviou uma solicitação à este usuário!',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)
                return
            }

            if(getUserData().id == userId){
                toast({
                    title: 'Você não pode mandar uma solicitação a si mesmo seu trouxa!',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)
                return
            }

            if(!userId){
                toast({
                    title: 'Usuário não encontrado!',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)

                return
            }

            const envio = await Api.post('/usuarios/time/convidar', {
                fk_id_usuario: userId,
                fk_id_time: idTime,
                aceitou: 'n'
            });

            toast({
                title: 'Solicitação enviada com sucesso!',
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

        } catch (error) {
            toast({
                title: 'Erro ao enviar solicitação!',
                position: 'bottom-left',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }

        setLoading(false)
    }

    return (
        <div className='meus-times'>
                            {
                                timesCapitao.length > 0 ? timesCapitao.map((time, index) => {
                                    console.log(time)
                                    return (
                                        <div className='time_card'>
                                            <Button text={`${time.nome} - Convidar ${nameUserInvited}`} variant={"green"} margin={"10px 0"} height={"4rem"} fontSize={"20px"} onClick={() => handleSolicitation(idUserInvited, time.id_time)} />
                                        </div>
                                    )
                                }) : (
                                    <>

                                        <h1>Você não é capitão de nenhum time ainda.</h1>
                                        <h1><span className='link darkpurple'><Link to={`/times/criar`}>Crie um time para se tornar capitão! </Link></span></h1>  </>
                                )
                }
        </div>
    )
}

export { MeusTimesQr }
