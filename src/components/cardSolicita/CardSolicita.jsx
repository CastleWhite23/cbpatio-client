import React, { useContext, useEffect, useState } from 'react'
import foto from "../../assets/logo.png"
import "./cardSolicita.css"
import {Button} from "../Button/Button"
import {Api} from "../../services/Api"
import { AuthContext } from '../../context/context'

const CardSolicita = () => {  
  const {getUserData} = useContext(AuthContext)
  const [convite, setConvite] = useState([])
  //console.log(getUserData().id)

  useEffect(() => {
    const getConvites = async () => {
      const {data: convite} = await Api.get(`/usuarios/time/convite/${getUserData()?.id}`)
      setConvite(convite)
    } 
    getConvites()
  }, [])

  const handleRecusa = async (id, nomeTime) => {
    const recusa = await Api.delete(`/usuarios/time/recusarConvite/${id}`)
    if(recusa.status == 204){
      window.location.reload()
      alert(`Você recusou o time ${nomeTime}!`)
    }
  }

  const handleAceita = async (id, nomeTime) => {
    const aceitou = await Api.put(`/usuarios/time/aceitou/${id}`, {
      aceitou: 's'
    })

    if(aceitou.status == 201){
      window.location.reload()
      alert(`Você entrou no time ${nomeTime}!`)
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
              <p>O usuário {convite.nome_usuario} te convidou para participar do time {convite.nome_time}</p>
              <div className='buttons'>
                  <Button text={"Entrar"} variant={"green"} width={"100%"} fontSize={"20px"} onClick={() => handleAceita(convite.id_solicitacao, convite.nome_time)}/>
                  <Button text={"Recusar"} variant={"red"} fontSize={"20px"} width={"100%"} onClick={() => handleRecusa(convite.id_solicitacao, convite.nome_time)}/>
              </div>
          </div>
        ))}
    </div>
  )
}

export {CardSolicita}