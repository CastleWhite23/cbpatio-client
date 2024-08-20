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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { NickCard } from '../../components/nickCards/NickCard'

//isTheUser é se o usuário está na conta dele ou não. Se ele estiver ele vai poder editar, senão, não.

const Config = ({isTheUser}) => {

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
                        {/* Aqui, abrir um QRCode num modal. */}
                        {/* colocar um popper aqui pro cara ver que é qrcode*/}
                        <div className="centerNicks">
                            <div className="layerOne">
                                <NickCard plataform={'epic'} actualName={'Zaia08'}/>
                                <NickCard plataform={'supercell'} actualName={'Zaia08'}/>
                            </div>
                            
                            <div className="layerTwo">
                                <NickCard plataform={'psn'} actualName={'Zaia08'}/>
                                <NickCard plataform={'xbox'} actualName={'Zaia08'}/>
                            </div>
                        </div>

                        <div className="headerEnd">
                            <Button width={'75px'} height={'20px'} variant={'profileqr'} text={<FontAwesomeIcon icon={faQrcode}/>} />
                            <Button variant={'profile'} text={'Editar perfil'} />
                        </div>


                    </div>
                    
                </div>
                <div className="actions">
                    <div className="bg">
                        <div className="info">
                            {/* PARTE QUE VC VAI COLOCAR UM .MAP PROVAVELMENTE */}
                            <div className='headerProfile'>
                                <div className="leftSide">
                                    <h1 className='username'>{getUserData().nome_completo} </h1>
                                    <p>@{getUserData().nome}</p>
                                    <img width={'80px'} src={stars} alt="" srcset="" />
                                </div>
                                {/* //Arrumar essa opção pra se caso seja vc mesmo, isso nao aparecer. */}
                                <Button text={"Convidar para um time"} variant={'purple'}/>
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