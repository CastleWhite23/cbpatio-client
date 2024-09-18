import './HomeLeft.css'
import { CardHome } from '../../components/CardHome/CardHome'


const HomeLeft = () => {
    return (
        <>
            <div className="home-left">
                {/* <div className="setas">
                    &gt; &gt; &gt;
                </div> */}
                <h1><span className='transparent'>O que</span> é o <br /> <span className='cbpatio'>Cbpatio</span>?</h1>
                <div className="cards">
                    <CardHome marginTop={"100px"} />
                    <CardHome marginTop={"-200px"} />
                    <CardHome marginTop={"-600px"} />
                </div>

            </div>
        </>
    )
}


export { HomeLeft }