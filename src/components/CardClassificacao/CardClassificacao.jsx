import { Card } from "../Card/Card"
import { DividerComponent } from "../Divider/DividerComponent"
import { formataData, formataHora } from '../../services/getData'

import './CardClassificacao.css'

const CardClassificacao = ({jogo, data_hora, fase, nome_time, nome_time_vs}) => {


    return(


                            <Card variant={"darkpurple"} width={"40%"}>
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

export {CardClassificacao}