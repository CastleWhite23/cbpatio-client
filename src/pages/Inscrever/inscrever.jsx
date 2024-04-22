import React from 'react'
import { useParams } from 'react-router-dom'
import { decodeHashId } from '../../services/formatFunctions'

const Inscrever = () => {
    const {id_camp} = useParams()
    const id = decodeHashId(id_camp)
    console.log(id)

    return (
        <div>Inscrever</div>
    )
}

export {Inscrever}