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


const schema = yup.object({
    login: yup.string().email("Informe um email valido!").required('Preencha todos os campos!'),
    senha: yup.string().required('Preencha todos os campos!')
}).required()

const Cadastro = () => {

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
        <div className='cadastro'>
            <div className="logo">
                <Link to='/'><img src={Logo} alt="logo" /></Link>
            </div>
            <Card variant={"purple"} width={"60%"} height={'90vh'}>
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit(onSubmit)}>{/* onSubmit={handleSubmit(onSubmit)} */}
                    <div className='ct-input'>
                        <div>
                            <label htmlFor="login">Nome completo</label>
                            <Input name={"login"} control={control} placeholder={"Nome completo"} />

                            <div className="userinfo">
                                <div>
                                    <label htmlFor="login">Username</label>
                                    <Input name={"login"} control={control} placeholder={"Username"} />
                                </div>
                                <div>
                                    <label htmlFor="login">Celular (xx) xxxxx-xxxx</label>
                                    <Input name={"login"} control={control} placeholder={"Telefone Celular"} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="login">Email</label>
                            <Input name={"login"} control={control} placeholder={"email"} />
                        </div>

                        <div className='passinfo'>
                            <div>
                                <label htmlFor="senha">Senha</label>
                                <Input name={"senha"} type={"password"} control={control} placeholder={"Senha"} />
                            </div>
                            <div>
                                <label htmlFor="senha">Confirmar senha</label>
                                <Input name={"senha"} type={"password"} control={control} placeholder={"senha"} />
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