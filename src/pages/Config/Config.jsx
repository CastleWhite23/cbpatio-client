import './Config.css'
import foto from '../../assets/templo.png'
import { Button } from '../../components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/context"
import { formatarNumero } from '../../services/formatFunctions'
import { hashId } from '../../services/formatFunctions'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CardCampeonato } from '../../components/cardCampeonato/cardCampeonato'
import stars from "../../assets/stars.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { NickCard } from '../../components/nickCards/NickCard'
import { Api } from '../../services/Api'
import { CardConfigPopover } from '../../components/cardConfigPopover/CardConfigPopover'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import { ModalComponent } from '../../components/ModalComponent/ModalComponent'
import {Qrcode} from '../../components/qrcode/qrcode'
import QRCode from 'react-qr-code'

//isTheUser é se o usuário está na conta dele ou não. Se ele estiver ele vai poder editar, senão, não.

const Config = () => {

    const window = useWindowWidth()

    const width = window < 1130 ? '100%' : '20%';
    const widthBtn = window < 1130 ? true : false;

    const [nicksUser, setNicksUser] = useState({})

    const path = "https://cbpatio-production.up.railway.app"

    const navigate = useNavigate()

    const { getUserData } = useContext(AuthContext)

    console.log(innerWidth)

    useEffect(() => {
        const getNicksUser = async () => {
            const {data} = await Api.get(`/usuarios/${getUserData().id}`) 

            setNicksUser(data)
        }

        // function isTheUser(idUser){
        //     if(idUser == id da pagina){
        //         return true
        //     }else{
        //         return false
        //     }
        // }

        // isTheUser(getUserData().id)
        getNicksUser()
    }, [])
    
    console.log(nicksUser[0]?.nick_epic)

    const handleDeslogar = () => {
        localStorage.clear()
        window.location.reload()
    }

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
                                <NickCard idConta={getUserData()?.id} plataform={'epic'} actualName={nicksUser[0]?.nick_epic ?? "Sem conta."}/>
                                <NickCard idConta={getUserData()?.id} plataform={'supercell'} actualName={nicksUser[0]?.nick_supercell  ?? "Sem conta."}/>
                            </div>
                            
                            <div className="layerTwo">
                                <NickCard idConta={getUserData()?.id} plataform={'psn'} actualName={nicksUser[0]?.nick_psn ?? "Sem conta." }/>
                                <NickCard idConta={getUserData()?.id} plataform={'xbox'} actualName={nicksUser[0]?.nick_xbox  ?? "Sem conta." }/>
                            </div>
                        </div>

                        <div className="headerEnd">
                        <ModalComponent width={'75px'} 
                        height={'20px'} 
                        variant={'profileqr'} 
                        openText={<FontAwesomeIcon icon={faQrcode}/>}
                        titulo={'Escaneie este QR Code e convide seu amigo! '}
                        closeText={"Fechar"}
                        soFecha={true}
                        
                        // trocar esse link dps
                        body={<QRCode value={`https://localhost:5173/times/convidarQr/${getUserData().id}`} />}
                        />


                            <Link to={`/config/editar/${getUserData().id}`} className='editar'>
                                <Button width={'100px'} text={"Editar perfil"} variant={"profile"} />
                            </Link>
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
                                    
                                    <div className='at_stars'>
                                        <p>@{getUserData().nome}</p>
                                        <img width={'80px'} src={stars} alt="" srcset="" />
                                    </div>
                                </div>
                                {/* //Arrumar essa opção pra se caso seja vc mesmo, isso nao aparecer. */}
                                <Link to={`/times/convidarQr/${getUserData().id}`}>
                                    <Button text={"Convidar para um time"} variant={'purple'}/>
                                </Link>
                            </div>

                            <p className='biografia'>
                                {getUserData().biografia ?? "O usuário não possui biografia."}
                            </p>

                            <div className="centerNicksMobile">
                                <div className="layerOne">
                                    <NickCard idConta={getUserData()?.id} plataform={'epic'} actualName={nicksUser[0]?.nick_epic ?? "Sem conta."}/>
                                    <NickCard idConta={getUserData()?.id} plataform={'supercell'} actualName={nicksUser[0]?.nick_supercell  ?? "Sem conta."}/>
                                </div>
                                
                                <div className="layerTwo">
                                    <NickCard idConta={getUserData()?.id} plataform={'psn'} actualName={nicksUser[0]?.nick_psn ?? "Sem conta." }/>
                                    <NickCard idConta={getUserData()?.id} plataform={'xbox'} actualName={nicksUser[0]?.nick_xbox  ?? "Sem conta." }/>
                                </div>
                            </div>
                            {
                                widthBtn ?
                                <Link to={`/times/convidarQr/${getUserData().id}`}>
                                    <Button className={'btnConvidar'} text={"Convidar para um time"} variant={'purple'}/>
                                </Link>
                                :
                                ''
                            }


                            
                        </div>
                    </div>

                        <CardCampeonato
                            idCamp={2}
                            bgImage={`${path}/fotoCampeonatos/sem-imagem.png`}
                            title={"Brawl Stars"}
                            height={"25rem"}
                            width={width} 
                            config={true}
                            type={'preview'}
                            />

                </div>


                <div className='achievements'>
                    <div>
                        <CardConfigPopover type={'Participações'} />
                        <CardConfigPopover type={'Troféus'}/>
                    </div>

                    <div>
                        <CardConfigPopover type={'Inscrito atualmente'}/>
                        <CardConfigPopover type={'Times'}/>
                    </div>
                </div>
            </div>

        </>
    )
}


export { Config }