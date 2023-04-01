import { nanoid } from "nanoid"
import { decode } from "html-entities"
import "./Question.css"
import { useGlobalContext } from "../context"
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"

const Question = (props) => {
    const { isGameOver } = useGlobalContext()
    const {
        id,
        number,
        question,
        incorrectAnswers,
        correctAnswer,
        selectedAnswer,
        showAnswer,
        handleSelectAnswer,
    } = props

    const incorrectAnswerElements = props.incorrectAnswers.map((incorrectAnswer) => {
        const incorrectAnswerClassName = `
            ${
                props.selectedAnswer === incorrectAnswer
                    ? "answer-button-selected"
                    : "answer-button-default"
            }
            ${
                props.showAnswer &&
                props.selectedAnswer === incorrectAnswer &&
                "question-button-incorrect"
            }
        `

        return (
            <button
                key={nanoid()}
                className={incorrectAnswerClassName}
                onClick={() => props.handleSelectAnswer(props.id, incorrectAnswer)}
            >
                {decode(incorrectAnswer)}
            </button>
        )
    })

    const correctAnswerClassName = `
        ${
            props.selectedAnswer === props.correctAnswer
                ? "answer-button-selected"
                : "answer-button-default"
        }
        ${props.showAnswer && "question-button-correct"}`

    const correctAnswerElement = (
        <button
            key={nanoid()}
            className={correctAnswerClassName}
            onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
        >
            {decode(props.correctAnswer)}
        </button>
    )

    incorrectAnswerElements.push(correctAnswerElement)

    const shuffledAnswers = incorrectAnswerElements.sort((a, b) =>
        a.props.children.localeCompare(b.props.children)
    )

    return (
        <div className="question-container">
            <h3 className="question-text">
                {props.number}
                {decode(props.question)}
            </h3>
            {shuffledAnswers}
            {isGameOver &&
                (props.selectedAnswer === props.correctAnswer ? (
                    <TiTick className="correct-icon" size={30} />
                ) : (
                    <ImCross className="incorrect-icon" size={16} />
                ))}
        </div>
    )
}

export default Question
