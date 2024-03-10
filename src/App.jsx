import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import bgImage from './assets/bg_escuro_emba.png'
import { Layout } from './components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './pages/Home/Home'
import { Campeonatos } from './pages/Campeonatos/Campeonatos'
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



          {/* ROTAS QUE O LOGIN É OBRIGÁTORIO */}
          <Route path='/times' element={
            <Layout>
              <Campeonatos />
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
