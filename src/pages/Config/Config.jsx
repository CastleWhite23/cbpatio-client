import './Config.css'
import foto from '../../assets/templo.png'
import { Button } from '../../components/Button/Button'

const Config = () => {
    return (
        <>
            <div className="config">
                <div className="bg-fundo"></div>
                <div className="user">
                    <img src={foto} alt="userfoto" />
                    <h1>nomeuser</h1>
                </div>
                <div className="actions">
                    <div className="info">
                        {/* PARTE QUE VC VAI COLOCAR UM .MAP PROVAVELMENTE */}
                        <p><span>Nome:</span> Pedro </p>
                        <p><span>Email:</span> Pedro </p>
                        <p><span>celular:</span> Pedro </p>
                        <p><span>senha:</span> **** </p>
                        <Button text={"Editar"} variant={"purple"} width={"100%"} />
                        <Button text={"deslogar"} variant={"red"} width={"100%"} />
                    </div>
                </div>

            </div>

        </>
    )
}


export { Config }