import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import bgImage from '../../assets/bg_escuro_emba.png'
import { Layout } from '../Layout/Layout'
import { Home } from '../../pages/Home/Home'
import { Campeonatos } from '../../pages/Campeonatos/Campeonatos'
import { Solicitacoes } from '../../pages/Solicitacoes/Solicitacoes'
import { NovoTime } from '../../pages/NovoTime/NovoTime'
import { MeusTimes } from '../../pages/MeusTimes/MeusTimes'
import { Login } from '../../pages/login/Login'
import { Cadastro } from '../../pages/Cadastro/Cadastro'
import { Config } from '../../pages/Config/Config'
import { MeusTimesCapitao } from '../../pages/MeusTimesCapitao/MeusTimesCapitao'
import { AuthContextProvider } from '../../context/context'
import { Classificacao } from '../../pages/classificacao/classificacao'
import { MeusTimesJogador } from '../../pages/MeusTimesJogador/MeusTimesJogador'
import { EditarJogador } from '../../pages/EditarJogador/EditarJogador'
import { Inscrever } from '../../pages/Inscrever/inscrever'
import { Payload } from '../../pages/payload/payload'
import { Obrigado } from '../../pages/obrigado/obrigado'
import { FormStepper } from '../FormStepper/FormStepper'
import { ConvidaQr } from '../../pages/ConvidaQr/ConvidaQr'
import {BuscarJogadores} from '../../pages/BuscarJogadores/BuscarJogadores'

const MainRoutes = () => {
    const isAuth = localStorage.getItem("token")

    return (
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route path='/' element={
                        <Layout navStyle='home'>
                            <Home />
                        </Layout>
                    } />
                    {/* ROTAS DE LOGIN E CADASTRO */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />

                    {/* ROTAS QUE NÃO PRECISAM DE LOGIN */}

                    <Route path='/campeonatos' element={<Layout> <Campeonatos /> </Layout>
                    } />

                    <Route path='/jogadores' element={<Layout> <BuscarJogadores /> </Layout>
                    } />



                    {/* ROTAS QUE O LOGIN É OBRIGÁTORIO */}

                    <Route path='/campeonatos/inscrever/:id_camp' element={isAuth ? <Layout> <Inscrever /> </Layout> : <Login />} />

                    <Route path='/times/convidarQr/:id_jogador' element={isAuth ? <Layout> <ConvidaQr /> </Layout> : <Login />} />

                    {/* ROTA DE CONFIG DE USUARIO */}

                    <Route path='/config' element={isAuth ? <Layout isConfig={true}> <Config /> </Layout> : <Login />
                    } />
                    <Route path='/config/editar/:id_user_edit' element={isAuth ? <Layout> <EditarJogador /> </Layout> : <Login />
                    } />
                    {/* ROTA DE VER PERFIL DE OUTRO USUARIO */}

                    <Route path='/jogadores/:id_user' element={isAuth ? <Layout isConfig={true}> <Config /> </Layout> : <Login />
                    } />

                    {/* ROTAS TIMES */}

                    <Route path='/times/criar' element={isAuth ? <Layout> <NovoTime /> </Layout> : <Login />} />
                    <Route path='/times/meustimes' element={isAuth ? <Layout> <MeusTimes /> </Layout> : <Login />} />
                    <Route path={`/times/meustimes/capitao/:id_time`} element={isAuth ? <Layout> <MeusTimesCapitao /> </Layout> : <Login />
                    } />

                    <Route path={`/times/meustimes/jogador/:id_time`} element={isAuth ? <Layout> <MeusTimesJogador /> </Layout> : <Login />
                    } />


                    {/* ROTAS DE SOLICITAÇÕES */}
                    <Route path='/times/solicitacoes' element={isAuth ? <Layout> <Solicitacoes /> </Layout> : <Login />} />

                    {/* ROTAS DE CLASSIFICAÇÕES */}
                    <Route path='/classificacao' element={isAuth ? <Layout><Classificacao /> </Layout> : <Login />
                    } />

                    <Route path='/obrigado' element={isAuth ?
                        <Layout>
                            <FormStepper component={<Obrigado />} indexStep={3} />
                        </Layout> : <Login />
                    } />


                    {/* ROTA DE PAGAMENTO */}
                    <Route path='/pagamento/:ids' element={isAuth ?
                        <Layout>
                            <FormStepper component={<Payload />} indexStep={1} />
                        </Layout>
                        : <Login />} />

                </Routes>
            </AuthContextProvider>
        </Router >
    )
}

export { MainRoutes }
