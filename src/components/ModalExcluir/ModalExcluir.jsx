import { useState } from 'react'
import { ModalComponent } from '../ModalComponent/ModalComponent'
import { useToast } from '@chakra-ui/react'

const ModalExcluir = ({titulo, openText, actionText, onClickAction, closeText}) => {
    const toast = useToast()
 
    //ALERT BONITO PRA QUANDO EXCLUIR
    // toast({
    //     title: 'Jogador Expulso com sucesso.',
    //     position: 'bottom-left',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    // })
    return (
        <>

            <ModalComponent
                titulo={titulo}
                openText={openText}
                actionText={actionText}
                onClickAction={onClickAction}
                closeText={closeText}
            />

        </>
    )
}

export { ModalExcluir }