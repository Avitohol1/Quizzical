import { useState, useEffect } from "react"
import Question from "../Components/Question.js"
import GameOver from "../Components/GameOver.js"
import Alert from "../Components/Alert.js"
import getQuestions from "../getQuestions.js"
import { nanoid } from "nanoid"
import "../Components/QuestionList.css"
import { BiLeftArrow } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context.js"

const QuestionList = ({ gameOptions }) => {
  const { setIsGameStarted, isGameOver, setIsGameOver, setPoints } = useGlobalContext()

  const [questionsArray, setQuestionsArray] = useState([])
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
  })

  let allQuestionsAnswered = questionsArray.every((question) => question.selectedAnswer !== "")

  useEffect(() => {
    if (!isGameOver) {
      getQuestions(gameOptions).then((questions) => {
        setQuestionsArray(
          questions.map((question) => {
            return {
              ...question,
              id: nanoid(),
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
        question.id === questionId ? { ...question, selectedAnswer: answer } : question
      )
    )
  }

  const checkAnswers = () => {
    if (!isGameOver && allQuestionsAnswered) {
      questionsArray.map((question) => {
        question.selectedAnswer === question.correct_answer
          ? setPoints((points) => points + 1)
          : setPoints((points) => points)
      })

      setQuestionsArray((prevQuestionsArray) =>
        prevQuestionsArray.map((question) => ({ ...question, showAnswer: true }))
      )

      setAlert({
        show: false,
        msg: "",
      })

      if (allQuestionsAnswered) {
        setIsGameOver(true)
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
    return (
      <Question
        key={question.id}
        id={question.id}
        question={question.question}
        incorrectAnswers={question.incorrect_answers}
        correctAnswer={question.correct_answer}
        handleSelectAnswer={handleSelectAnswer}
        selectedAnswer={question.selectedAnswer}
        showAnswer={question.showAnswer}
        number={`${questionsArray.indexOf(question) + 1}. `}
      />
    )
  })

  return (
    <div className="questions">
      <Link to="/quizzical" className="back-btn" onClick={() => setIsGameStarted(false)}>
        <BiLeftArrow />
      </Link>
      {questionElements}

      {isGameOver && <GameOver numberOfQuestions={questionsArray.length} />}
      {!isGameOver && (
        <button className="check-answers-button" onClick={checkAnswers}>
          Check Answers
        </button>
      )}

      {alert.show && <Alert msg={alert.msg} />}
    </div>
  )
}

export default QuestionList
