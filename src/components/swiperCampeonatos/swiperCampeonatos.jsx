import React, { useEffect, useState } from 'react'
import foto from "../../assets/bg_com_logo.png"


// CHACKRA UI
import { SpinnerCustom } from '../Spinner/Spinner';


import "./swiperCampeonatos.css"

//  SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Api } from '../../services/Api';
import { CardCampeonato } from '../cardCampeonato/cardCampeonato';
import { hashId } from '../../services/formatFunctions';


const path = "http://localhost:3005"

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



    return (
        <div>
            
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 2000, // tempo de intervalo em milissegundos (3 segundos)
                    disableOnInteraction: true // para continuar a reprodução automática após interações do usuário
                }}
                centeredSlides={false}
                spaceBetween={5}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1268: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
                className='mySwiper'
            >

                {
                    // ta carregando os dados ainda?
                    loading
                        ?
                        <SpinnerCustom />

                        :
                        (
                            campeonatos.length === 0

                                ?

                                "Não há campeonatos para o momento."

                                :
                                campeonatos.map((campeonato, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <CardCampeonato
                                                idCamp={hashId(campeonato.id_campeonato)}
                                                bgImage={`${path}/${campeonato.foto?.replace(/\\/g, '/')}`}
                                                title={campeonato.nome}
                                                height={"25rem"}
                                                width={"100%"} />
                                        </SwiperSlide>
                                    )
                                })
                        )

                }

            </Swiper>
        </div>
    )
}

export { SwiperCampeonatos }