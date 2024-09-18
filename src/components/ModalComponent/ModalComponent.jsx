import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import './ModalComponent.css'

import { Button } from '../Button/Button'

function ModalComponent({ titulo, body, openText, closeText, onClickAction, actionText, variant, width, height, soFecha }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button width={width} height={height} variant={`${variant ?? 'red'}`} text={openText} onClick={onOpen} />

            <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay 
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) ' 
                    size={'xl'}    
                />
                <ModalContent backgroundColor={'#866CC9'} alignItems='center' textAlign='center'>
                    <ModalHeader className={'header-modal'} color={'#866CC9'} >{titulo}</ModalHeader>
                    <ModalBody pb={1} color={'#866CC9'} margin={'20px'}>
                        {body}
                    </ModalBody>
                    <ModalFooter gap={'.5rem'}>
                        {
                            soFecha ?
                            ""
                            :
                            <Button variant='red' text={actionText} onClick={onClickAction }/>
                        }
                        

                        <Button variant='purple' text={closeText} onClick={onClose} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export { ModalComponent }