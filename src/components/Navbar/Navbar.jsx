import { Link } from "react-router-dom"
import Logo from '../../assets/logo.png'
import './Navbar.css'
import { Button } from "../Button/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


const Navbar = ({ bgColor }) => {
    const [navOpen, setNavOpen] = useState(false)
    const handleToogleClick = () => {
        const nav = document.querySelector('.navbar')
        nav.classList.toggle("active")
        setNavOpen(!navOpen)
    }



    return (
        <>
            <header style={{
                backgroundColor: bgColor
            }}>
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
                        <Link to='/campeonatos' className="linkStyle">Campeonatos</Link>
                        <Link to='/times' className="linkStyle">Times</Link>
                        <Link to='/classificacao' className="linkStyle">Classificação</Link>
                        <Button
                            text={'Entrar'}
                            variant={'purple'}
                            width={'200px'}
                            padding={'1rem'}
                        />
                    </ul>

                </nav>
                <Button
                    text={'Entrar'}
                    variant={'purple'}
                    width={'88px'}
                    padding={'1rem'}
                />

            </header>

        </>
    )
}


export { Navbar }