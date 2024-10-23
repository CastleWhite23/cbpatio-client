import './HomeLeft.css'
import { CardHome } from '../../components/CardHome/CardHome'
import nerd from "../../assets/nerd.avif"
import brawl from '../../assets/maiorevento.png'
import porco from '../../assets/porco.png'



const HomeLeft = () => {
    return (
        <>
            <div className="home-left">
                {/* <div className="setas">
                    &gt; &gt; &gt;
                </div> */}
                <h1 className='homeh1'><i><span className='transparent'>O que</span> é o </i><span className='cbpatio'>Cbpatio</span>?</h1>
                <div className="cards">
                    <CardHome img={nerd} titulo={'Maior evento de E-Sports'}/>
                    <CardHome img={brawl} titulo={'Primeiro evento de E-sports do FP'}/>
                    <CardHome img={porco} titulo={'Grandes Premiações'}/>
                </div>

            </div>
        </>
    )
}


export { HomeLeft }