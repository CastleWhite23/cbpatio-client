
import { useParams } from 'react-router-dom'
import { decodeHashId } from '../../services/formatFunctions'

import { StepperCustom } from '../../components/StepperCustom/StepperCustom'
import { Button } from '../../components/Button/Button'
import { CampeonatoDescription } from '../../components/CampeonatoDescription/CampeonatoDescription'
import './FormStepper.css'


const FormStepper = ({ component, indexStep }) => {
    const { id_camp } = useParams()
    const id = decodeHashId(id_camp)
    console.log(id)


    return (
        <>
            <div className="form-stepper">
                <div className='components'>
                    
                    {component}
                </div>

            </div>
            <StepperCustom indexStep={indexStep} />

        </>

    )
}

export { FormStepper }