import { Button } from '../Button/Button'
import './GerenciarEquipe.css'
import foto from '../../assets/templo.png'
import { ModalComponent } from '../ModalComponent/ModalComponent'
import { ModalExcluir } from '../ModalExcluir/ModalExcluir'
import {useToast}from '@chakra-ui/react'
import {useNavigate, useLocation} from 'react-router-dom'

const GerenciarEquipe = ({ titulo }) => {
    const array = [0, 1, 2, 3, 4, 5, 6, 4, 5]

    const toast = useToast()
    const navigate = useNavigate()

    const location = useLocation();
  const rotaAtual = location.pathname;

    const handleExpulsarJogador = () => {
        try {
            toast({
                title: 'Jogador expulso com sucesso!',
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            navigate('/times/meustimes')
        } catch(e){
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
            <div className="gerenciar-equipe">
                <div className="card">

                    <h1>{titulo}</h1>
                    <ul>
                        {
                            array.map(() => (
                                <div className='user'>
                                    <div className="userfoto">
                                        <img src={foto} alt="foto" />
                                    </div>
                                    <h2>Nome de usuario</h2>
                                    <ModalExcluir 
                                        titulo={'Deseja mesmo expulsar o jogador?'}
                                        openText={'Expulsar'}
                                        actionText={'Expulsar'}
                                        closeText={'Fechar'}
                                        onClickAction={handleExpulsarJogador}
                                    />
                                </div>
                            ))
                        }

                    </ul>
                </div>
            </div>

        </>
    )
}


export { GerenciarEquipe }