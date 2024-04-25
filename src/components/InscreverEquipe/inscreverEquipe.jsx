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


const schema = yup.object({
    time: yup.string(),
}).required()


const InscreverEquipe = ({id_campeonato}) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [selectedValues, setSelectedValues] = useState([]);
    const [times, setTimes] = useState([])
    const [campeonato, setCampeonato] = useState([])
    const {getUserData} = useContext(AuthContext)

    useEffect(() => {
        const getTimes = async () => {
           const [times, campeonatos, timesInscritos] = await Promise.all([
            Api.get(`/times/time/capitao/${getUserData().id}`),
            Api.get(`campeonatos/id/${id_campeonato}`)
           ])
            
            setTimes(times.data)
            setCampeonato(campeonatos.data)
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
        
        if(!selectedValues[0].id_time){
            alert(`seleciona alguma coisa krl ${JSON.stringify(selectedValues)}`)
            return
        }

        const timesNoCampeonatos = await Api.get(`/campeonatos/time/times/${campeonato[0].id_campeonato}`)
        const pessoasTime = await Api.get(`/usuarios/time/${selectedValues[0].id_time}`)


        if(pessoasTime.data.length > 0){
            for(const pessoa of pessoasTime.data){
                const {data: existe} = await Api.get(`/campeonatos/time/usuario/existe/${pessoa.idUser}/${campeonato[0].id_campeonato}`)
                console.log(existe)
                if(existe.length > 0){
                    alert("Seu time já tem uma pessoa cadastrada no campeonato")
                    return
                }
            }
        }

        if(timesNoCampeonatos.data.length >= campeonato[0].jogadores){
            alert("O limite de times inscritos no campeonato já foi atingido")
            return
        }

        if(pessoasTime.data.length != campeonato[0].jogadores){
            alert(`Os jogadores para este campeonato são de ${campeonato[0].jogadores}`)
            return
        }

        alert(`Indo para pagamento...`)
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
            <div className="form-solicita">
                <h1>Inscrever</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <select name="time" onChange={(e) => handleSelectChange(0, `jogo 1 oitavas (casa)`, e)}>
                            <option value="">Selecione sua melhor equipe!</option>
                            {times.map((time) => (
                                <option value={time.id_time}>
                                    {time.nome}
                                </option>
                            ))}
                        </select>
                        <p className="error">{errors?.username?.message}</p>
                    </div>
                    <Button text={loading ? 'Carregando...' : 'Ir para pagamento'} variant="green" type="submit" width="100%" height={'60px'} />
                </form>
            </div>
        </>
    )
}

export { InscreverEquipe }