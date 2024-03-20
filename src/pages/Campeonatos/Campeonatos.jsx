import { PageTitle } from "../../components/pageTitle/pageTitle"
import "./Campeonatos.css"
import { SwiperCampeonatos } from "../../components/swiperCampeonatos/swiperCampeonatos"
import { Link } from "react-router-dom"
const Campeonatos = () =>{
    return(
        <>
            <section className="camp">
                <PageTitle text={"EM DESTAQUE"}/>

                <SwiperCampeonatos />
                
                <h2>Não tem um time? <Link className="link" to={"/times"}>Crie um!</Link></h2>
            </section>
        </>
    )
}


export{Campeonatos}