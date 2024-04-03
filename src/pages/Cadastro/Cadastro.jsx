import './Cadastro.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { Card } from '../../components/Card/Card'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { AuthContext } from '../../context/context'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@chakra-ui/react'
import { Api } from '../../services/Api'


const schema = yup.object({
    nome_completo: yup.string().required('Preencha todos os campos!'),
    username: yup.string().required("Preencha todos os campos!"),
    celular: yup.string().required("Preencha todos os campos!"),
    email: yup.string().email("Isso não é um email!").required("Preencha todos os campos!"),
    senha: yup.string().required('Preencha todos os campos!'),
    confirmar_senha: yup.string().required('Preencha todos os campos!')
        .oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais!'),
}).shape({
    foto: yup.mixed().test("isPhoto", "O arquivo não é uma foto", (value) => {
        if (!value || !value.length) return true; // Se não houver arquivo, a validação passa
        const file = value[0];
        return file && file.type.startsWith("image/");
      })
      .test("fileSize", "A foto é muito grande!", (value) => {
        if (!value || !value.length) return true; // Se não houver arquivo, a validação passa
        const file = value[0];
        return file && file.size <= 20000000; // 2MB (em bytes)
      })
}).required()

const Cadastro = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })

    const handleCadaster = (formData) => {
        const {nome_completo, username, celular, email, senha, confirmar_senha, foto} = formData
        Api.post('/usuarios/cadastrar', {
            nome: nome_completo,
            nome_usuario: username,
            foto,
            email,
            celular,
            senha
        },
        {
            //NAO APAGUE ISSO AQUI, SEM ISSO NAO ENVIA FOTO.
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        
        )
        window.location.reload()
        navigate('/')
    }


    const onSubmit = async (formData) => {
        try {
            setLoading(true)
            handleCadaster(formData)
            setLoading(false)
        } catch (e) {

        }
        console.log(formData)
    }

    return (
        <div className='cadastro'>
            <div className="logo">
                <Link to='/'><img src={Logo} alt="logo" /></Link>
            </div>
            <Card variant={"purple"} width={"60%"} height={'90vh'}>
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' >{/* onSubmit={handleSubmit(onSubmit)} */}
                    <div className='ct-input'>
                        <div>
                            <p>{errors?.nome_completo?.message}</p>
                            <label htmlFor="login">Nome completo</label>
                            <Input name={"nome_completo"} control={control} placeholder={"Nome completo"} />

                            <div className="userinfo">
                                <div>
                                <p>{errors?.username?.message}</p>
                                    <label htmlFor="login">Username</label>
                                    <Input name={"username"} control={control} placeholder={"Username"} />
                                </div>
                                <div>
                                    {/*TODO aplicar máscara*/}
                                    <p>{errors?.celular?.message}</p>
                                    <label htmlFor="login">Celular (xx) xxxxx-xxxx</label>
                                    <Input name={"celular"} control={control} placeholder={"Telefone Celular"} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <p>{errors?.email?.message}</p>
                            <label htmlFor="login">Email</label>
                            <Input name={"email"} control={control} placeholder={"email"} />
                        </div>

                        <div className='passinfo'>
                            <p>{errors?.confirmar_senha?.message}</p>
                            <div>
                                <label htmlFor="senha">Senha</label>
                                <Input name={"senha"} type={"password"} control={control} placeholder={"Senha"} />
                            </div>
                            <div>
                                <label htmlFor="senha">Confirmar senha</label>
                                <Input name={"confirmar_senha"} type={"password"} control={control} placeholder={"senha"} />
                            </div>
                            <div>
                                <p>{errors?.foto?.isPhoto?.message}</p>
                                <Input name={"foto"} type='file' control={control} placeholder={"senha"} />
                            </div>
                        </div>
                    </div>
                    <Button text={loading ? "carregando..." : "Cadastrar"} variant={"green"} type={"submit"} width={"100%"} />
                    <p className='link-cadastro'>Já possui uma conta? <Link className="link" to={"/login"}>Se inscreva em um campeonato!</Link></p>
                </form>
                <div className='ct-img'>
                    <img src={Logo} alt="logo" />
                </div>

            </Card>
            {/* {erros ? <p id='erro_txt' >{erros}</p> : ""}
            <p id='erro_txt' >{errors?.login?.message}</p> */}
        </div>


    )
}
export { Cadastro }