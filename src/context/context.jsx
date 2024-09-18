import { Alert } from "@chakra-ui/react";
import { Api } from "../services/Api";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) =>{
    const [token, setToken] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [erros, setErros] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            
            if(token){
                setIsAuth(true)
                setToken({
                    token
                })
            }
        }

        checkToken()
    }, [])


    const handleLogin = async (loginData) => {
        try{
            const {data} = await Api.post("/usuarios/login", {email: loginData.login, senha: loginData.senha})

            if(data){
                setToken(data)
                localStorage.setItem("token", data)
                
                console.log("logado")
                
                setIsAuth(true)
                
                Api.defaults.headers.Authorization = `Bearer ${data}`
                navigate('/times/meusTimes')
                window.location.reload()
            }else{
                setErros("Email ou senha inválidos")                    
                setTimeout(() => {
                    setErros("")
                }, 3000);
            }
        }catch(e){
            setErros(e)
            setTimeout(() => {
                setErros("")
            }, 2000);
        }
    }

    const getUserData = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken;
            } catch (error) {
                console.error("Erro ao decodificar o token JWT:", error);
                return null;
            }
        } else {
            return null;
        }
    }

    const logoff = () => {
        setIsAuth(false)
        setToken({})
        localStorage.clear()
        navigate('/')
    }


    return(<AuthContext.Provider value={{token, logoff, handleLogin, isAuth, erros, getUserData}}>
        {children}
    </AuthContext.Provider>)
}

