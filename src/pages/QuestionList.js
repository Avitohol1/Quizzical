import { useState, useEffect } from 'react'
import Question from '../Components/Question.js'
import GameOver from '../Components/GameOver.js'
import getQuestions from '../getQuestions.js'
import { nanoid } from 'nanoid'
import '../Components/QuestionList.css'
import Footer from '../Components/Footer'
import {BiLeftArrow} from "react-icons/bi"
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context.js'

const QuestionList = ({gameOptions}) => {
    const {
        setIsGameStarted, 
        isGameOver, 
        setIsGameOver,
        setPoints,
    } = useGlobalContext()

    const [questionsArray, setQuestionsArray] = useState([])
    const [allQuestionsAnsweredElement, setAllQuestionsAnsweredElement] = useState('')
    
    let allQuestionsAnswered = questionsArray.every(question => question.selectedAnswer !== "")
    
    useEffect(() => {
        if(!isGameOver) {
            getQuestions(gameOptions)
            .then(questions => {
                setQuestionsArray(questions.map (question => {
                    return {
                        ...question,
                        id: nanoid(),
                        selectedAnswer: "",
                        showAnswer: false
                    }
                }))
            })
        }
        
    }, [isGameOver])

    const handleSelectAnswer = (questionId, answer) => {
		    setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === questionId
						? {...question, selectedAnswer: answer }
						: question
				))
			))
	}

    const checkAnswers = () => {
        if(!isGameOver && allQuestionsAnswered) {
            questionsArray.map(question => {
                question.selectedAnswer === question.correct_answer 
                    ? setPoints(points => points + 1)
                    : setPoints(points => points)
            })
    
            setQuestionsArray(prevQuestionsArray => (
                prevQuestionsArray.map(question => ({...question, showAnswer: true }))
            ))

            setAllQuestionsAnsweredElement(null)

            if(allQuestionsAnswered) {
                setIsGameOver(true)
            }
            
        } else if (allQuestionsAnswered === false) {
            setAllQuestionsAnsweredElement(prev => {
                return <span style = {{fontSize: '18px', color: 'red'}}>Please answer all questions!</span>
            })
        }
        
    }

    const questionElements = questionsArray.map(question => {
        return <Question 
                    key = {question.id}
                    id = {question.id}
                    question = {question.question}
                    incorrectAnswers = {question.incorrect_answers}
                    correctAnswer = {question.correct_answer}
                    handleSelectAnswer = {handleSelectAnswer}
                    selectedAnswer = {question.selectedAnswer}
                    showAnswer = {question.showAnswer}
                    number = {`${questionsArray.indexOf(question) + 1}. `}
                />
    })


    return ( 
                <div className='questions'>
                    <Link to="/quizzical" className="back-btn" onClick={() => setIsGameStarted(false)}>
                        <BiLeftArrow />
                    </Link>
                    {questionElements} 

                    { isGameOver && <GameOver numberOfQuestions={questionsArray.length} /> }
                    { !isGameOver && <button className = 'check-answers-button' onClick = {checkAnswers}>
                                    Check Answers
                                  </button> }

                    { allQuestionsAnsweredElement }

                    <Footer />
                </div>
     )
}
 
export default QuestionList