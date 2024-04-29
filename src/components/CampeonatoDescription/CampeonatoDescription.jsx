import './CampeonatoDescription.css'
import { Card } from '../Card/Card'
import logo from '../../assets/logo.png'
import { useEffect, useState } from 'react'
import { Api } from '../../services/Api'
import { formataData, formataHora } from '../../services/getData'
import { formataDinheiro } from '../../services/formatFunctions'

const CampeonatoDescription = ({ id_camp }) => {
    const [campeonato, setCampeonato] = useState([])

    useEffect(() => {
        const getCampeonato = async () => {
            const {data: camp} = await Api.get(`/campeonatos/id/${id_camp}`)

            setCampeonato(camp)
        }
        getCampeonato()

    }, [])
    console.log(campeonato[0])
    
    return (
        <div className="camp-descr">

            <div className="logo">
                <img src={logo} alt="" />
                <h1>AVISOS DO
                    <br />CAMPEONATO</h1>
            </div>

            <div className='descricao'>
                <h3><span className='tit-descricao'>Datas: </span> As inscrições deste campeonato vão até <span className="descri-destaque">01/07/2024 (data estática)</span>, e a data de stream do campeonato será definida pelo administrador! </h3>

                <h3><span className='tit-descricao'>Quem pode increver um time:</span> Você precisa ser um <span className='descri-destaque'>capitão</span> para inscrever um time e realizar o pagamento.</h3>

                <h3><span className='tit-descricao'>Limite de jogadores:</span> : Este campeonato só aceita times com<span className="descri-destaque"> {campeonato[0]?.jogadores} integrante(s)</span>. Os limites de jogadores são dinamicamente alocados para o campeonato.</h3>

                <h3><span className='tit-descricao'>Forma de pagamento:</span>  Por enquanto o CBPATIO só aceita pagamentos por <span className="descri-destaque">PIX.</span> Estamos trabalhando em atualizações do gênero (em breve aceitaremos moedas de <span className="descri-destaque">ouro & prata</span>)</h3>

                <h3><span className='tit-descricao'>Premiação:</span> A premiação do campeonato  é de <span className="descri-destaque">{formataDinheiro(campeonato[0]?.premiacao)}</span> Será pago via <span className="descri-destaque">PIX</span> pelos organizadores, então deixe seu <span className="descri-destaque">contato em dia.</span></h3>

                <h3><span className='tit-descricao'>Caso de desistencia e/ou atraso:</span>  Você tem <span className="descri-destaque">10 (DEZ) minutos de tolerância</span> para entrar no jogo e deixar tudo pronto. Caso não cumpra com o horário, você receberá <span className="descri-destaque">W.O</span> e será <span className="descri-destaque">eliminado</span>.</h3>
            </div>


        </div>

    )

}

export { CampeonatoDescription }