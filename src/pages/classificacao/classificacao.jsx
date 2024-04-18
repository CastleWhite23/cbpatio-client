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
import { CardCampeonato } from '../../components/cardCampeonato/cardCampeonato'

const path = "http://localhost:3005"

const Classificacao = () => {

    const [liveOn, setLiveOn] = useState(false)
    const [games, setGames] = useState([])
    const [campeao, setCampeao] = useState([])
    const [eliminados, setEliminados] = useState([])

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
            try {
                const [gamesResponse, campeaoResponse, eliminadosResponse] = await Promise.all([
                    Api.get(`/campeonatos/time/times/jogos/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/campeao/user/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/eliminados/user/${getUserData().id}`)
                ]);
            
                const games = gamesResponse.data;
                const campeao = campeaoResponse.data;
                const eliminados = eliminadosResponse.data;
            
                setGames(games);
                setCampeao(campeao);
                setEliminados(eliminados);
            } catch (error) {
                console.error("Ocorreu um erro ao carregar os dados:", error);
            }
        }

        getGames()
        getLiveOn()
    }, []);
    console.log(eliminados)

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
                <div className='div__camp'>

                </div>
                {
                    games.length > 0
                    
                    ?

                    <>
                        <PageTitle text={"À acontecer"}/>
                        <DividerComponent />
                    </>
                    :
                    ""
                }
                {games.map((game) => (
                    <div className='camp__jogo'>

                        <CardCampeonato idCamp={1} bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}>

                        </CardCampeonato>

                        <Card variant={"darkpurple"} width={"40%"}>
                            <h1>JOGO {game.jogo} - {game.fase}</h1>
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
                    </div>
                ))}

                <DividerComponent />    
                <PageTitle text={"Situação final"}/>

                {campeao.map((game) => (
                    <div className='camp__jogo'>

                        <CardCampeonato idCamp={1} bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}>

                        </CardCampeonato>

                        <Card variant={"darkpurple"} width={"40%"}>
                            <h1>JOGO {game.jogo} - {game.fase}</h1>
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
                    </div>
                ))}


                {eliminados.map((game) => (
                    <div className='camp__jogo'>

                        <CardCampeonato idCamp={1} bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}>

                        </CardCampeonato>

                        <Card variant={"darkpurple"} width={"40%"}>
                            <h1>JOGO {game.jogo} - {game.eliminado_em}</h1>
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
                    </div>
                ))}

                
            </div>

        </>
    )
}

export {Classificacao}
