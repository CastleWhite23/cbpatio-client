import './SidebarTimes.css'
import { Link, } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSquarePlus, faUsers } from "@fortawesome/free-solid-svg-icons"

const SidebarTimes = () => {


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
                </Link>
            </div>
        </>
    )
}


export { SidebarTimes }