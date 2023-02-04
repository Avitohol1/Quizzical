import { useGlobalContext } from "../context"

const GameOver = ({numberOfQuestions}) => {
    const {points, startOver} = useGlobalContext()

    return (
        <div className='game-over'>
            <span className = 'points'>You scored: {points} / {numberOfQuestions} points</span>  
            <button className = 'start-over-button' onClick = {startOver}>
            Start Over
            </button>
        </div>
    )
}

export default GameOver