
import {
    Step,
    StepDescription,
    Center,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
} from '@chakra-ui/react'
import './StepperCustom.css'
import { useState, useEffect } from 'react'


const StepperCustom = ({ indexStep }) => {
    // Se for ter descrição descomentar stepDescription
    const steps = [
        { title: 'Selecionar Time', description: 'Contact Info' },
        { title: 'Pagamento', description: 'Date & Time' },
        { title: 'Finalizar', description: 'Select Rooms' },
    ]

    const { activeStep } = useSteps({
        index: indexStep,
        count: steps.length,
    })

    const [orientation, setOrientation] = useState(
        document.body.clientWidth <= 560 ? 'vertical' : 'horizontal'
    );

    useEffect(() => {
        function handleResize() {
            // Atualiza a orientação com base na largura atual do corpo do documento
            const newOrientation = document.body.clientWidth <= 560 ? 'vertical' : 'horizontal';
            // Define a nova orientação no estado
            setOrientation(newOrientation);
        }

    
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // [] garante que este efeito só é executado uma vez após a montagem inicial do componente





    return (
        
        <Stepper orientation={
            orientation
        } index={activeStep} color={'#8F81B2'} colorScheme='purple' width={'100%'} wordBreak={'break-word'} alignItems={'start'} >
            {
                steps.map((step, index) => (

                    <Step key={index}>
                        <StepIndicator    >
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            {/* <StepDescription>{step.description}</StepDescription> */}
                        </Box>

                        <StepSeparator />
                    </Step>

                ))
            }
        </Stepper >

    )
}

export { StepperCustom }