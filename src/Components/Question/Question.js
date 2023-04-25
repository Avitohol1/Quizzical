import { nanoid } from "nanoid"
import { decode } from "html-entities"
import "./Question.css"
import { useGlobalContext } from "../../context"
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"

const Question = (props) => {
    const { isGameOver, handleSelectAnswer } = useGlobalContext()
    const {
        id,
        number,
        question,
        incorrectAnswers,
        correctAnswer,
        selectedAnswer,
        showAnswer,
    } = props

    const incorrectAnswerElements = incorrectAnswers.map((incorrectAnswer) => {
        const incorrectAnswerClassName = `
            ${
                selectedAnswer === incorrectAnswer
                    ? "answer-button-selected"
                    : "answer-button-default"
            }
            ${
                showAnswer &&
                selectedAnswer === incorrectAnswer &&
                "question-button-incorrect"
            }
        `

        return (
            <button
                key={nanoid()}
                className={incorrectAnswerClassName}
                onClick={() => handleSelectAnswer(id, incorrectAnswer)}
            >
                {decode(incorrectAnswer)}
            </button>
        )
    })

    const correctAnswerClassName = `
        ${
            selectedAnswer === correctAnswer
                ? "answer-button-selected"
                : "answer-button-default"
        }
        ${showAnswer && "question-button-correct"}`

    const correctAnswerElement = (
        <button
            key={nanoid()}
            className={correctAnswerClassName}
            onClick={() => handleSelectAnswer(id, correctAnswer)}
        >
            {decode(correctAnswer)}
        </button>
    )

    incorrectAnswerElements.push(correctAnswerElement)

    const shuffledAnswers = incorrectAnswerElements.sort((a, b) =>
        a.props.children.localeCompare(b.props.children)
    )

    return (
        <div className="question-container">
            <h3 className="question-text">
                {number}
                {decode(question)}
            </h3>
            <div className="answers">{shuffledAnswers}</div>
            {isGameOver &&
                (selectedAnswer === correctAnswer ? (
                    <TiTick className="correct-icon" size={30} />
                ) : (
                    <ImCross className="incorrect-icon" size={16} />
                ))}
        </div>
    )
}

export default Question
