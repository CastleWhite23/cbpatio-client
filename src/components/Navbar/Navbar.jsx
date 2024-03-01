import { Link } from "react-router-dom"
import Logo from '../../assets/logo.png'
import './Navbar.css'
import { Button } from "../Button/Button"

const Navbar = ({ bgColor }) => {

    const linkStyle = {
        color: '#fff',
        fontWeight: '600',
    }


    return (
        <>
            <header style={{
                backgroundColor: bgColor
            }}>
                <div className="logo">
                    <Link to='/'><img src={Logo} alt="logo" /></Link>
                </div>
                <nav>
                    <ul>
                        <Link to='/campeonatos' style={linkStyle}>Campeonatos</Link>
                        <Link to='/times' style={linkStyle}>Times</Link>
                        <Link to='/classificacao' style={linkStyle}>Classificação</Link>
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