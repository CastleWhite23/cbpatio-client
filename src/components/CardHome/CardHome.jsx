import './CardHome.css'
import logo from '../../assets/logo.png'

const CardHome = ({ titulo, descricao, img, marginTop }) => {
    return (
        <>
            <div className="card-home" style={{ marginTop: marginTop }}>
                <div className="img-fundo-card">
                    
                </div>
                <div className="descricao">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="texto">
                        <h1>
                            {titulo}
                        </h1>
                    </div>
                </div>



            </div>
        </>
    )
}


export { CardHome }