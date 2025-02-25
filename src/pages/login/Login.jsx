import './Login.css'
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


const schema = yup.object({
    login: yup.string().email("Informe um email valido!").required('Preencha todos os campos!'),
    senha: yup.string().required('Preencha todos os campos!')
}).required()

const Login = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { handleLogin, erros } = useContext(AuthContext)


    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })


    const onSubmit = async (formData) => {
        try {
            setLoading(true)
            handleLogin(formData)
            setLoading(false)
        } catch (e) {

        }
        console.log(formData)
    }


    return (
        <div className='login'>
            <div className="logo">
                <Link to='/'><img src={Logo} alt="logo" /></Link>
            </div>
            <Card variant={"purple"} width={"35%"} height={'80vh'}>
                <h2><img src={Logo} alt="logo" /> Cbpatio </h2>
                <form onSubmit={handleSubmit(onSubmit)}>{/* onSubmit={handleSubmit(onSubmit)} */}

                    <div className='ct-input'>
                       
                        <div>                            
                            {erros ? <p id='erro_txt' >{erros}</p> : ""} 
                            <p id='erro_txt' >{errors?.login?.message}</p>
                            <Input name={"login"} control={control} placeholder={"Email"} />
                        </div>

                        <div>
                            <Input name={"senha"} type={"password"} control={control} placeholder={"Senha"} />
                        </div>
                    </div>
                    <Button text={loading ? "carregando..." : "Entrar"} variant={"purple"} type={"submit"} width={"100%"} />
                    <p className='link-cadastro'>Ainda não possui uma conta? <Link className="link" to={"/cadastro"}>Crie uma!</Link></p>
                    <p className='link-cadastro'>Esqueçeu sua senha? <Link className="link" to={"/trocar"}>Clique aqui!</Link></p>
                </form>
            

            </Card>

        </div>
    )
}
export { Login }