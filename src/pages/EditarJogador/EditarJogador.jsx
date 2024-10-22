import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Api } from '../../services/Api';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import Logo from '../../assets/logo.png';
import './EditarJogador.css';
import {AuthContext} from '../../context/context'
import {  useToast } from '@chakra-ui/react';
import {PageTitle} from '../../components/pageTitle/pageTitle'

const schema = yup.object({
    nome: yup.string().required('Este campo não pode estar vazio!'),
    nome_usuario: yup.string().required('Este campo não pode estar vazio!'),
    celular: yup.string().required('Este campo não pode estar vazio!'),
    email: yup.string().email('Isso não é um email!').required('Este campo não pode estar vazio!'),
    biografia: yup.string()

}).required()

const EditarJogador = () => {
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState({})
    const navigate = useNavigate();
    const { getUserData } = useContext(AuthContext)
    const toast = useToast()
    useEffect(() => {
        const handleGetUserInfo = async () => {
            const { data } = await Api.get(`/usuarios/${getUserData().id}`)
            setValue('nome', data[0].nome)
            setValue('nome_usuario', data[0].nome_usuario)
            setValue('foto', data[0].foto)
            setValue('email', data[0].email)
            setValue('celular', data[0].celular)
            setValue('biografia', data[0].biografia)
            setUsuario(data[0])
        }

        handleGetUserInfo()

    }, [])


    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const handleEdit = async (formData) => {
        const { nome, nome_usuario, celular, email, foto, biografia } = formData;

        let message = 'Registro atualizado com sucesso!'
        let status='success'
        
        let usuarioData = {}
        let headerOptions = {}

        if(!foto || foto.length == 0){  
            usuarioData = {
                nome: nome,
                nome_usuario: nome_usuario,// Usando usuario.foto como valor padrão se não houver nova foto
                email: email,
                celular: celular,
                biografia: biografia
            }

            headerOptions = {
                headers: {
                   ' Content-Type': 'application/json', // Alterei o tipo de conteúdo para 'application/json'
                },
            }
        }else{
            
            usuarioData = {
                nome: nome,
                nome_usuario: nome_usuario,
                foto:  foto  , // Usando usuario.foto como valor padrão se não houver nova foto
                email: email,
                celular: celular,
                biografia: biografia
            }

            headerOptions = {
                headers: {
                   ' Content-Type': 'multipart/form-data', // Alterei o tipo de conteúdo para 'application/json'
                },
            }
        }

        console.log(usuarioData)
        console.log(headerOptions)
    
        try {
            setLoading(true);

            const req = await Api.put(`/usuarios/atualizar/${getUserData().id}`, usuarioData, headerOptions);
    
            if (req.data.message === "Nome de usuário já cadastrado!") {
              
                 message = 'Nome de usuário já cadastrado!'
                 status='error'
                return;
            }
    
            if (req.data.message === "Email já cadastrado!") {
                 message = 'Email já cadastrado!'
                 status='error'
                return;
            }

            toast({
                title: message,
                position: 'bottom-left',
                status: status,
                duration: 5000,
                isClosable: true,
            })
            navigate('/login');
            localStorage.clear()
            
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const onSubmit = async (formData) => {
        handleEdit(formData);
    };
    
    return (
        <div className="editar-cad">
            <Card variant="editar" width="60%" height="90vh">
                <PageTitle text={'EDITAR CADASTRO'} />
               
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="ct-input">
                        <div>
                            <label htmlFor="login">Nome completo</label>
                            <Input name="nome" control={control} placeholder="Nome completo" defaultValue={usuario.nome} />
                            <p className="error">{errors?.nome?.message}</p>
                        </div>
                        <div className="userinfo">
                            <div>
                                <label htmlFor="login">Nome de Usuário</label>
                                <Input name="nome_usuario" control={control} placeholder="Nome de Usuário" defaultValue={usuario.nome_usuario} />
                                <p className="error">{errors?.nome_usuario?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="login">Celular (xx) xxxxx-xxxx</label>
                                
                                <Controller 
                                    name="celular"
                                    control={control}
                                    render={({ field }) => (
                                        <InputMask mask="(99) 99999-9999" {...field} >
                                            {(inputProps) => <Input name="celular" control={control} placeholder="(99) 99999-9999" defaultValue={usuario.celular} />
                                        }
                                        </InputMask>
                                    )}
                                />
                                <p className="error">{errors?.celular?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="login">Email</label>
                            <Input name="email" control={control} placeholder="Email" defaultValue={usuario.email} />
                            <p className="error">{errors?.email?.message}</p>
                        </div>

                        <div>
                            <label htmlFor="login">Biografia</label>
                            <Input name="biografia" control={control} placeholder="Biografia" defaultValue={usuario.biografia} />
                            <p className="error">{errors?.biografia?.message}</p>
                        </div>

                        <div>
                            <label htmlFor="foto" className="foto">Foto de Perfil</label>
                            <Input name="foto" type="file" control={control} className="img" id="foto" />
                            <p className="error">{errors?.foto?.isPhoto?.message}</p>
                        </div>
                    </div>
                    <Button text={loading ? 'Carregando...' : 'Editar'} variant="green" type={'submit'} width="100%" />
                </form>
                <div className="ct-img">
                    <img src={Logo} alt="logo" />
                </div>
            </Card>
        </div>
    );
    
};

export { EditarJogador };
