import React, { useContext } from 'react'
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
import { AuthContext } from '../../context/context';

const schema = yup.object({
    nickname: yup.string().max(20, "Seu nick não pode ser maior que 20 caracteres")
})

const NickCard = ({plataform, actualName, disabled}) => {

    const {getUserData} = useContext(AuthContext) 

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const submitNick = async (formData) => {
        switch (plataform) {
            case "epic":
                const {status} = await Api.put(`/usuarios/atualizar/${getUserData().id}`, {
                    nick_epic: formData.nickName_epic
                })
                if(status == 201 || 200){
                    alert('nome alterado pra ', formData.nickName_epic)
                }
                console.log(formData.nickName_epic, "epic")
                window.location.reload()
                break;

            case "psn":
                const psnStatus = await Api.put(`/usuarios/atualizar/${getUserData().id}`, {
                    nick_psn: formData.nickName_psn
                })
                if(psnStatus.status == 201 || 200){
                    alert('nome alterado pra ', formData.nickName_psn)
                }
                console.log(formData.nickName_psn, "psn")
                window.location.reload()
                break;

            case "xbox":
                const xboxStatus = await Api.put(`/usuarios/atualizar/${getUserData().id}`, {
                    nick_xbox: formData.nickName_xbox
                })
                if(xboxStatus.status == 201 || 200){
                    alert('nome alterado pra ', formData.nickName_xbox)
                }
                console.log(formData.nickName_xbox, "xbox")
                window.location.reload()
                break;

            case "supercell":
                const supercellStatus = await Api.put(`/usuarios/atualizar/${getUserData().id}`, {
                    nick_supercell: formData.nickName_supercell
                })
                if(supercellStatus.status == 201 || 200){
                    alert('nome alterado pra ', formData.nickName_supercell)
                }
                console.log(formData.nickName_supercell, "supercell")
                window.location.reload()
                break;
        
            default:
                break;
        }

    }

  return (
    <div className='nickCard'>
        <form onSubmit={handleSubmit(submitNick)}>
            <div className='subInput'>
                <FontAwesomeIcon icon={plataform == "xbox" ? faXbox : plataform == "psn" ? faPlaystation : "" } color={plataform == "psn" ? 'blue' : "green"} />
                {plataform == "epic" ? <img src={epicgames} /> : plataform == "supercell" ? <img src={supercell} /> : ''}
                <Input style={'profile'} name={`nickName_${plataform}`} control={control} placeholder={actualName ?? "Insira seu nick aqui." } type='text' disabled={disabled} />
            </div> 
        
        </form>
    </div>
  )
}

export {NickCard}