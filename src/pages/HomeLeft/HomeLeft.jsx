import './HomeLeft.css'
import { CardHome } from '../../components/CardHome/CardHome'


const HomeLeft = () => {
    return (
        <>
            <div className="home-left">
                {/* <div className="setas">
                    &gt; &gt; &gt;
                </div> */}
                <h1 className='homeh1'><i><span className='transparent'>O que</span> é o </i><span className='cbpatio'>Cbpatio</span>?</h1>
                <div className="cards">
                    <CardHome  titulo={'Maior evento de E-Sports'}/>
                    <CardHome  titulo={'Primeiro evento de E-sports do FP'}/>
                    <CardHome titulo={'Grandes Premiações'}/>
                </div>

            </div>
        </>
    )
}


export { HomeLeft }