import './inscreverEquipe.css'
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Api } from '../../services/Api';
import { useEffect } from 'react';

import { useContext, useState } from "react";
import { AuthContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { hashId } from '../../services/formatFunctions';
import { useToast } from '@chakra-ui/react';
import { SpinnerCustom } from '../Spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { PageTitle } from '../pageTitle/pageTitle'



const schema = yup.object({
    time: yup.string(),
}).required()


const InscreverEquipe = ({ id_campeonato }) => {
    const navigate = useNavigate()
    const toast = useToast()

    const [loading, setLoading] = useState(true)
    const [selectedValues, setSelectedValues] = useState([]);
    const [times, setTimes] = useState([])
    const [campeonato, setCampeonato] = useState([])
    const { getUserData } = useContext(AuthContext)

    useEffect(() => {
        const getTimes = async () => {
            const [times, campeonatos, timesInscritos] = await Promise.all([
                Api.get(`/times/time/capitao/${getUserData().id}`),
                Api.get(`campeonatos/id/${id_campeonato}`)
            ])

            setTimes(times.data)
            setCampeonato(campeonatos.data)
            setLoading(false)
        }
        getTimes()
    }, []);

    console.log(times)
    console.log(campeonato)


    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        console.log(formData)

        if (!selectedValues[0] || !selectedValues[0].id_time) {
            toast({
                title: `Selecione algum time!`,
                position: 'bottom-left',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        const timesNoCampeonatos = await Api.get(`/campeonatos/time/times/${campeonato[0].id_campeonato}`)
        const pessoasTime = await Api.get(`/usuarios/time/${selectedValues[0].id_time}`)


        if (pessoasTime.data.length > 0) {
            for (const pessoa of pessoasTime.data) {
                const { data: existe } = await Api.get(`/campeonatos/time/usuario/existe/${pessoa.idUser}/${campeonato[0].id_campeonato}`)
                console.log(existe)
                if (existe.length > 0) {
                    toast({
                        title: `Seu time já tem um integrante inscrito!`,
                        position: 'bottom-left',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                    return
                }
            }
        }

        if (timesNoCampeonatos.data.length >= campeonato[0].jogadores) {
            toast({
                title: `O limite de times inscritos no campeonato já foi atingido`,
                position: 'bottom-left',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        if (pessoasTime.data.length != campeonato[0].jogadores) {
            alert(`Os jogadores para este campeonato são de ${campeonato[0].jogadores}`)
            return
        }

        toast({
            title: `Indo para pagamento!`,
            position: 'bottom-left',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        navigate(`/pagamento/${hashId(`${campeonato[0].id_campeonato}-${selectedValues[0].id_time}`)}`)
    }

    const handleSelectChange = (id, name, event) => {
        // Define o novo valor selecionado
        const newValue = { "id": id, "id_time": event.target.value, "name": name };
        // Atualiza o estado mantendo apenas o último valor para o checkbox correspondente
        setSelectedValues(prevState => {
            // Filtra os valores antigos removendo o valor do checkbox atual
            const filteredValues = prevState.filter(value => value.id !== id);
            // Retorna um novo array com o novo valor adicionado
            return [...filteredValues, newValue];
        }
        )
    };

    // TEM QUE TER VERIFICAÇÃO SE O USERNAME JA FAZ PARTE DO TIME
    return (
        <>
            {loading ? <SpinnerCustom /> :
                <div className="inscrever-equipe">
                    {

                        <>
                            <PageTitle text={campeonato[0].nome} />
                            <form onSubmit={handleSubmit(onSubmit)} >

                                <div>
                                    <select name="time" onChange={(e) => handleSelectChange(0, `jogo 1 oitavas (casa)`, e)}>
                                        <option value="">Selecione seu melhor time!</option>
                                        {times.map((time) => (
                                            <option value={time.id_time}>
                                                {time.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="error">{errors?.time?.message}</p>
                                </div>
                                <Button text={loading ? <SpinnerCustom /> : <FontAwesomeIcon icon={faRightLong} />} variant="purple" type="submit" width="60px" height={'60px'} borderRadius={'100%'} />
                            </form>
                        </>

                    }

                </div>
            }
        </>

    )
}

export { InscreverEquipe }