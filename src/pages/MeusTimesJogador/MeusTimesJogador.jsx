import { Times } from '../Times/Times'
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Api } from '../../services/Api'
import './MeusTimesJogador.css'

import { DividerComponent } from '../../components/Divider/DividerComponent'

import { GerenciarEquipe } from '../../components/GerenciarEquipe/GerenciarEquipe'
import { ModalExcluir } from '../../components/ModalExcluir/ModalExcluir'

import { useToast } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessKnight } from '@fortawesome/free-solid-svg-icons'
import { decodeHashId } from '../../services/formatFunctions'
import { AuthContext } from '../../context/context'

//  GERENCIAR EQUIPE E BTN PARA EXCLUIR TIME


const MeusTimesJogador = () => {
    const { id_time: idCodificado } = useParams()
    const id_time = decodeHashId(idCodificado)
    const navigate = useNavigate()

    const {getUserData} = useContext(AuthContext)

    if (!id_time) {
        navigate('/times/meusTimes')
    }

    const [time, setTime] = useState({})


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


    const handleSairTime = async () => {
        try {
            //o problema de não poder deletar são os filhos da tabela time_usuario. sem eles da pra excluir suave
            await Api.delete(`/usuarios/time/deletar/${id_time}/${getUserData().id}`)
            toast({
                title: 'Você saiu do time com sucesso!',
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            navigate('/times/meustimes')
        } catch (e) {
            toast({
                title: 'Erro ao sair time!',
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
            <Times pageTitle={time?.nome}>
                <div className="time-capitao">
                    <h1 className='subtitulo'><FontAwesomeIcon icon={faChessKnight} /> jogador</h1>
                    <DividerComponent />
                    <GerenciarEquipe titulo={'gerenciar equipe'} type='capitao' idTime={id_time} />
                    <DividerComponent />
                    <div className="time-opcoes">
                        <h1>Sair do time</h1>
                        <p><span>Obs: </span>Para <span>entrar</span> no time novamente, voce precisara esperar um outro <span>convite</span></p>
                        <p>Após sair desse time nao tem volta, seu <span>trouxa</span></p>

                        <ModalExcluir
                            titulo={'Deseja mesmo sair desse time?'}
                            openText={'Sair do time'}
                            actionText={'Sair'}
                            closeText={'Fechar'}
                            onClickAction={
                                handleSairTime
                            }
                        />
                    </div>

                </div>
            </Times>
        </>
    )
}

export { MeusTimesJogador }