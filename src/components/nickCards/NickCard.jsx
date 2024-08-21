import React from 'react'
import './nickCard.css'
import {Input} from '../Input/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import epicgames from "../../assets/epicgames.png"
import supercell from "../../assets/supercell.png"
import { Api } from '../../services/Api';

const schema = yup.object({
    nickname: yup.string().max(20, "Seu nick não pode ser maior que 20 caracteres")
})

const NickCard = ({plataform, actualName, idConta}) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const submitNick = async (formData) => {
        console.log('seseg')

    }

  return (
    <div className='nickCard'>
        <form onSubmit={handleSubmit(submitNick)}>
            <div className='subInput'>
                <FontAwesomeIcon icon={plataform == "xbox" ? faXbox : plataform == "psn" ? faPlaystation : "" } color={plataform == "psn" ? 'blue' : "green"} />
                {plataform == "epic" ? <img src={epicgames} /> : plataform == "supercell" ? <img src={supercell} /> : ''}
                <Input name={`nickName_${plataform}`} control={control} placeholder={actualName ?? "Insira seu nick aqui." } type='text' />
            </div> 
        
        </form>
    </div>
  )
}

export {NickCard}