import './Config.css'
import foto from '../../assets/templo.png'
import { Button } from '../../components/Button/Button'
import { useContext } from 'react'
import { AuthContext } from "../../context/context"
import { formatarNumero } from '../../services/formatFunctions'
import { hashId } from '../../services/formatFunctions'
import { Link } from 'react-router-dom'
import { CardCampeonato } from '../../components/cardCampeonato/cardCampeonato'
import stars from "../../assets/stars.png"


const Config = () => {

    const path = "https://cbpatio-production.up.railway.app"

    const { getUserData } = useContext(AuthContext)

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
                    <div className="dados">
                        <img src={getUserData()?.foto ? `${path}/${getUserData()?.foto.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="userfoto" />
                        
                    </div>

                    <div className='profileData'>
                        <h1>{getUserData().nome}</h1>
                    </div>
                    
                </div>
                <div className="actions">
                    <div className="bg">
                        <div className="info">
                            {/* PARTE QUE VC VAI COLOCAR UM .MAP PROVAVELMENTE */}
                            <div className='headerProfile'>
                                <h1 className='username'>{getUserData().nome_completo} </h1>
                                <p>@{getUserData().nome}</p>
                                <img width={'80px'} src={stars} alt="" srcset="" />
                            </div>

                            <p className='biografia'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus fugiat vel officiis recusandae illo, saepe debitis optio quia. Rerum placeat debitis eaque quos temporibus accusamus similique vitae nesciunt ea odio.
                            </p>
                            
                        </div>
                    </div>

                    <CardCampeonato
                        idCamp={2}
                        bgImage={`${path}/fotoCampeonatos/sem-imagem.png`}
                        title={"campeonato.nome"}
                        height={"25rem"}
                        width={"20%"} />
                </div>

            </div>

        </>
    )
}


export { Config }