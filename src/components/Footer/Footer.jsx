import './Footer.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
    return (
        <div className="footer">
            {/* <div className="img">
              
            </div> */}
            <div className='footer-content'>
                {/* <div className="links-footer">
                    todos os links em colunas
                    links
                    patriocinadores
                    desenvolvedores
                    compania
                    blog
                    contatos

                </div> */}
                <div className="titulo">
                    <img src={logo} alt="" />
                    <h1>
                        <span>Água</span> não se mistura com óleo e <br /> <span>nem nóis</span> com <span>comédia!</span>
                    </h1>

                </div>

                <div className="final">
                    <p className='links'>
                        <a hrefLang='#' href='https://instagram.com/cbpatio' target='_blank'><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href='https://discord.gg/DqYZEaGGx6' target='_blank'><FontAwesomeIcon icon={faDiscord} /></a>
                        <a hrefLang='#' href='https://x.com/CBPatio?t=kX6GjoXKngWj0PpKdi_HlQ&s=09'><FontAwesomeIcon icon={faXTwitter} target='_blank'/></a>
                    </p>
                    <div className="politicas">
                        <Link hrefLang='#'> Políticas de privacidade</Link>
                        <Link hrefLang='#'>Termos de uso</Link>
                        <Link hrefLang='#'>Termos de acessibilidade</Link>
                        <Link hrefLang='#'>Políticas de software</Link>
                    </div>


                    <p>
                        &copy;2024 - Todos os direitos reservados!
                    </p>

                </div>
            </div>
        </div>
    )
}

export { Footer }