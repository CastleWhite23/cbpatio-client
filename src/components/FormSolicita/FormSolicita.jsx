import './FormSolicita.css'
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


const schema = yup.object({
    // username: yup.string().min(6, "Seu time deve ter no mínimo 6 caracteres").max(30, "Caracteres acima do permitido!").required('Este campo não pode estar vazio!'),
}).required()


const FormSolicita = ({ idTime }) => {

    const {getUserData} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userSolicitation, setUserSolicitation] = useState([])
    const toast = useToast()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });



    const handleSolicitation = async (userId) => {
        try {
            setLoading(true);
            const hora_envio = getData()

            const {data: jaEnviou} = await Api.get(`/usuarios/time/jaEnviou/${userId}/${idTime}`)

            if(jaEnviou.length > 0){
                toast({
                    title: 'Você já enviou uma solicitação à este usuário!',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)
                return
            }

            if(getUserData().id == userId){
                toast({
                    title: 'Você não pode mandar uma solicitação a si mesmo seu trouxa!',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)
                return
            }

            if(!userId){
                toast({
                    title: 'Usuário não encontrado!',
                    position: 'bottom-left',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false)

                return
            }

            const envio = await Api.post('/usuarios/time/convidar', {
                fk_id_usuario: userId,
                fk_id_time: idTime,
                aceitou: 'n',
                hora_envio: hora_envio
            });

            toast({
                title: 'Solicitação enviada com sucesso!',
                position: 'bottom-left',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

        } catch (error) {
            toast({
                title: 'Erro ao enviar solicitação!',
                position: 'bottom-left',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }

        setLoading(false)
    }

    const handleGetUserId = async (username) => {
        try {
            const fetch = await Api.get(`/usuarios/nome/${username}`);
            const usuario =  fetch.data
            if(fetch.data > 0) return ""
            return usuario[0].id_usuario
        } catch (error) {
            console.log(error)
        }

    }

    const onSubmit = async (formData) => {
        const idUsuario = await handleGetUserId(formData.username)
        console.log(idUsuario)
        handleSolicitation(idUsuario)
    }

    // TEM QUE TER VERIFICAÇÃO SE O USERNAME JA FAZ PARTE DO TIME
    return (
        <>
            <div className="form-solicita">
                <h1>Adicionar Jogador</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <Input name="username" control={control} placeholder="username" />
                        <p className="error">{errors?.username?.message}</p>
                    </div>
                    <Button text={loading ? 'Carregando...' : 'Enviar Solicitação'} variant="green" type="submit" width="100%" height={'60px'} />
                </form>
                <p>Quado você digitar o <span>nome do usuário</span> e clicar em <span>enviar</span>, chegará uma <span>notificação</span> a ele, se ele <span>aceitar</span> fará parte do time!</p>
            </div>
        </>
    )
}

export { FormSolicita }