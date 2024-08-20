import React from 'react'
import './nickCard.css'
import {Input} from '../Input/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    nickname: yup.string().max(20, "Seu nick não pode ser maior que 20 caracteres")
})

const NickCard = ({plataform, actualName}) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const submitNick = () => {
        console.log('enviou a POIRRA do nick ', plataform)
    }

  return (
    <div className='nickCard'>
        <form onSubmit={handleSubmit(submitNick())}>
            <Input name={`nickName_${plataform}`} control={control} defaultValue={actualName} type='text' />
        </form>
    </div>
  )
}

export {NickCard}