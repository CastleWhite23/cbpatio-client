
import './Home.css'
import { Button } from '../../components/Button/Button'
const Home = () => {
    return (
        <>
            <div className="home">
                <h1>CBPatio E-Sports </h1>
                <p>Prepare-se para uma experiência única de jogo! O CBPatio Arena é o palco virtual onde a emoção acontece em tempo real. </p>
                <Button
                    text={'Inscreva-se'}
                    variant={'purple'}
                    width={'200px'}
                    padding={'1rem'}
                />

            </div>
        </>
    )
}


export { Home }