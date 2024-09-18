
import './GerenciarEquipe.css'

import { ModalExcluir } from '../ModalExcluir/ModalExcluir'
import { useToast } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Api } from '../../services/Api'


const GerenciarEquipe = ({ titulo, idTime, type }) => {
    // const array = [0, 1, 2, 3, 4, 5, 6, 4, 5]
    const path = "https://cbpatio-production.up.railway.app"
    const [timeUsuarios, setTimeUsuarios] = useState([])

    const toast = useToast()
    const navigate = useNavigate()

    const location = useLocation();
    const rotaAtual = location.pathname;

    console.log(timeUsuarios)

    useEffect(() => {
        // PEGANDO OS INTEGRANTES DO TIME PELO ID_TIME// ROTA NOVA NA API
        const getTimeIntegrantes = async () => {
            const fetch = await Api.get(`/usuarios/time/${idTime}`)
            const timeUsuarios = fetch.data
            setTimeUsuarios(timeUsuarios)
            console.log(timeUsuarios)

        }

        getTimeIntegrantes()

    }, [])

    const handleExpulsarJogador = async (idUser) => {
        try {
           
            const {data: jaEstaEmCampeonato} = await Api.get(`/campeonatos/time/times/nome/ids/${idTime}`)

            if(jaEstaEmCampeonato.length > 0){
                toast({
                    title: 'Você não pode expulsar pessoas em um time após se inscrever em um campeonato.',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                return
            }

            const fetch = await Api.delete(`/usuarios/time/deletar/${idTime}/${idUser}`)
            toast({
                title: 'Jogador expulso com sucesso!',
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            navigate('/times/meustimes')
        } catch (e) {
            toast({
                title: 'Erro ao expulsar o jogador!',
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
            <div className="gerenciar-equipe">
                <h1>{titulo}</h1>
                <div className="card">
                    <ul>
                        {
                            timeUsuarios.map((usuario) => (
                                // SE O USUARIO FOR CAPITAO
                                usuario.idUser == usuario.fkIdCapitao ?
                                    (
                                        <div className='user'>
                                            <div className="userfoto">
                                                <img src={usuario.fotoUser ? `${path}/${usuario?.fotoUser.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="foto" />
                                            </div>
                                            <h2>{usuario.NomeUsuario}</h2>
                                            <h3 className="capitao">Capitão</h3>
                                        </div>
                                    ) : (
                                        <div className='user'>
                                            <div className="userfoto">
                                                <img src={usuario?.fotoUser ? `${path}/${usuario?.fotoUser.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="foto" />
                                            </div>
                                            <h2>{usuario.NomeUsuario}</h2>
                                            {
                                                type == 'capitao' ?
                                                    <h3 className="jogador">jogador</h3>

                                                    :

                                                    <ModalExcluir
                                                        titulo={'Deseja mesmo expulsar o jogador?'}
                                                        openText={'Expulsar'}
                                                        actionText={'Expulsar'}
                                                        closeText={'Fechar'}
                                                        onClickAction={() => handleExpulsarJogador(usuario.idUser)}
                                                    />
                                            }
                                        </div>
                                    )

                            ))
                        }

                    </ul>
                </div>
            </div>

        </>
    )
}


export { GerenciarEquipe }
