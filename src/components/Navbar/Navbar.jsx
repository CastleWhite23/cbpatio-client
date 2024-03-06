import { Link } from "react-router-dom"
import Logo from '../../assets/logo.png'
import './Navbar.css'
import { Button } from "../Button/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


const Navbar = ({ bgColor }) => {
    const [navOpen, setNavOpen] = useState(false)
    const handleToogleClick = () => {
        const bgResponsive = document.querySelector('.bgResponsive')
        const nav = document.querySelector('.navbar')
        const btnLogin = document.querySelector('button.purple')

        if (!navOpen) {
            bgResponsive.classList.remove('none')

            nav.classList.add('flex')
        } else {
            bgResponsive.classList.add('none')
            nav.classList.remove('flex')
            nav.classList.add('none')
            
        }


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
                <div className="bgResponsive none"></div>
                <FontAwesomeIcon icon={faBars} className="nav-toogle" onClick={handleToogleClick} />

                <nav className="navbar">
                    <ul>
                        <Link to='/campeonatos' className="linkStyle">Campeonatos</Link>
                        <Link to='/times' className="linkStyle">Times</Link>
                        <Link to='/classificacao' className="linkStyle">Classificação</Link>
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