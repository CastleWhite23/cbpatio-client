import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import bgImage from '../../assets/bg_escuro_emba.png'
import { Layout } from '../Layout/Layout'
import { Home } from '../../pages/Home/Home'
import { Campeonatos } from '../../pages/Campeonatos/Campeonatos'
import { Solicitacoes } from '../../pages/Solicitacoes/Solicitacoes'
import { NovoTime } from '../../pages/NovoTime/NovoTime'
import { MeusTimes } from '../../pages/MeusTimes/MeusTimes'

const MainRoutes = () => {
    return (
      <Router>
        <Routes>
          {/* ROTAS QUE NÃO PRECISAM DE LOGIN */}
          <Route path='/' element={
            <Layout bgImage={bgImage} navStyle='home'>
              <Home />
            </Layout>

          } />
          <Route path='/campeonatos' element={
            <Layout>
              <Campeonatos />
            </Layout>
          } />

          {/* ROTAS DE LOGIN E CADASTRO */}
          <Route path='/login' element={
            <Layout>
              <h1>login</h1>
            </Layout>
          } />

          <Route path='/cadastro' element={
            <Layout>
              <h1>cadastro</h1>
            </Layout>
          } />

          {/* ROTAS QUE O LOGIN É OBRIGÁTORIO */}


          {/* ROTAS TIMES */}

          <Route path='/times/criar' element={
            <Layout>
              <NovoTime />
            </Layout>
          } />

          <Route path='/times/meustimes' element={
            <Layout>
              <MeusTimes />
            </Layout>
          } />

          <Route path='/times/solicitacoes' element={
            <Layout>
              <Solicitacoes />
            </Layout>
          } />
          <Route path='/classificacao' element={
            <Layout>
              <Campeonatos />
            </Layout>
          } />
        </Routes>
      </Router>
    )
}

export { MainRoutes }
