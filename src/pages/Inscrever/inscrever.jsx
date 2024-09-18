
import { useParams } from 'react-router-dom'
import { decodeHashId } from '../../services/formatFunctions'
import { InscreverEquipe } from '../../components/InscreverEquipe/inscreverEquipe'
import { FormStepper } from '../../components/FormStepper/FormStepper'



const Inscrever = () => {
    const { id_camp } = useParams()
    const id = decodeHashId(id_camp)



    return (
        <>
           <FormStepper component={ <InscreverEquipe id_campeonato={id} />} indexStep={0}/>
        </>

    )
}

export { Inscrever }