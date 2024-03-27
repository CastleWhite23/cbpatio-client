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
import { PrivateRoute } from '../../services/privateRoute'
import { AuthContextProvider } from '../../context/context'
import { AuthContext } from '../../context/context'
import { useContext } from 'react'

const MainRoutes = () => {
    const isAuth = localStorage.getItem("token")

    return (
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route path='/' element={
                        <Layout bgImage={bgImage} navStyle='home'>
                            <Home />
                        </Layout>
                    } />
                    {/* ROTAS DE LOGIN E CADASTRO */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />}/>

                    {/* ROTAS QUE NÃO PRECISAM DE LOGIN */}

                    <Route path='/campeonatos' element={<Layout> <Campeonatos /> </Layout>
                    } />



                    {/* ROTAS QUE O LOGIN É OBRIGÁTORIO */}


                    {/* ROTAS TIMES */}

                    <Route path='/times/criar' element={isAuth ? <Layout> <NovoTime /> </Layout> : <Login />} />
                    <Route path='/times/meustimes' element={isAuth ? <Layout> <MeusTimes /> </Layout> : <Login />} />
                    <Route path='/times/solicitacoes' element={isAuth?<Layout> <Solicitacoes /> </Layout>: <Login />
                    } />
                    <Route path='/classificacao' element={isAuth ? <Layout><Campeonatos /> </Layout> : <Login />
                    } />

                    
                </Routes>
            </AuthContextProvider>
        </Router >
    )
}

export { MainRoutes }
