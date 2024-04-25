import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SpinnerCustom } from '../../components/Spinner/Spinner'
import React, { useContext, useEffect, useState } from 'react'
import { PageTitle } from '../../components/pageTitle/pageTitle'
import { Api } from '../../services/Api'
import "./classificacao.css"
import { LiveOn } from '../../components/liveOn/liveOn'
import { DividerComponent } from '../../components/Divider/DividerComponent'
import { AuthContext } from '../../context/context'
import { Card } from '../../components/Card/Card'
import { CardCampeonato } from '../../components/cardCampeonato/cardCampeonato'
import { formataData, formataHora } from '../../services/getData'
import { CardClassificacao } from '../../components/CardClassificacao/CardClassificacao'

const path = "http://localhost:3005"

const Classificacao = () => {

    const [liveOn, setLiveOn] = useState(false)
    const [games, setGames] = useState([])
    const [campeao, setCampeao] = useState([])
    const [eliminados, setEliminados] = useState([])
    const [esperando, setEsperando] = useState([])

    const { getUserData } = useContext(AuthContext)

    useEffect(() => {
        const getLiveOn = async () => {
            const { data: live } = await Api.get('/liveon')

            if (live[0].live_on == 's') {
                setLiveOn(true)
            } else {
                setLiveOn(false)
            }
        }

        const getGames = async () => {
            try {
                const [gamesResponse, campeaoResponse, eliminadosResponse, esperandoResponse] = await Promise.all([
                    Api.get(`/campeonatos/time/times/jogos/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/campeao/user/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/eliminados/user/${getUserData().id}`),
                    Api.get(`/campeonatos/time/times/jogos/esperando/user/${getUserData().id}`)
                ]);

                const games = gamesResponse.data;
                const campeao = campeaoResponse.data;
                const eliminados = eliminadosResponse.data;
                const esperandoData = esperandoResponse.data

                setGames(games);
                setCampeao(campeao);
                setEliminados(eliminados);
                setEsperando(esperandoData)
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
                        <PageTitle text={`LIVE ON`} icon={faBell} />
                        <LiveOn></LiveOn>

                    </>

                    :

                    <SpinnerCustom />
            }
            <DividerComponent margin={"3rem 0"} />
            <PageTitle text={'MEUS JOGOS'} />
            <DividerComponent margin={'3rem 0'} />
            <div className='div__jogos'>
                {
                    games.length > 0

                        ?

                        <>
                            <PageTitle text={"Próximos jogos"} />

                        </>
                        :
                        ""
                }
                {
                    games.map((game, index) => (
                        <div className='camp__jogo'>

                            <CardCampeonato
                                type='preview'
                                idCamp={game.id_campeonato}
                                bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}
                                title={game.nome_camp}
                                width={'20%'} />

                            <CardClassificacao 
                                data_hora={game.data_hora}
                                fase={game.fase}
                                jogo={game.fase}
                                nome_time={game.nome_time}
                                key={index}
                                nome_time_vs={game.nome_time_vs}
                            />
                        </div>
                    ))}

                {esperando.map((game, index) => (
                    <div className='camp__jogo'>

                            <CardCampeonato
                                type='preview'
                                idCamp={game.id_campeonato}
                                bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}
                                title={game.nome_camp}
                                width={'20%'} />
                       
                            <CardClassificacao 
                                data_hora={game.data_hora}
                                fase={game.fase}
                                jogo={game.fase}
                                nome_time={game.nome_time}
                                key={index}
                                nome_time_vs={"A DEFINIR"}
                            />
                    </div>
                ))}

                {
                    campeao.length == 0 && eliminados.length == 0

                        ?
                        ""
                        :
                        <>
                            <DividerComponent />
                            <PageTitle text={"Situação Final"} />
                        </>
                }

                {campeao.map((game) => (
                    <div className='camp__jogo'>

                        <CardCampeonato type='preview' idCamp={1} bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}>

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

                        <CardCampeonato
                            type='preview'
                            idCamp={game.id_campeonato}
                            bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}
                            title={game.nome_camp}
                            width={'20%'} />

                        <Card variant={"darkpurple"} width={"40%"}>
                            <div className='card-main'>
                                <span className='darkpurple'>{
                                    `Já aconteceu em ${formataData(game.data_hora)}`
                                }
                                </span>

                            </div>
                            <DividerComponent />
                            <div className='card-footer'>
                                <h1 className={
                                    (game.eliminado_em.slice(9)) == ' final' ? 'green' :
                                        (game.eliminado_em.slice(9)) == ' semis' ? 'pink' :
                                            (game.eliminado_em.slice(9)) == ' quartas' ? 'orange' :
                                                (game.eliminado_em.slice(9)) == ' oitavas' && 'blue'
                                }>{game.eliminado_em.slice(9)} - <span className='red'>Eliminado</span></h1>
                            </div>
                        </Card>
                    </div>
                ))}


            </div>

        </>
    )
}

export { Classificacao }
