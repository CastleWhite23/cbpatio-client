import './CardHome.css'
import logo from '../../assets/logo.png'

const CardHome = ({ titulo, descricao, img, marginTop }) => {
    return (
        <>
            <div className="card-home" style={{ marginTop: marginTop }}>
                <div className="img-fundo-card">
                    asdfds
                </div>
                <div className="descricao">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>



            </div>
        </>
    )
}


export { CardHome }