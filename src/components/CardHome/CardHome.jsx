import './CardHome.css'
import { Card } from '../Card/Card'

const CardHome = ({titulo, descricao, img, marginTop, children}) => {
    return (
        <>
            <Card
                variant={'home'}
                marginTop={marginTop}
                width={'300px'}
                height={'400px'}>
                {children}

            </Card>
        </>
    )
}


export { CardHome }