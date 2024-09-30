import React, { useEffect, useState } from 'react'
import "./userSearched.css"
import { Api } from '../../services/Api'
import foto from "../../assets/stars.png"
import logo from "../../assets/logo.png"
import { DividerComponent } from '../Divider/DividerComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { hashId } from '../../services/formatFunctions'
import { SpinnerCustom } from '../Spinner/Spinner';
import { Button } from '../Button/Button'



const UsersSearched = () => {
  const [topUsers, setTopUsers] = useState([])
  const [usersSearched, setUserSearched] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  const navigate = useNavigate();

  const {page: param} = useParams();

  const page = parseInt(param);
  const path = "https://cbpatio-production.up.railway.app/"
  

    useEffect(() => {
      const queryInit = new URLSearchParams(window.location.search);
      setQuery(queryInit.get('nome'));
    }, [])

    useEffect(() => {
      
          const getTopUsers = async () => {
            if(query == null){
              const {data} = await Api.get(`/pesquisar/usuarios?pagina=${page}`)
              setTopUsers(data)
            }else{
              const {data: search} = await Api.get(`/pesquisar/usuario?nome=${query}&pagina=${page}`)
              setTopUsers(search)
            }
            setLoading(false)
        }
        getTopUsers()
    }, [query])

    console.log(usersSearched)
    console.log(query)

  return (
    !loading ?
    <div className='table__profile' >        
        {topUsers.map((topUser) => {
            return(
              <>
                <div className='bar__profile'>
                    <img className='photoUser' src={topUser.foto ? `${path}${topUser.foto}` : `${path}${'fotoUsuarios/sem_foto_user.png'}`} alt="" srcset="" />
                    <div className='leftSide__topUsers'>
                      <h1><Link to={`/jogadores/${hashId(topUser.id_usuario)}`}>{topUser.nome.split(' ').slice(0, 2).join(' ')}</Link></h1>
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
        <div className="buttons__search">
          <Button text={"<"} variant={'purple'} onClick={() => {
            navigate(!query ? `/jogadores/${page - 1}` : `/jogadores/${page + 1}?nome=${query}`)
            window.location.reload();
        }} />
          <Button text={">"} variant={'purple'} onClick={() => {
            navigate(!query ? `/jogadores/${page + 1}` : `/jogadores/${page + 1}?nome=${query}`)
            window.location.reload();
            }}/>
        </div>
    </div>

    :

    <SpinnerCustom marginTop={'40px'}/>
  )
}

export {UsersSearched}