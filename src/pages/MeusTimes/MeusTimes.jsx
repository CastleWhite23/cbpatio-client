import { DividerComponent } from "../../components/Divider/DividerComponent"
import { MeusTimesComponent } from "../../components/meusTimes/meusTimesComponent"
import { PageTitle } from "../../components/pageTitle/pageTitle"
import { Times } from "../Times/Times"
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const MeusTimes = () => {
    return (
        <Times pageTitle={'MEUS TIMES'}>
            <PageTitle text={`CAPITÃO `} icon={faCrown} />
            <MeusTimesComponent cargo={"capitao"} />
            <div className="alerta">
                    <p>
                        Você pode <span className="span-cap">criar</span> no máximo <span className="span-cap">10 times</span>
                    </p>
                    <p>
                        Você pode criar seus times clicando em <span className="span-cap"><Link to={'/times/criar'}>Novo Time</Link></span>.
                    </p>
                </div>
            <DividerComponent margin={"3rem 0  0  0"} />
            <PageTitle text={"JOGADOR"} icon={faChessKnight}/>
            <MeusTimesComponent cargo={'jogador'}/>
        </Times>
    )
}

export { MeusTimes }