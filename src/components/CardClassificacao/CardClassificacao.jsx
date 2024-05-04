import { Card } from "../Card/Card"
import { DividerComponent } from "../Divider/DividerComponent"
import { formataData, formataHora } from '../../services/getData'

import './CardClassificacao.css'

const CardClassificacao = ({ ocorrendo = false, jogo, data_hora, fase, nome_time, nome_time_vs, eliminado = false, eliminado_em = "", campeao = false }) => {

  
    return (
        campeao ? (
            <Card variant={"darkpurple"} width={"40%"}>
                <div className='card-main'>
                    <div>
                        <h2 className='greenlight'>{nome_time}</h2>
                    </div>
                </div>
                <DividerComponent />
                <div className='card-footer'>
                    <h1 className="green">{"Campeão"}</h1>
                </div>
            </Card>

        ) : eliminado ? (
            <Card variant={"darkpurple"} width={"40%"}>
                <div className='card-main'>
                    <span className='darkpurple'>{
                        `Já aconteceu em ${formataData(data_hora)}`
                    }
                    </span>

                    <div>
                        <h2 className='greenlight'>{nome_time}</h2>
                    </div>
                </div>
                <DividerComponent />
                <div className='card-footer'>
                    <h1 className={
                        (eliminado_em.slice(9)) == ' final' ? 'green' :
                            (eliminado_em.slice(9)) == ' semis' ? 'pink' :
                                (eliminado_em.slice(9)) == ' quartas' ? 'orange' :
                                    (eliminado_em.slice(9)) == ' oitavas' && 'blue'
                    }>{eliminado_em.slice(9)} - <span className='red'>Eliminado</span></h1>
                </div>
            </Card>
        ): ocorrendo ? (
            <Card variant={ "lightpurple"} width={"40%"}>
                <div className='card-header'>
                    <h1 className='twodarkpurple'>JOGO OCORRENDO!</h1>
                </div>
                <DividerComponent />
                <div className='card-main'>
                    <span className='twodarkpurple'>{
                        data_hora != '' ?
                            `Vai acontecer em ${formataData(data_hora)}` :
                            "Data ainda não definida!"
                    }
                    </span>

                    <div>
                        <h2 className='greenlight'>{nome_time}</h2>
                        <span>VS.</span>
                        <h2 className='reddark'>{nome_time_vs}</h2>
                    </div>

                    <span className='twodarkpurple'>{
                        data_hora != null ?
                            `Vai começar às ${formataHora(data_hora)}` :
                            "Hora ainda não definida!"
                    }
                    </span>
                </div>
                <DividerComponent />
                <div className='card-footer'>
                    <h1 className={
                        fase == 'final' ? 'green' :
                            fase == 'semis' ? 'pink' :
                                fase == 'quartas' ? 'orange' :
                                    fase == 'oitavas' && 'blue'
                    }>{fase}</h1>
                </div>
            </Card>
        ) :


            <Card variant={ocorrendo ? "lightpurple" : "darkpurple"} width={"40%"}>
                <div className='card-header'>
                    <h1>JOGO {jogo}</h1>
                </div>
                <DividerComponent />
                <div className='card-main'>
                    <span className='darkpurple'>{
                        data_hora != null ?
                            `Vai acontecer em ${formataData(data_hora)}` :
                            "Data ainda não definida!"
                    }
                    </span>

                    <div>
                        <h2 className='greenlight'>{nome_time}</h2>
                        <span>VS.</span>
                        <h2 className='red'>{nome_time_vs}</h2>
                    </div>

                    <span className='darkpurple'>{
                        data_hora != null ?
                            `Vai começar às ${formataHora(data_hora)}` :
                            "Hora ainda não definida!"
                    }
                    </span>
                </div>
                <DividerComponent />
                <div className='card-footer'>
                    <h1 className={
                        fase == 'final' ? 'green' :
                            fase == 'semis' ? 'pink' :
                                fase == 'quartas' ? 'orange' :
                                    fase == 'oitavas' && 'blue'
                    }>{fase}</h1>
                </div>
            </Card>

    )
}

export { CardClassificacao }