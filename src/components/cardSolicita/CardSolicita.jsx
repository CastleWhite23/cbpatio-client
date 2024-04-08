import React, { useContext, useEffect, useState } from 'react'
import foto from "../../assets/logo.png"
import "./cardSolicita.css"
import { Button } from "../Button/Button"
import { Api } from "../../services/Api"
import { AuthContext } from '../../context/context'
import { useToast } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

const CardSolicita = () => {
  const { getUserData } = useContext(AuthContext)
  const [convite, setConvite] = useState([])
  const toast = useToast()
  const navigate = useNavigate()
  //console.log(getUserData().id)

  useEffect(() => {
    const getConvites = async () => {
      const { data: convite } = await Api.get(`/usuarios/time/convite/${getUserData()?.id}`)
      setConvite(convite)
    }
    getConvites()
  }, [])

  const handleRecusa = async (id, nomeTime) => {
    const recusa = await Api.delete(`/usuarios/time/recusarConvite/${id}`)
    if (recusa.status == 204) {
      toast({
        title: `Voce recusou o convite do time: ${nomeTime}!`,
        position: 'bottom-left',
        status: 'error',
        duration: 5000,
        isClosable: true,
    })

    navigate('/times/meustimes')

    }
  }

  const handleAceita = async (id, nomeTime) => {
    const aceitou = await Api.put(`/usuarios/time/aceitou/${id}`, {
      aceitou: 's'
    })

    if (aceitou.status == 201) {
  
      toast({
        title: `Voce entrou no time: ${nomeTime}!`,
        position: 'bottom-left',
        status: 'success',
        duration: 5000,
        isClosable: true,
    })

    navigate('/times/meustimes')
    }
  }

  console.log(convite)
  return (
    <div className='main__card'>
      {convite.map(convite => (
        <div key={convite.id_solicitacao} id='card__solicita'>
          <div id='header'>
            <img src={convite.foto || foto} />
            <p>{convite.nome_do_usuario} - {Math.floor((new Date() - new Date(convite.hora_envio)) / (1000 * 60))} Minutos atrás</p>
          </div>
          <p>O usuário <span>{convite.nome_usuario}</span> te convidou para participar do time <span>{convite.nome_time}</span></p>
          <div className='buttons'>
            <Button text={"Entrar"} variant={"green"} width={"100%"} fontSize={"20px"} onClick={() => handleAceita(convite.id_solicitacao, convite.nome_time)} />
            <Button text={"Recusar"} variant={"red"} fontSize={"20px"} width={"100%"} onClick={() => handleRecusa(convite.id_solicitacao, convite.nome_time)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export { CardSolicita }