import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Api } from '../../services/Api';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Alert } from '@chakra-ui/react';
import Logo from '../../assets/logo.png';
import './Cadastro.css';

const schema = yup.object({
    nome_completo: yup.string().required('Este campo não pode estar vazio!'),
    username: yup.string().required('Este campo não pode estar vazio!'),
    celular: yup.string().required('Este campo não pode estar vazio!'),
    email: yup.string().email('Isso não é um email!').required('Este campo não pode estar vazio!'),
    senha: yup.string().required('Este campo não pode estar vazio!'),
    confirmar_senha: yup.string().required('Este campo não pode estar vazio!')
        .oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais!'),
}).required()

const Cadastro = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const handleCadaster = async (formData) => {
        const { nome_completo, username, celular, email, senha, confirmar_senha, foto } = formData;
        try {
            setLoading(true);
            await Api.post('/usuarios/cadastrar', {
                nome: nome_completo,
                nome_usuario: username,
                foto,
                email,
                celular,
                senha,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/login');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (formData) => {
        handleCadaster(formData);
    };

    return (
        <div className="cadastro">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="logo" />
                </Link>
            </div>
            <Card variant="purple" width="60%" height="90vh">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="ct-input">
                        <div>
                            <label htmlFor="login">Nome completo</label>
                            <Input name="nome_completo" control={control} placeholder="Nome completo" />
                            <p className="error">{errors?.nome_completo?.message}</p>
                        </div>
                        <div className="userinfo">
                            <div>
                                <label htmlFor="login">Username</label>
                                <Input name="username" control={control} placeholder="Username" />
                                <p className="error">{errors?.username?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="login">Celular (xx) xxxxx-xxxx</label>
                                <Controller
                                    name="celular"
                                    control={control}
                                    render={({ field }) => (
                                        <InputMask mask="(99) 99999-9999" {...field}>
                                            {(inputProps) => <input {...inputProps} />}
                                        </InputMask>
                                    )}
                                />
                                <p className="error">{errors?.celular?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="login">Email</label>
                            <Input name="email" control={control} placeholder="Email" />
                            <p className="error">{errors?.email?.message}</p>
                        </div>
                        <div className="passinfo">
                            <div>
                                <label htmlFor="senha">Senha</label>
                                <Input name="senha" type="password" control={control} placeholder="Senha" />
                            </div>
                            <div>
                                <label htmlFor="senha">Confirmar senha</label>
                                <Input name="confirmar_senha" type="password" control={control} placeholder="Senha" />
                                <p className="error">{errors?.confirmar_senha?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="foto" className="foto">Foto de Perfil</label>
                            <Input name="foto" type="file" control={control} className="img" id="foto" />
                            <p className="error">{errors?.foto?.isPhoto?.message}</p>
                        </div>
                    </div>
                    <Button text={loading ? 'Carregando...' : 'Cadastrar'} variant="green" type="submit" width="100%" />
                    <p className="link-cadastro">Já possui uma conta? <Link className="link" to="/login">Faça login!</Link></p>
                </form>
                <div className="ct-img">
                    <img src={Logo} alt="logo" />
                </div>
            </Card>
        </div>
    );
};

export { Cadastro };
