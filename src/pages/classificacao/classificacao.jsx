import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useContext, useEffect, useState} from 'react'
import { PageTitle } from '../../components/pageTitle/pageTitle'
import { Api } from '../../services/Api'
import "./classificacao.css"
import { LiveOn } from '../../components/liveOn/liveOn'
import { DividerComponent } from '../../components/Divider/DividerComponent'
import { AuthContext } from '../../context/context'
import { Card } from '../../components/Card/Card'

const Classificacao = () => {

    const [liveOn, setLiveOn] = useState(false)
    const [games, setGames] = useState([])

    const {getUserData} = useContext(AuthContext)
  
    useEffect(() => {
        const getLiveOn = async () => {
            const {data: live} = await Api.get('/liveon')
            
            if(live[0].live_on == 's'){
                setLiveOn(true)
            }else{
                setLiveOn(false)
            }
        }

        const getGames = async () => {
            const {data: games} = await Api.get(`/campeonatos/time/times/jogos/${getUserData().id}`)
            setGames(games)
        }

        getGames()
        getLiveOn()
    }, []);
    console.log(games)

    return (
        <>
            {
                liveOn     
                
                ?
                <>
                    <PageTitle text={`LIVE ON`} icon={faBell}/>
                    <DividerComponent margin={"1rem 0"}/>
                    <LiveOn></LiveOn>
                </>
                
                :
                
                ""
            }
            <DividerComponent margin={"1rem 0"}/>
            <PageTitle text={'SEUS JOGOS'}/>
            <div className='div__jogos'>
                {games.map((game) => (
                    <Card variant={"darkpurple"} width={"40%"}>
                        <h1>JOGO {game.jogo}</h1>
                        <DividerComponent />
                        <div>
                            <span>{game.data_hora}</span>

                            <div>
                                <h2>{game.nome_time}</h2>
                                <span>VS.</span>
                                <h2>{game.nome_time_vs}</h2>
                            </div>

                            <span>COMEÇA ÀS {game.data_hora}</span>

                            <DividerComponent />
                            <h1></h1>
                        </div>
                    </Card>
                ))}
            </div>

        </>
    )
}

export {Classificacao}
