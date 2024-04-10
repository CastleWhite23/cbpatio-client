import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Api } from '../../services/Api'
import { AuthContext } from "../../context/context"
import { Link } from 'react-router-dom'
import { SpinnerCustom } from '../Spinner/Spinner'
import { hashId } from '../../services/formatFunctions'


const MeusTimesComponent = ({ cargo }) => {

    const [timesCapitao, setTimesCapitao] = useState([])
    const [timesJogador, setTimesJogador] = useState([])
    const { getUserData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    // PEGAR TIMES EM QUE O IDCAPITAO É DIFERENTE DO DO CARA LOGADO

    useEffect(() => {

        const getTimes = async () => {
            const { data: capitao } = await Api.get(`/times/time/capitao/${getUserData().id}`)
            setTimesCapitao(capitao)
            setLoading(false)
        }

        const getTimesJogador = async () => {

            const fetch = await Api.get(`/usuarios/time/userid/${getUserData().id}`)
            const timesJogador = fetch.data
            setTimesJogador(timesJogador)
            console.log(timesJogador)

        }

        getTimes()
        getTimesJogador()

    }, [])

    return (
        <div>
            {
                cargo == "capitao" ?
                    (
                        !loading ?

                            (
                                timesCapitao.map((time) => {
                                    return (
                                        <Link to={`/times/meustimes/capitao/${hashId(time.id_time)}`}>
                                            <Button text={`${time.nome} - Capitão`} variant={"purple"} margin={"10px 0"} height={"4rem"} fontSize={"20px"} />
                                        </Link>
                                    )
                                })
                            )
                            :
                            (
                                <SpinnerCustom />
                            )
                    )

                    :

                    (

                        timesJogador.map((timeJogador) => {
                            return (

                                timeJogador.fkIdCapitao != getUserData().id &&

                                (
                                    <Link to={`/times/meustimes/jogador/${timeJogador.idTime}`}>
                                        <Button text={`${timeJogador.NomeTime} - Jogador`} variant={"purple"} margin={"10px 0"} height={"4rem"} fontSize={"20px"} />
                                    </Link>
                                )
                            )
                        })


                    )
            }
        </div>
    )
}

export { MeusTimesComponent }
