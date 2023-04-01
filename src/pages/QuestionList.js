import { useEffect } from "react"
import Question from "../Components/Question/Question.js"
import GameOver from "../Components/GameOver.js"
import Alert from "../Components/Alert.js"
import Spinner from "../Components/Spinner/Spinner.js"
import "../QuestionList.css"
import { BiLeftArrow } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context.js"

const QuestionList = () => {
    const {
        isLoading,
        isGameOver,
        startGame,
        handleSelectAnswer,
        alert,
        handleAlert,
        endGame,
        stopGame,
        checkAnswers,
        questions,
    } = useGlobalContext()

    useEffect(() => {
        if (!isGameOver) {
            startGame()
        }
    }, [isGameOver])

    let allQuestionsAnswered = questions.every(
        (question) => question.selectedAnswer !== ""
    )

    const submitAnswers = () => {
        if (!isGameOver && allQuestionsAnswered) {
            checkAnswers()
            handleAlert({ msg: "", show: false })

            if (allQuestionsAnswered) {
                endGame()
                handleAlert({ msg: "", show: false })
            }
        } else if (!allQuestionsAnswered) {
            handleAlert({ msg: "Please answer all questions!", show: true })
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleAlert({ ...alert, show: false })
        }, 3000)
        return () => {
            clearTimeout(timeout)
        }
    }, [alert])

    const questionElements = questions.map((question) => {
        const {
            id,
            incorrect_answers,
            correct_answer,
            selectedAnswer,
            showAnswer,
        } = question
        return (
            <Question
                key={id}
                id={id}
                question={question.question}
                incorrectAnswers={incorrect_answers}
                correctAnswer={correct_answer}
                handleSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswer}
                showAnswer={showAnswer}
                number={`${questions.indexOf(question) + 1}. `}
            />
        )
    })

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="questions">
            <Link to="/quizzical" className="back-btn" onClick={stopGame}>
                <BiLeftArrow />
            </Link>
            {questionElements}
            {isGameOver && <GameOver numberOfQuestions={questions.length} />}
            {!isGameOver && (
                <button className="action-btn" onClick={submitAnswers}>
                    Check Answers
                </button>
            )}
            {alert.show && <Alert msg={alert.msg} />}
        </div>
    )
}

export default QuestionList
