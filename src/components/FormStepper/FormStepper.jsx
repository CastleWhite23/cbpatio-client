
import { useParams } from 'react-router-dom'
import { decodeHashId } from '../../services/formatFunctions'

import { StepperCustom } from '../../components/StepperCustom/StepperCustom'
import { Button } from '../../components/Button/Button'


const FormStepper = ({component, indexStep}) => {
    const { id_camp } = useParams()
    const id = decodeHashId(id_camp)
    console.log(id)


    return (
        <>
            {component}
            <StepperCustom indexStep={indexStep} />

        </>

    )
}

export { FormStepper }