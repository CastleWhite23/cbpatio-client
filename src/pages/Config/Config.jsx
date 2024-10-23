import './Config.css'
import foto from '../../assets/templo.png'
import { Button } from '../../components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/context"
import { decodeHashId, formatarNumero } from '../../services/formatFunctions'
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
import { useParams } from 'react-router-dom'
import { UsersSearched } from '../../components/usersSearched/UsersSearched'
import { SpinnerCustom } from '../../components/Spinner/Spinner'
import { faPen } from '@fortawesome/free-solid-svg-icons'

//isTheUser é se o usuário está na conta dele ou não. Se ele estiver ele vai poder editar, senão, não.

const Config = () => {

    const {id_user: idCript} = useParams()
    const id_user = decodeHashId(idCript)


    const window = useWindowWidth()

    const width = window < 1130 ? '100%' : '20%';
    const widthBtn = window < 1130 ? true : false;
    const widthMobile = window < 530 ? true : false;

    const [nicksUser, setNicksUser] = useState({})
    const [userSearched, setUserSearched] = useState({})
    const [status, setStatus] = useState({})
    const [timesUser, setTimesUser] = useState(0)
    const [loading, setLoading] = useState(true)


    const path = "https://cbpatio-production.up.railway.app"

    const navigate = useNavigate()

    const { getUserData, logoff } = useContext(AuthContext)

    console.log(id_user)

    useEffect(() => {
        const getNicksUser = async () => {
            const {data} = await Api.get(`/usuarios/${getUserData().id}`) 

            setNicksUser(data)
        }

        const geUserSeachedData = async () => {
            const {data: userData} = await Api.get(`usuarios/${id_user}`)

            setUserSearched(userData)
        }

        const getUserStatus = async () => {
            try {
                // Faz todas as requisições ao mesmo tempo
                const [campeaoResponse, timesResponse] = await Promise.all([
                  Api.get(`/campeonatos/time/usuario/campeao/${getUserData().id}`),  // Requisição de campeões
                  Api.get(`/usuarios/time/userid/${getUserData().id}`)               // Requisição de times
                ]);
            
                const campeao = campeaoResponse.data;
                const times = timesResponse.data;
            
                // Agora vamos fazer as requisições de participação para cada time
                const participationPromises = times.map((time) =>
                  Api.get(`/campeonatos/time/usuario/participacao/${time.idTime}/${getUserData().id}`)
                );
            
                // Aguarda todas as promessas de participação serem resolvidas
                const participationResults = await Promise.all(participationPromises);
            
                // Extrai os dados das respostas
                const timesUserData = participationResults.map(({ data: timesUser }) => timesUser);
            
                // Define o status com todos os resultados obtidos
                setStatus({
                  campeao: campeao.length,        // Número de campeonatos vencidos
                  participacao: timesUserData.length, // Número de participações
                  times: times.length             // Número de times do usuário
                });
                setLoading(false)
              } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
              }
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
        geUserSeachedData()
        getUserStatus()
    }, [])


    console.log(timesUser)

    console.log(status)

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
                        <img src={ !id_user ? getUserData()?.foto ? `${path}/${getUserData()?.foto.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png` : userSearched[0]?.foto ? `${path}/${userSearched[0]?.foto.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="userfoto" />
                    </div>

                    <div className='profileData'>
                        {/* Aqui, abrir um QRCode num modal. */}
                        {/* colocar um popper aqui pro cara ver que é qrcode*/}
                        <div className="centerNicks">
                            <div className="layerOne">
                                <NickCard idConta={!id_user ? getUserData()?.id : ""} disabled={id_user ? true : false} plataform={'epic'} actualName={!id_user ? nicksUser[0]?.nick_epic ?? "Sem conta." : userSearched[0]?.nick_epic ?? 'Sem conta'} />
                                <NickCard idConta={!id_user ? getUserData()?.id : ""} disabled={id_user ? true : false} plataform={'supercell'} actualName={!id_user ? nicksUser[0]?.nick_supercell  ?? "Sem conta." : userSearched[0]?.nick_supercell ?? 'Sem conta'}/>
                            </div>
                            
                            <div className="layerTwo">
                                <NickCard idConta={!id_user ? getUserData()?.id : ""} plataform={'psn'} disabled={id_user ? true : false} actualName={!id_user ? nicksUser[0]?.nick_psn ?? "Sem conta." : userSearched[0]?.nick_psn ?? 'Sem conta'}/>
                                <NickCard idConta={!id_user ? getUserData()?.id : ""} plataform={'xbox'} disabled={id_user ? true : false} actualName={!id_user ? nicksUser[0]?.nick_xbox  ?? "Sem conta." : userSearched[0]?.nick_xbox ?? 'Sem conta'} />
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
                        body={<QRCode value={`https://cbpatio.com/times/convidarQr/${ !id_user ? hashId(getUserData().id) : hashId(userSearched[0]?.id_usuario)}`} />}
                        />

                        {
                            !id_user ?   
                            <Link to={`/config/editar/${hashId(getUserData().id)}`} className='editar'>
                                <Button width={!widthMobile ? '150px' : '80px'} text={<span><FontAwesomeIcon icon={faPen}/> {!widthMobile && 'Editar Perfil'}</span>} variant={"profile"} />
                            </Link>

                            :

                            ""
                        }
                        </div>


                    </div>
                    
                </div>
                <div className="actions">
                    <div className="bg">
                        <div className="info">
                            {/* PARTE QUE VC VAI COLOCAR UM .MAP PROVAVELMENTE */}
                            <div className='headerProfile'>
                                <div className="leftSide">
                                    <h1 className='username'>{!id_user ? getUserData().nome_completo : userSearched[0]?.nome} </h1>
                                    
                                    <div className='at_stars'>
                                        <p>@{!id_user ? getUserData().nome : userSearched[0]?.nome_usuario}</p>
                                        <img width={'80px'} src={stars} alt="" srcset="" />
                                    </div>
                                </div>
                                {/* //Arrumar essa opção pra se caso seja vc mesmo, isso nao aparecer. */}
                                {
                                    !id_user ?
                                    ""
                                    :
                                <Link to={`/times/convidarQr/${hashId(userSearched[0]?.id_usuario)}`}>
                                    <Button text={"Convidar para um time"} variant={'purple'}/>
                                </Link>
                                }
                            </div>

                            <p className='biografia'>
                                {!id_user ? getUserData().biografia ?? "O usuário não possui biografia." : userSearched[0]?.biografia ?? "O usuário não possui biografia."}
                            </p>

                            <div className="centerNicksMobile">
                                <div className="layerOne">
                                    <NickCard idConta={getUserData()?.id} plataform={'epic'} disabled={id_user ? true : false} actualName={!id_user ? nicksUser[0]?.nick_epic ?? "Sem conta." : userSearched[0]?.nick_epic ?? 'Sem conta'}/>
                                    <NickCard idConta={getUserData()?.id} plataform={'supercell'} disabled={id_user ? true : false} actualName={!id_user ? nicksUser[0]?.nick_supercell  ?? "Sem conta." : userSearched[0]?.nick_supercell ?? 'Sem conta'}/>
                                </div>
                                
                                <div className="layerTwo">
                                    <NickCard idConta={getUserData()?.id} plataform={'psn'} disabled={id_user ? true : false} actualName={!id_user ? nicksUser[0]?.nick_psn ?? "Sem conta." : userSearched[0]?.nick_psn ?? 'Sem conta'}/>
                                    <NickCard idConta={getUserData()?.id} plataform={'xbox'} disabled={id_user ? true : false} actualName={!id_user ? nicksUser[0]?.nick_xbox  ?? "Sem conta." : userSearched[0]?.nick_xbox ?? 'Sem conta'}/>
                                </div>
                            </div>
                            {
                                widthBtn && id_user ?
                                <Link to={`/times/convidarQr/${getUserData().id}`}>
                                    <Button className={'btnConvidar'} text={"Convidar para um time"} variant={'purple'}/>
                                </Link>
                                :
                                ''
                            }
                            {
                                !id_user
                                ?
                                <Button type={'button'} onClick={logoff} variant={'purple'} text={'Sair'} width={!widthMobile ? '200px' : '100%'} margin={'150px 0 0 0'}/>
                                :
                                ""
                            }
                        </div>
                    </div>

                        <CardCampeonato
                            idCamp={2}
                            bgImage={`${path}/fotoCampeonatos/1729647531648.jpg`}
                            title={"Brawl Stars"}
                            height={"25rem"}
                            width={width} 
                            config={true}
                            type={'preview'}
                            />

                </div>

                {
                 loading ?
                 
                 <SpinnerCustom marginTop={'75px'} />   
                 
                 :
                <>
                    
                    <div className='achievements'>
                        <div>
                            <CardConfigPopover type={'Participações'} value={status.participacao} />
                            <CardConfigPopover type={'Troféus'} value={status.campeao}/>
                        </div>

                        <div>
                            <CardConfigPopover type={'Inscrito atualmente'} value={0}/>
                            <CardConfigPopover type={'Times'} value={status.times}/>
                        </div>
                    </div>

                </>

                }


            </div>

        </>
    )
}


export { Config }