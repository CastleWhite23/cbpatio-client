

import './SidebarTimes.css'
import { Link, } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSquarePlus, faUsers, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/context'
import { Badge } from '@chakra-ui/react'
import { Api } from '../../services/Api'
import { Button } from '../Button/Button'

const SidebarTimes = () => {
    const { getUserData } = useContext(AuthContext)
    const [convite, setConvite] = useState(0)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const getConvites = async () => {
            const { data: convite } = await Api.get(`/usuarios/time/convite/${getUserData()?.id}`)
            setConvite(convite.length)
        }
        getConvites()
    }, [])


    return (
        <>
            <div className={`sidebar-times ${open ? 'open' : ''}`}>
                <div className="links">
                    <div className="logo">
                        <Link to='/'><img src={Logo} alt="logo" /></Link>
                    </div>

                   <FontAwesomeIcon icon={faChevronCircleRight} onClick={() => setOpen(!open)} className='open'/>



                    <Link to='/times/criar' id='sideLink' >
                        <FontAwesomeIcon icon={faSquarePlus} />
                        <span >{open ? 'Novo Time' : ''}</span>
                    </Link>


                    <Link to='/times/meustimes' id='sideLink' >
                        <FontAwesomeIcon icon={faUsers} />
                        <span > {open ? 'Meus Times' : ''}
                        </span>
                    </Link>
                    <Link to='/times/solicitacoes' id='sideLink' >
                        <FontAwesomeIcon icon={faBell} />
                        <span >{open ? 'Solicitações' : ''}
                        </span>

                    </Link>
                </div>


        
            </div>




        </>
    )
}


export { SidebarTimes }
