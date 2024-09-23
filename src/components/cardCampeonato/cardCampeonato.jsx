import React from 'react'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Link } from 'react-router-dom'
import "./cardCampeonato.css"

const CardCampeonato = ({ idCamp, title, width, height, bgImage, type, config = false }) => {
  return (
    <Card width={width} height={height} variant={'img'} bgImage={bgImage} config={config} className={config ? 'config' : ''}>
      <div className={`purpleBarText`}>
        {config ? 
          <p>Seu jogo favorito é..</p>
          :
          ""
        }
        <h3>{title}</h3>
      </div>

      {
        type !== 'preview' &&
          <Link to={`/campeonatos/inscrever/${idCamp}`}>
            <Button text={"Inscreva-se"} variant={"purple"} width={"100%"} />
          </Link>
      }

    </Card>


  )
}

export { CardCampeonato }