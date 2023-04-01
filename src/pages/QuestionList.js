import { useState, useEffect } from "react"
import Question from "../Components/Question/Question.js"
import GameOver from "../Components/GameOver.js"
import Alert from "../Components/Alert.js"
import getQuestions from "../getQuestions.js"
import "../QuestionList.css"
import { BiLeftArrow } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context.js"

const QuestionList = ({ gameOptions }) => {
    const { isGameOver, endGame, stopGame, increasePoints } = useGlobalContext()

    const [questionsArray, setQuestionsArray] = useState([])
    const [alert, setAlert] = useState({
        show: false,
        msg: "",
    })

    let allQuestionsAnswered = questionsArray.every(
        (question) => question.selectedAnswer !== ""
    )

    useEffect(() => {
        if (!isGameOver) {
            getQuestions(gameOptions).then((questions) => {
                setQuestionsArray(
                    questions.map((question, index) => {
                        return {
                            ...question,
                            id: index,
                            selectedAnswer: "",
                            showAnswer: false,
                        }
                    })
                )
            })
        }
    }, [isGameOver])

    const handleSelectAnswer = (questionId, answer) => {
        setQuestionsArray((prevQuestionsArray) =>
            prevQuestionsArray.map((question) =>
                question.id === questionId
                    ? { ...question, selectedAnswer: answer }
                    : question
            )
        )
    }

    const checkAnswers = () => {
        if (!isGameOver && allQuestionsAnswered) {
            questionsArray.map((question) => {
                question.selectedAnswer === question.correct_answer &&
                    increasePoints()
            })

            setQuestionsArray((prevQuestionsArray) =>
                prevQuestionsArray.map((question) => ({
                    ...question,
                    showAnswer: true,
                }))
            )

            setAlert({
                show: false,
                msg: "",
            })

            if (allQuestionsAnswered) {
                endGame()
                setAlert({
                    show: false,
                    msg: "",
                })
            }
        } else if (allQuestionsAnswered === false) {
            setAlert({
                show: true,
                msg: "Please answer all questions!",
            })
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({
                ...alert,
                show: false,
            })
        }, 3000)
        return () => {
            clearTimeout(timeout)
        }
    }, [alert])

    const questionElements = questionsArray.map((question) => {
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
                number={`${questionsArray.indexOf(question) + 1}. `}
            />
        )
    })

    return (
        <div className="questions">
            <Link to="/quizzical" className="back-btn" onClick={stopGame}>
                <BiLeftArrow />
            </Link>
            {questionElements}
            {isGameOver && (
                <GameOver numberOfQuestions={questionsArray.length} />
            )}
            {!isGameOver && (
                <button className="action-btn" onClick={checkAnswers}>
                    Check Answers
                </button>
            )}
            {alert.show && <Alert msg={alert.msg} />}
        </div>
    )
}

export default QuestionList
