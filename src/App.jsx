
import { ChakraProvider } from '@chakra-ui/react'
import { MainRoutes } from './components/MainRoutes/MainRoutes'

// import { PrivateRoute } from './services/privateRoute'
import { AuthContext, AuthContextProvider } from './context/context'
// import { Login } from './pages/login/login'

function App() {
  return (
    <ChakraProvider>
        <MainRoutes />
    </ChakraProvider>
  )
}

export default App
