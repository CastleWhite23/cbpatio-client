import './SidebarTimes.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSquarePlus, faUsers } from "@fortawesome/free-solid-svg-icons"

const SidebarTimes = () => {
    const handleActive = (e) => {
        e.currentTarget.classList.add('active')
        console.log(e)
        
    }

    return (
        <>

            <div className="sidebar-times">
                <div className="logo">
                    <Link to='/'><img src={Logo} alt="logo" /></Link>
                </div>
                {/* <Link to='/'>
                    user08
                </Link> */}
                <Link to='/times/criar' id='sideLink' onClick={handleActive}>
                <FontAwesomeIcon icon={faSquarePlus}/>
                    <span>Novo Time</span>
                </Link>
                <Link to='/times/meustimes' id='sideLink'onClick={handleActive}>
                <FontAwesomeIcon icon={faUsers} />
                    <span>Meus Times</span>
                </Link>
                <Link to='/times/solicitacoes' id='sideLink' onClick={handleActive}>
                    <FontAwesomeIcon icon={faBell}/>
                    <span>Solicitações</span>
                </Link>
            </div>
        </>
    )
}


export { SidebarTimes }