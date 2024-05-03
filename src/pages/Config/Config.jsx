import './Config.css'
import foto from '../../assets/templo.png'
import { Button } from '../../components/Button/Button'
import { useContext } from 'react'
import {AuthContext} from "../../context/context"
import { formatarNumero } from '../../services/formatFunctions'
import { hashId } from '../../services/formatFunctions'
import { Link } from 'react-router-dom'

const Config = () => {

    const path = "https://cbpatio-production.up.railway.app"

    const {getUserData} = useContext(AuthContext)
    
    const handleDeslogar = () => {
        localStorage.clear()
        window.location.reload()
    }

    console.log(getUserData())

    return (
        <>
            <div className="config">
                <div className="bg-fundo"></div>
                <div className="user">
                    <img src={getUserData()?.foto ? `${path}/${getUserData()?.foto.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="userfoto" />
                    <h1>{getUserData().nome}</h1>
                </div>
                <div className="actions">
                    <div className="info">
                        {/* PARTE QUE VC VAI COLOCAR UM .MAP PROVAVELMENTE */}
                        <p><span>Nome:</span> {getUserData().nome_completo} </p>
                        <p><span>Email:</span> {getUserData().email} </p>
                        <p><span>celular:</span> {formatarNumero(getUserData().celular) || "Você não tem celular cadastrado."} </p>
                        <Link to={`/config/editar/${hashId(getUserData().id)}`}><Button text={"Editar"} variant={"purple"} width={"100%"} /></Link>
                        <Button text={"deslogar"} variant={"red"} width={"100%"} onClick={handleDeslogar}/>
                    </div>
                </div>

            </div>

        </>
    )
}


export { Config }