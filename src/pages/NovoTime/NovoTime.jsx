import { Times } from "../Times/Times"
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { Link, useNavigate } from "react-router-dom"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Api } from "../../services/Api"
import { AuthContext } from "../../context/context"
import { useToast } from '@chakra-ui/react'

import './NovoTime.css'
import { useContext, useState } from "react";

const schema = yup.object({
    nome: yup.string().min(6, "Seu time deve ter no mínimo 6 caracteres").max(30, "Caracteres acima do permitido!").required('Este campo não pode estar vazio!'),
}).required()

const NovoTime = () => {
    const navigate = useNavigate()

    const { getUserData } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)

    const toast = useToast()

    console.log(getUserData())

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const handleNewTeam = async (formData) => {
        const { nome } = formData
        const req = await Api.post("/times/cadastrar", {
            nome,
            fk_id_capitao: getUserData().id
        })

        if (req.data.message == "Este nome de time já está cadastrado.") {
            alert("Este nome de time já está cadastrado.")
            return
        }

        if(req.data.message == "Você passou do limite de criação de 5 times!"){
            alert("Você passou do limite de criação de 10 times!")
            return
        }

        toast({
            title: 'Time criado com sucesso.',
            description: "Você agora é capitão do time.",
            position: 'bottom-left',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        navigate("/times/meusTimes")
    }

    const onSubmit = (formData) => {
        handleNewTeam(formData)
    }


    return (
        <Times pageTitle={'NOVO TIME'}>
            <div className="novo-time">
                <div className="form">

                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="form-novo-time">
                        <div className="ct-input-novo-time">
                            <div className="userinfo">
                                <div>
                                    <label htmlFor="login">Nome do seu time:</label>
                                    <Input name="nome" control={control} placeholder="nome" />
                                    <p className="error">{errors?.nome?.message}</p>
                                </div>
                            </div>
                            {/* <div>
                                <label htmlFor="foto" className="foto">Foto/Logo do seu time</label>
                                <Input name="foto" type="file" control={control} className="img" id="foto" />
                        
                            </div> */}
                        </div>
                        <Button text={loading ? 'Carregando...' : 'Cadastrar'} variant="green" type="submit" width="100%" />
                    </form>

                </div>

                <div className="alerta">
                    <p>
                        Você pode <span className="span-cap">criar</span> no máximo <span className="span-cap">10 times</span>
                    </p>
                    <p>
                        Criando este time, você será automaticamente o <span className="span-cap">capitão</span>. Seu dever será convidar os integrantes e cadastrar o time nos campeonatos.
                        Você pode convidar seus amigos na aba <span className="span-cap"><Link to={'/times/meustimes'}>“Meus times”</Link></span>.
                    </p>
                </div>

            </div>
        </Times>
    )
}

export { NovoTime }