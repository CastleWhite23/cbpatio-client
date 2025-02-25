import './formSearch.css'
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Api } from '../../services/Api';



import { useToast } from '@chakra-ui/react'


import { useContext, useState } from "react";
import { getData } from '../../services/getData';
import { AuthContext } from '../../context/context';
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object({
    username: yup.string().max(30, "Caracteres acima do permitido!")
}).required()



const FormSearch = () => {
    const {getUserData} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userSearch, setUserSearch] = useState("")
    const toast = useToast()
    const {page} = parseInt(useParams());
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const handleSearch = async (nome) =>{
        navigate(`/jogadores/1?nome=${nome}`)
        window.location.reload();
    }

    const onSubmit = async (formData) => {
        handleSearch(formData.username)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
        <div className='formSearch'>
            <Input style='searchInput' name="username" control={control} placeholder="🔎 Pesquisar username" />
            <p className="error">{errors?.username?.message}</p>
        </div>
    </form>
  )
}

export {FormSearch}