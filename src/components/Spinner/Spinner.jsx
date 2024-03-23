import { Spinner, Center } from "@chakra-ui/react"

const SpinnerCustom = () => {
    return (
        <>
            <Center>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#580AFF'
                    size='xl'
                />
            </Center>
        </>
    )
}

export { SpinnerCustom }