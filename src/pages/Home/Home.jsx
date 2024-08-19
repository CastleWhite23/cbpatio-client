
import './Home.css'
import { Button } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { socket } from '../../services/socket'
import {HomeLeft} from '../HomeLeft/HomeLeft'

const Home = () => {
    return (
        <>
            <div className="home">
                <h1>CBPatio <br /> E-Sports </h1>
                <p>Prepare-se para uma experiência única de jogo! O CBPatio Arena é o palco virtual onde a emoção acontece em tempo real. </p>
                <Link
                    to={'/campeonatos'}
                >
                    <Button
                        text={'Inscreva-se'}
                        variant={'purple'}
                        width={'200px'}
                        padding={'1rem'}
                    />
                </Link>

            </div>

        </>
    )
}


export { Home }
