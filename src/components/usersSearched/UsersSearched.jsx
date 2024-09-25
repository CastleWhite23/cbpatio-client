import React, { useEffect, useState } from 'react'
import "./userSearched.css"
import { Api } from '../../services/Api'

const UsersSearched = () => {
  const [topUsers, setTopUsers] = useState([])
  
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
                <div className='bar__profile'>
                    {topUser.nome_usuario}
                </div>
            )
        })
        }
    </div>
  )
}

export {UsersSearched}