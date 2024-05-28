import './SidebarTimes.css'
import { Link, } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSquarePlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/context'
import { Badge } from '@chakra-ui/react'
import { Api } from '../../services/Api'

const SidebarTimes = () => {
    const { getUserData } = useContext(AuthContext)
    const [convite, setConvite] = useState(0)

    useEffect(() => {
        const getConvites = async () => {
            const { data: convite } = await Api.get(`/usuarios/time/convite/${getUserData()?.id}`)
            setConvite(convite.length)
          }
          getConvites()
    }, [])


    return (
        <>

            <div className="sidebar-times">
                <div className="logo">
                    <Link to='/'><img src={Logo} alt="logo" /></Link>
                </div>
                {/* <Link to='/'>
                    user08
                </Link> */}

                <Link to='/times/criar' id='sideLink' >
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span>Novo Time</span>
                </Link>


                <Link to='/times/meustimes' id='sideLink' >
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Meus Times</span>
                </Link>
                <Link to='/times/solicitacoes' id='sideLink' >
                    <FontAwesomeIcon icon={faBell} />
                    <span>Solicitações</span>
                    <Badge borderRadius="full" color={'purple'}>
                        {convite}
                    </Badge>
                </Link>
            </div>
        </>
    )
}


export { SidebarTimes }
