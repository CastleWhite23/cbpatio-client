import { useEffect, useState } from "react"
import { DividerComponent } from "../../components/Divider/DividerComponent"
import { MeusTimesComponent } from "../../components/meusTimes/meusTimesComponent"
import { MeusTimesQr } from "../../components/meusTimesQr/MeusTimesQr"
import { PageTitle } from "../../components/pageTitle/pageTitle"
import { Times } from "../Times/Times"
import { faCrown, faChessKnight } from "@fortawesome/free-solid-svg-icons"
import { Link, useParams } from "react-router-dom"
import { Api } from "../../services/Api"

const ConvidaQr = () => {
    const {id_jogador} = useParams();
    const [userInvited, setUserInvited] = useState({})

    useEffect(() => {
        const getUserInvited = async () => {
            const {data} = await Api.get(`/usuarios/${id_jogador}`)
            setUserInvited(data)        
        }

        getUserInvited()
    }, [])

    return (
        <Times pageTitle={'Convite QR Code'}>
            <PageTitle variant="qrcode_text" text={`Escolha o time no qual deseja convidar o user ${userInvited[0]?.nome_usuario}:`} />
            <MeusTimesQr 
            nameUserInvited={userInvited[0]?.nome_usuario}
            idUserInvited={id_jogador}
            />
        </Times>
    )
}

export { ConvidaQr }