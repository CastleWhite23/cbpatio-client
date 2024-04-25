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
                {games.length > 0 && <PageTitle text={"Próximos jogos"} />}
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

                {
                    campeao.length == 0 && eliminados.length == 0  ? "" :
                       <>
                            <DividerComponent />
                            <PageTitle text={"Situação Final"} />
                        </>
                }

                {campeao.map((game, index) => (
                    <div className='camp__jogo'>

                        <CardCampeonato
                            type='preview'
                            idCamp={game.id_campeonato}
                            bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}
                            title={game.nome_camp}
                            width={'20%'}
                        />


                        <CardClassificacao
                            data_hora={game.data_hora}
                            fase={game.fase}
                            jogo={game.fase}
                            nome_time={game.nome_time}
                            key={index}
                            nome_time_vs={game.nome_time_vs}
                            campeao={true}
                        />
                    </div>
                ))}


                {eliminados.map((game, index) => (
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
                            eliminado={true}
                            eliminado_em={game.eliminado_em}
                        />
                    </div>
                ))}


            </div>

        </>
    )
}

export { Classificacao }
