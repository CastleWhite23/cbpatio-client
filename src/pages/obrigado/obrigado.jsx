import React from 'react'
import "./obrigado.css"
import foto from "../../assets/check.png"
import omega from "../../assets/omega.png"
import { Link } from 'react-router-dom'

const Obrigado = () => {
  return (
    <div className='card'>
        <div className='main__infos'>
            <img src={foto} alt="" srcset="" />
            <h1>Obrigado por se inscrever!</h1>
            <p className='main__subtitle'>
                Seu time foi inscrito com sucesso!
            </p>
            <Link className='main__link' to={'/classificacao'}>Veja seu time clicando aqui</Link>
        </div>

        <img className='omega' src={omega} alt="" srcset="" />
        
        <p className='main__desc'>Se possível, divulgue este projeto para o máximo de pessoas que você conseguir. <br />
Com isso você nos ajuda, sustenta o projeto e banca as premiações.</p>

    </div>
  )
}

export {Obrigado}
