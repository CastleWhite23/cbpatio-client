import { Link } from "react-router-dom"
import Logo from '../../assets/logo.png'
import './Navbar.css'
import { Button } from "../Button/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/context"
import { useLocation } from 'react-router-dom'
import foto from "../../assets/logo.png"


const Navbar = ({ bgColor, isHome }) => {
    const location = useLocation()



    // const styles = {
    //     position: location.pathname == '/' ? 'absolute' : 'initial',
    //     zIndex: location.pathname == '/' ? 2 : 1
    // }



    const path = "https://cbpatio-production.up.railway.app"
    const [navOpen, setNavOpen] = useState(false)
    const handleToogleClick = () => {
        const nav = document.querySelector('.navbar')
        if (document.body.clientWidth <= 925) {

            nav.classList.toggle("active")
            setNavOpen(!navOpen)
        } 

    }

    const { isAuth, getUserData } = useContext(AuthContext)

    useEffect(() => {
        console.log(isAuth)
    }, [isAuth])

    console.log(`${path}/fotoUsuarios/sem_foto_user.png`)



    return (
        <>
            <header  className={isHome == 's' ? 'transparent' : ''}>
                <div className="logo">
                    <Link to='/'><img src={Logo} alt="logo" /></Link>
                </div>
                {/* <div className="bgResponsive"></div> */}
                {
                    !navOpen ? (
                        <FontAwesomeIcon icon={faBars} className="nav-toogle" onClick={handleToogleClick} />
                    ) : (
                        <FontAwesomeIcon icon={faXmark} className="nav-toogle" onClick={handleToogleClick} />
                    )

                }


                <nav className="navbar">
                    <ul>
                        <Link to='/campeonatos' className="linkStyle" onClick={handleToogleClick}>Campeonatos</Link>
                        <Link to='/times/meustimes' className="linkStyle" onClick={handleToogleClick}>Times</Link>
                        <Link to='/classificacao' className="linkStyle" onClick={handleToogleClick}>Classificação</Link>
                        <Link to='/jogadores' className="linkStyle" onClick={handleToogleClick}>Buscar Jogadores</Link>
                        {
                            isAuth

                                ?
                                <Link to={"/config"} onClick={handleToogleClick}>
                                    <div id="user-resp">
                                        <p>{getUserData().nome}</p>
                                        <img src={getUserData()?.foto ? `${path}/${getUserData()?.foto.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="" srcset="" />
                                    </div>
                                </Link>
                                :


                                <Link to={'/login'} onClick={handleToogleClick}>
                                    <Button
                                        text={'Entrar'}
                                        variant={'purple'}
                                        width={'200px'}
                                        padding={'1rem'}
                                    />
                                </Link>
                        }

                    </ul>

                </nav>

                {
                    isAuth

                        ?
                        <Link to={"/config"} onClick={handleToogleClick}>
                            <div id="user">
                                <p>{getUserData().nome}</p>
                                <img src={getUserData()?.foto ? `${path}/${getUserData()?.foto.replace(/\\/g, '/')}` : `${path}/fotoUsuarios/sem_foto_user.png`} alt="" srcset="" />
                            </div>
                        </Link>
                        :
                        <Link to={'/login'} onClick={handleToogleClick}>
                            <Button
                                text={'Entrar'}
                                variant={'purple'}
                                width={'88px'}
                                padding={'1rem'}
                            />
                        </Link>
                }


            </header>

        </>
    )
}


export { Navbar }
