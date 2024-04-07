import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'


import { Button } from '../Button/Button'

function ModalComponent({ titulo, body, openText, closeText, onClickAction, actionText }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button variant='red' text={openText} onClick={onOpen} />

            <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay 
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) ' />
                <ModalContent backgroundColor={'#1B1230'}>
                    <ModalHeader color={'#866CC9'}>{titulo}</ModalHeader>
                    <ModalCloseButton color={'#866CC9'}/>
                    <ModalBody pb={6}>
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