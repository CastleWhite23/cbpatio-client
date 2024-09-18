import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Api } from '../../services/Api'
import { AuthContext } from "../../context/context"
import { Link } from 'react-router-dom'
import { SpinnerCustom } from '../Spinner/Spinner'
import { hashId } from '../../services/formatFunctions'


const MeusTimesQr = ({ cargo }) => {

    const [timesCapitao, setTimesCapitao] = useState([])
    const [timesJogador, setTimesJogador] = useState([])
    const { getUserData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [loadingJogador, setLoadingJogador] = useState(true)
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
            setLoadingJogador(false)
            console.log(timesJogador)

        }

        getTimes()
        getTimesJogador()

    }, [])

    return (
        <div className='meus-times'>
                            {
                                timesCapitao.length > 0 ? timesCapitao.map((time) => {
                                    return (

                                        <div>
                                            
                                            
                                            <Link to={`/times/meustimes/capitao/${hashId(time.id_time)}`}>
                                                <Button text={`${time.nome} - Capitão`} variant={"purple"} margin={"10px 0"} height={"4rem"} fontSize={"20px"} />
                                            </Link>

                                        </div>
                                    )
                                }) : (
                                    <>

                                        <h1>Você não é capitão de nenhum time ainda.</h1>
                                        <h1><span className='link darkpurple'><Link to={`/times/criar`}>Crie um time para se tornar capitão! </Link></span></h1>  </>
                                )
                }
        </div>
    )
}

export { MeusTimesQr }
