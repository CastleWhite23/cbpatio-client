
import { ChakraProvider } from '@chakra-ui/react'
import { MainRoutes } from './components/MainRoutes/MainRoutes'

// import { PrivateRoute } from './services/privateRoute'
// import { AuthContext, AuthContextProvider } from './context/auth'
// import { Login } from './pages/login/login'

function App() {
  return (
    <ChakraProvider>
      {/* AuthContextProvider */}
      <MainRoutes />
    </ChakraProvider>
  )
}

export default App
