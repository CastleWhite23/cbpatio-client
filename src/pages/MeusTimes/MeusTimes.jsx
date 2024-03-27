import { DividerComponent } from "../../components/Divider/DividerComponent"
import { MeusTimesComponent } from "../../components/meusTimes/meusTimesComponent"
import { PageTitle } from "../../components/pageTitle/pageTitle"
import { Times } from "../Times/Times"

const MeusTimes = () =>{
    return(
        <Times pageTitle={'MEUS TIMES'}>
            <DividerComponent />
            <PageTitle text={"CAPITÃO"} />
            <MeusTimesComponent />
            <PageTitle text={"JOGADOR"} />
            <MeusTimesComponent />
        </Times>
    )
}

export {MeusTimes}