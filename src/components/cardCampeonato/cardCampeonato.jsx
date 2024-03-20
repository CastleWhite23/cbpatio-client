import React from 'react'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Link } from 'react-router-dom'
import "./cardCampeonato.css"

const CardCampeonato = ({idCamp, title, width, height, bgImage}) => {
  return (
    <Card width={width} height={height} variant={'img'} bgImage={bgImage}>
            <h3>{title}</h3>
            
            <Link to={`/campeonatos/entrar/${idCamp}`}>
                <Button text={"Inscreva-se"} variant={"purple"} width={"100%"} />
            </Link>
    </Card>

                
  )
}

export {CardCampeonato}