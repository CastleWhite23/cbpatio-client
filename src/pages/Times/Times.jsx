import { PageTitle } from "../../components/pageTitle/pageTitle"
import "./Times.css"
import { Link } from "react-router-dom"
const Times = () =>{
    return(
        <>
            <section className="camp">
                <PageTitle text={"TIMES"}/>

                
                <h2>Não tem um time? <Link className="link" to={"/times"}>Crie um!</Link></h2>
            </section>
        </>
    )
}


export{Times}