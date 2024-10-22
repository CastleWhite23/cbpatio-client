
import './Home.css'
import { Button } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { socket } from '../../services/socket'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import { HomeLeft } from '../HomeLeft/HomeLeft'

import video from '../../assets/video1.mp4'
import video2 from '../../assets/videoclash.mp4'

const Home = () => {

    const window = useWindowWidth()

    const width = window <= 550 ? true : false;
    console.log(width)

    return (
        <>
            <div className="home">
                <div className="img">



                    <video
                        autoPlay
                        muted
                        loop
                        className={'v-desktop'}>

                        <source src={video} type="video/mp4" />


                    </video>

                    <video
                        autoPlay
                        muted
                        loop
                        className='v-mobile'
                    >
                        <source src={video2} type="video/mp4" />

                    </video>

                </div>

                <div className="texto">
                    <h1>CBPatio <br /> E-Sports </h1>
                    {/* <p>Prepare-se para uma experiência única de jogo! O CBPatio Arena é o palco virtual onde a emoção acontece em tempo real. </p> */}
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


            </div>
            <HomeLeft />

        </>
    )
}


export { Home }