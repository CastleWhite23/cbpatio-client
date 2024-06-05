import React, { useEffect, useState } from 'react'


// CHACKRA UI
import { SpinnerCustom } from '../Spinner/Spinner';


import "./swiperCampeonatos.css"

//  SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Api } from '../../services/Api';
import { CardCampeonato } from '../cardCampeonato/cardCampeonato';
import { hashId } from '../../services/formatFunctions';


const path = "https://cbpatio-production.up.railway.app"

const SwiperCampeonatos = () => {

    const [campeonatos, setCampeonatos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCampeonatos = async () => {
            const { data: campeonatos } = await Api.get('/campeonatos')
            setCampeonatos(campeonatos)
            setLoading(false)
        }

        getCampeonatos()
    }, [])


    console.log(campeonatos)

    return (
        loading
            ?
            <SpinnerCustom />

            :
            (
                campeonatos.length === 0

                    ?

                    "Não há campeonatos para o momento."

                    :
                    <div className='slider'>
                        <div className="destaques">
                            <Swiper
                                slidesPerView={1}
                                autoplay={{
                                    delay: 1800, // tempo de intervalo em milissegundos (3 segundos)
                                    disableOnInteraction: true // para continuar a reprodução automática após interações do usuário
                                }}
                                centeredSlides={false}
                                spaceBetween={5}
                                navigation={true}
                                loop={true}
                                modules={[Pagination, Navigation, Autoplay]}


                                className='mySwiper'

                            >

                                {
                                    // ta carregando os dados ainda?

                                    campeonatos.map((campeonato, index) => {
                                        return (
                                            campeonato.id_campeonato == 77 || campeonato.id_campeonato == 79 || campeonato.id_campeonato == 81 ?
                                                <SwiperSlide key={index}>
                                                    <CardCampeonato
                                                        idCamp={hashId(campeonato.id_campeonato)}
                                                        bgImage={campeonato.foto ? `${path}/${campeonato.foto?.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                                        title={campeonato.nome}
                                                        height={"25rem"}
                                                        width={"100%"} />
                                                </SwiperSlide>
                                                : ''


                                        )
                                    })


                                }

                            </Swiper>
                        </div>
                        <div className="outros">
                            {
                                // ta carregando os dados ainda?

                                campeonatos.map((campeonato, index) => {
                                    return (
                                        <CardCampeonato
                                            idCamp={hashId(campeonato.id_campeonato)}
                                            bgImage={campeonato.foto ? `${path}/${campeonato.foto?.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                            title={campeonato.nome}
                                            height={"25rem"}
                                            width={"300px"} />
                                    )
                                })


                            }
                        </div>
                        <div className="responsive-slider">
                            <Swiper
                                effect={'cards'}
                                modules={[EffectCards]}
                               
                            >
                               {
                                 
                                 campeonatos.map((campeonato, index) => {
                                    return (
                                    
                                            <SwiperSlide key={index}>
                                                <CardCampeonato
                                                    idCamp={hashId(campeonato.id_campeonato)}
                                                    bgImage={campeonato.foto ? `${path}/${campeonato.foto?.replace(/\\/g, '/')}` : `${path}/fotoCampeonatos/sem-imagem.png`}
                                                    title={campeonato.nome}
                                                    height={"25rem"}
                                                    width={"94%"} />
                                            </SwiperSlide>


                                    )
                                })
                               }
                            </Swiper>
                        
                    </div>
                    </div >
            )
    )
}

export { SwiperCampeonatos }