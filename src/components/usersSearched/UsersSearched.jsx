import React, { useEffect, useState } from 'react'
import "./userSearched.css"
import { Api } from '../../services/Api'
import foto from "../../assets/stars.png"
import logo from "../../assets/logo.png"
import { DividerComponent } from '../Divider/DividerComponent'
import { Link } from 'react-router-dom'



const UsersSearched = () => {
  const [topUsers, setTopUsers] = useState([])

  const path = "https://cbpatio-production.up.railway.app/"
  
    useEffect(() => {
        const getTopUsers = async () => {
            const {data} = await Api.get('/pesquisar/usuarios?pagina=1')
            console.log(data)

            setTopUsers(data)
        }

        getTopUsers()
    }, [])

    console.log(topUsers)

  return (
    <div className='table__profile'>
        {topUsers.map((topUser) => {
            return(
              <>
                <div className='bar__profile'>
                    <img className='photoUser' src={topUser.foto ? `${path}${topUser.foto}` : `${path}${'fotoUsuarios/sem_foto_user.png'}`} alt="" srcset="" />
                    <div className='leftSide__topUsers'>
                      <h1><Link to={`/jogadores/${topUser.id_usuario}`}>{topUser.nome.split(' ').slice(0, 2).join(' ')}</Link></h1>
                      <div className='bottomSide__id'>
                        <span>@{topUser.nome_usuario}</span>
                        <img width={'80px'} src={foto} alt="" srcset="" />
                      </div>
                    </div>
                                        
                    <div className='rightSide__topUsers'>
                      <h1>0</h1>
                      <img width={'80px'} src={logo} alt="" srcset="" />
                    </div>
                </div>
                <DividerComponent color='#9A39C7' margin={'0 0 10px 0'} />
              </> 
            )
        })
        }
    </div>
  )
}

export {UsersSearched}