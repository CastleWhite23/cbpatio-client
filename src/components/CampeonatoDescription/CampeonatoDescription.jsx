import './CampeonatoDescription.css'
import { Card } from '../Card/Card'
import logo from '../../assets/logo.png'

const CampeonatoDescription = ({ id_camp }) => {
    return (
        <div className="camp-descr">
            <Card variant={"lightpurple"} width={"100%"} >
                <img src={logo} alt="" />
                <h1>DETALHES DO CAMPEONATO</h1>
                <h3>Sobre: asdf</h3>
                <h3>Datas: asdf</h3>
                <h3>Quem pode increver um time: asdf</h3>
                <h3>Limite de jogadores: asdf</h3>
                <h3>Forma de pagamento: asdf</h3>
                <h3>Premiação: asdf</h3>
                <h3>Caso de desistencia e/ou atraso: asdf</h3>
            </Card>
        </div>

    )
}

export { CampeonatoDescription }