import { Times } from '../Times/Times'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Api } from '../../services/Api'
import './MeusTimesCapitao.css'

import { DividerComponent } from '../../components/Divider/DividerComponent'
import { FormSolicita } from '../../components/FormSolicita/FormSolicita'
import { GerenciarEquipe } from '../../components/GerenciarEquipe/GerenciarEquipe'
import { ModalExcluir } from '../../components/ModalExcluir/ModalExcluir'

import { useToast } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

//  GERENCIAR EQUIPE E BTN PARA EXCLUIR TIME


const MeusTimesCapitao = () => {
    const { id_time } = useParams()
    const [time, setTime] = useState({})


    const navigate = useNavigate()

    // PEGANDO DADOS DO TIME PELO ID_TIME DA ROTA
    useEffect(() => {

        const getTimeById = async () => {
            const fetch = await Api.get(`/times/time/${id_time}`)
            const time = fetch.data[0]
            setTime(time)
        }

        getTimeById()

    }, [])



    const toast = useToast()


    const handleExcluirTime = async () => {
        try {
            const fetch = await Api.delete(`/times/deletar/${id_time}`)
            toast({
                title: 'Time Excluido com sucesso!',
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            navigate('/times/meustimes')
        } catch (e) {
            toast({
                title: 'Erro ao excluir time!',
                position: 'bottom-left',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            console.log(e)
        }

    }


    return (
        <>
            <Times pageTitle={time.nome}>
                <div className="time-capitao">
                    <h1 className='subtitulo'><FontAwesomeIcon icon={faCrown} /> capitão</h1>
                    <DividerComponent />
                    <FormSolicita idTime={time.id_time}/>
                    <DividerComponent />
                    <GerenciarEquipe titulo={'gerenciar time'} idTime={id_time} />
                    <DividerComponent />
                    <div className="time-opcoes">
                        <h1>Excluir Time</h1>
                        <p><span>Obs: </span>Você capitão, NÃO pode sair do time, apenas excluir-o</p>
                        <p>Após excluir esse time nao tem volta, seu <span>trouxa</span></p>

                        <ModalExcluir
                            titulo={'Deseja mesmo excluir esse time?'}
                            openText={'Excluir Time'}
                            actionText={'Excluir'}
                            closeText={'Fechar'}
                            onClickAction={
                                handleExcluirTime
                            }
                        />
                    </div>

                </div>
            </Times>
        </>
    )
}

export { MeusTimesCapitao }