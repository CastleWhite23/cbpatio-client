import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Api } from '../../services/Api'
import { AuthContext } from "../../context/context"
import { Link } from 'react-router-dom'
import { SpinnerCustom } from '../Spinner/Spinner'


const MeusTimesComponent = ({ cargo }) => {

    const [timesCapitao, setTimesCapitao] = useState([])
    const { getUserData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getTimes = async () => {
            const { data: capitao } = await Api.get(`/times/time/capitao/${getUserData().id}`)
            setTimesCapitao(capitao)
            setLoading(false)
        }
        getTimes()
    }, [])

    console.log(timesCapitao)

    return (
        <div>
            {
                cargo == "capitao" ?
                    (
                        !loading ?

                        (
                            timesCapitao.map((time) => {
                                return (
                                    <Link to={`/times/meustimes/capitao/${time.id_time}`}>
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

                    ""
            }
        </div>
    )
}

export { MeusTimesComponent }
