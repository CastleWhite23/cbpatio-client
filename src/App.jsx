import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import bgImage from './assets/bg_escuro_emba.png'
import { Layout } from './components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './pages/Home/Home'
import { Campeonatos } from './pages/Campeonatos/Campeonatos'
import { Times } from './pages/Times/Times'
// import { PrivateRoute } from './services/privateRoute'
// import { AuthContext, AuthContextProvider } from './context/auth'
// import { Login } from './pages/login/login'

function App() {
  return (
    <Router>
      {/* <AuthContextProvider> */}
      <ChakraProvider>
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
          <Route path='/times' element={
            <Layout>
              <Times />
            </Layout>
          } />

          <Route path='/times/criar' element={
            <Layout>
              <h1>criar</h1>
            </Layout>
          } />

          <Route path='/times/meustimes' element={
            <Layout>
              <h1>meus times</h1>
            </Layout>
          } />

          <Route path='/times/solicitacoes' element={
            <Layout>
              <h1>solicitações</h1>
            </Layout>
          } />






          <Route path='/classificacao' element={
            <Layout>
              <Campeonatos />
            </Layout>
          } />
        </Routes>
      </ChakraProvider>
      {/* </AuthContextProvider> */}
    </Router>
  )
}

export default App
