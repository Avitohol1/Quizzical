import { nanoid } from "nanoid";
import { decode } from 'html-entities'
import './Question.css'

const Question = (props) => {

    const incorrectAnswerElements = props.incorrectAnswers.map(incorrectAnswer => {
        const incorrectAnswerClassName = `
        ${props.selectedAnswer === incorrectAnswer ? "answer-button-selected" : "answer-button-default"}
        ${(props.showAnswer && props.selectedAnswer === incorrectAnswer) && "question-button-incorrect"}
        `

        return <button
                    key = {nanoid()}
                    className = {incorrectAnswerClassName}
                    onClick = {() => props.handleSelectAnswer(props.id, incorrectAnswer)}>

                {decode(incorrectAnswer)}
        </button>
    })

    const correctAnswerClassName = `
        ${props.selectedAnswer === props.correctAnswer ? "answer-button-selected" : "answer-button-default"}
        ${(props.showAnswer && "question-button-correct")}`

    const correctAnswerElement = 
    <button 
        key = {nanoid()}
        className = {correctAnswerClassName}
        onClick = {() => props.handleSelectAnswer(props.id, props.correctAnswer)}
    >
            {decode(props.correctAnswer)}
    </button>

    incorrectAnswerElements.push(correctAnswerElement)

    const shuffledElements = incorrectAnswerElements.sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);

    return ( 
        <div className='question-container'>
            <h3 className='question-text'>{props.number}{decode(props.question)}</h3>
            {shuffledElements}
        </div>
    );
}
 
export default Question;