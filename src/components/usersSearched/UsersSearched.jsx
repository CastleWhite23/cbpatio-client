import React, { useEffect, useState } from 'react'
import "./userSearched.css"
import { Api } from '../../services/Api'
import foto from "../../assets/stars.png"
import { Divider } from '@chakra-ui/react'


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
                    <img src={`${path}${topUser.foto}`} alt="" srcset="" />
                    <div className='leftSide__topUsers'>
                      <h1>{topUser.nome}</h1>
                      <div className='bottomSide__id'>
                        <span>@{topUser.nome_usuario}</span>
                        <img width={'80px'} src={foto} alt="" srcset="" />
                      </div>
                    </div>
                </div>
                <Divider />
              </> 
            )
        })
        }
    </div>
  )
}

export {UsersSearched}