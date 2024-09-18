import { DividerComponent } from "../../components/Divider/DividerComponent"
import { MeusTimesComponent } from "../../components/meusTimes/meusTimesComponent"
import { MeusTimesQr } from "../../components/meusTimesQr/MeusTimesQr"
import { PageTitle } from "../../components/pageTitle/pageTitle"
import { Times } from "../Times/Times"
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons"
import { Link, useParams } from "react-router-dom"

const ConvidaQr = () => {
    const {id_jogador} = useParams();
    
    return (
        <Times pageTitle={'MEUS TIMES'}>
            <PageTitle text={`Você realmente deseja convidar o user ${id_jogador}`} icon={faCrown} />
            <MeusTimesQr />
        </Times>
    )
}

export { ConvidaQr }