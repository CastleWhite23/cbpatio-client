import './Footer.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faDiscord, faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'


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
                        <Link hrefLang='#'><FontAwesomeIcon icon={faInstagram} /></Link>
                        <Link hrefLang='#'><FontAwesomeIcon icon={faDiscord} /></Link>
                        <Link hrefLang='#'><FontAwesomeIcon icon={faTwitter} /></Link>
                        <Link hrefLang='#'><FontAwesomeIcon icon={faFacebook} /></Link>
                        <Link hrefLang='#'><FontAwesomeIcon icon={faGithub} /></Link>
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