import { DividerComponent } from "../../components/Divider/DividerComponent"
import { MeusTimesComponent } from "../../components/meusTimes/meusTimesComponent"
import { MeusTimesQr } from "../../components/meusTimesQr/MeusTimesQr"
import { PageTitle } from "../../components/pageTitle/pageTitle"
import { Times } from "../Times/Times"
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const ConvidaQr = () => {
    return (
        <Times pageTitle={'MEUS TIMES'}>
            <PageTitle text={`CAPITÃO `} icon={faCrown} />
            <MeusTimesQr />
        </Times>
    )
}

export { ConvidaQr }