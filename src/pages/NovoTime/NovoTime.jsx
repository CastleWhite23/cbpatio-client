import { Times } from "../Times/Times"
import './NovoTime.css'
const NovoTime = () => {
    return (
        <Times pageTitle={'NOVO TIME'}>
            <div className="novo-time">
                <div className="form">
                    {/* <form>
                        <div className='ct-input'>
                            <div>
                                <label htmlFor="login">Selecione a logo do seu time:</label>
                                <Input name={"login"} placeholder={"Login"} />
                            </div>

                            <div>
                                <label htmlFor="senha">Nome do seu time:</label>
                                <Input name={"senha"}/>
                            </div>
                        </div>
                        <Button text={"Criar time"} variant={"green"} type={"submit"} width={"100%"} />
                        <p className='link-cadastro'>Ainda não possui uma conta? <Link className="link" to={"/cadastro"}>Crie uma!</Link></p>
                    </form> */}
                </div>
                <div className="alerta">
                    Criando este time, você será automaticamente o <span className="span-cap">capitão</span>. Seu dever será convidar os integrantes e cadastrar o time nos campeonatos.
                    Você pode convidar seus amigos na aba “Meus times”.
                </div>
            </div>
        </Times>
    )
}

export { NovoTime }