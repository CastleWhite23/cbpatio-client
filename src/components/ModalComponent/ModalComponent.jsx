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

function ModalComponent({ titulo, body, openText, closeText, onClickAction, actionText }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button variant='red' text={openText} onClick={onOpen} />

            <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay 
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) ' 
                    size={'xl'}    
                />
                <ModalContent backgroundColor={'#1B1230'} alignItems='center' textAlign='center'>
                    <ModalHeader className={'header-modal'} color={'#866CC9'} >{titulo}</ModalHeader>
                    <ModalBody pb={1} color={'#866CC9'}>
                        {body}
                    </ModalBody>
                    <ModalFooter gap={'.5rem'}>
                        <Button variant='red' text={actionText} onClick={onClickAction }/>
                        <Button variant='purple' text={closeText} onClick={onClose} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export { ModalComponent }