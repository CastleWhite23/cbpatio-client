import React from 'react'
import { useParams } from 'react-router-dom'
import { decodeHashId } from '../../services/formatFunctions'
import { InscreverEquipe } from '../../components/InscreverEquipe/inscreverEquipe'

const Inscrever = () => {
    const {id_camp} = useParams()
    const id = decodeHashId(id_camp)
    console.log(id)

    return (
        <InscreverEquipe id_campeonato={id}/>
    )
}

export {Inscrever}