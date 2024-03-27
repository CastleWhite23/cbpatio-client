import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Api } from '../../services/Api'
import {AuthContext} from "../../context/context"

const MeusTimesComponent = ({cargo}) => {
  
    const [timesCapitao, setTimesCapitao] = useState([])
    const {getUserData} = useContext(AuthContext)

    useEffect(() => {

        const getTimes = async () => {
            const {data: capitao} = await Api.get(`/times/time/capitao/${getUserData().id}`)
            setTimesCapitao(capitao)
        }
        getTimes()
    }, [])

    console.log(timesCapitao) 

  return (
    <div>
        {
            cargo == "capitao" 

            ?


            timesCapitao.map((time) => {
                return(
                    <Button text={`${time.nome} - Capitão`} variant={"purple"} margin={"10px 0"} height={"4rem"} fontSize={"20px"} />
                )
            })

            :

            ""
        }
    </div>
  )
}

export {MeusTimesComponent}
