import { faBell } from '@fortawesome/free-solid-svg-icons'
import { SpinnerCustom } from '../../components/Spinner/Spinner'
import React, { useContext, useEffect, useState } from 'react'
import { PageTitle } from '../../components/pageTitle/pageTitle'
import { Api } from '../../services/Api'
import "./classificacao.css"
import { LiveOn } from '../../components/liveOn/liveOn'
import { DividerComponent } from '../../components/Divider/DividerComponent'
import { AuthContext } from '../../context/context'
import { CardCampeonato } from '../../components/cardCampeonato/cardCampeonato'
import { formataData, formataHora, getData } from '../../services/getData'
import { CardClassificacao } from '../../components/CardClassificacao/CardClassificacao'
import { Link } from 'react-router-dom'

const path = "https://cbpatio-production.up.railway.app"

const Classificacao = () => {


    const [loading, setLoading] = useState(false)
    const [liveOn, setLiveOn] = useState(false)
    const [games, setGames] = useState([])
    const [campeao, setCampeao] = useState([])

    const [eliminados, setEliminados] = useState([])
    const [data, setData] = useState([])

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
                setLoading(true)
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
                setLoading(false)
            } catch (error) {
                console.error("Ocorreu um erro ao carregar os dados:", error);
            }
        }

        getGames()
        getLiveOn()

    }, []);

    useEffect(() => {
        const getDateElim = async () => {
            const updatedEliminados = [];
            for (const eliminado of eliminados) {
                const eliminado_fase = eliminado.eliminado_em.split(' ');
                console.log(eliminado.fk_id_time, eliminado.fk_id_campeonato, eliminado_fase[1]);
                try {
                    if (eliminado_fase[1] == "semis") {
                        console.log(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/semis`)
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/semis`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });
                    } else if (eliminado_fase[1] == "quartas") {
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/quartas`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });

                    } else if (eliminado_fase[1] == 'oitavas') {
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/quartas`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });
                    } else if (eliminado_fase[1] == 'final') {
                        const { data: date } = await Api.get(`/campeonatos/time/horarioElim/${eliminado.fk_id_time}/${eliminado.fk_id_campeonato}/quartas`);
                        updatedEliminados.push({ ...eliminado, data_hora: date[0]?.data_hora });
                    }
                } catch (error) {
                    console.error('Erro ao obter a data de eliminação:', error);
                    // Se ocorrer um erro, podemos apenas manter os dados existentes do eliminado
                    updatedEliminados.push(eliminado);
                }
            }
            setEliminados(updatedEliminados);
        };

        getDateElim();
    }, [esperando]);


    console.log(eliminados)
    console.log(games.length)
    //console.log(getData())

    return (
        <>
            {
                liveOn

                    ?
                    <>
                        <PageTitle text={`LIVE ON`} icon={faBell} />
                        <LiveOn></LiveOn>
                        <DividerComponent margin={"3rem 0"} />

                    </>

                    :

                    ''
            }
            {
                loading
                    ?
                    <SpinnerCustom />

                    :
                    <>


                        <PageTitle text={'MEUS JOGOS'} />
                        <DividerComponent margin={'3rem 0'} />
                        <div className='div__jogos'>
                            {
                            games.length >= 0 ? <PageTitle text={"Próximos jogos"} /> : (
                                <div>
                                    <h1 className='aviso'>Você não tem nenhum jogo definido no momento.</h1>
                                    <h1 className='aviso'><span className='link darkpurple'><Link to={`/campeonatos`}>Se increva em um campeonato e espere os avisos dos administradores!</Link></span></h1>
                                </div>
                            )}

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
                                            ocorrendo={
                                                formataData(game.data_hora) == formataData(getData()) ? true : false
                                            }
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
                                esperando.map((game, index) =>
                                (

                                    <div className='camp__jogo'>
                                        <CardCampeonato
                                            type='preview'
                                            idCamp={game.id_campeonato}
                                            bgImage={`${path}/${game.foto.replace(/\\/g, '/')}`}
                                            title={game.nome_camp}
                                            width={'20%'} />

                                        <CardClassificacao
                                            ocorrendo={
                                                formataData(game.data_hora) == formataData(getData()) ? true : false
                                            }
                                            data_hora={game.data_hora || game.hora_camp_pre_definido}
                                            fase={"EM BREVE"}
                                            jogo={game.fase}
                                            nome_time={game.nome_time}
                                            key={index}
                                            nome_time_vs={"A DEFINIR"}

                                        />
                                    </div>
                                ))}

                            {
                                campeao.length == 0 && eliminados.length == 0 ? "" :
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
                                        nome_time={game.nome}
                                        key={index}
                                        eliminado={true}
                                        eliminado_em={game.eliminado_em}
                                    />
                                </div>
                            ))}


                        </div>
                    </>
            }

        </>
    )
}

export { Classificacao }
