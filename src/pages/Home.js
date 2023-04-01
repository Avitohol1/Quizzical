import QuestionList from "./QuestionList"
import "../Home.css"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"
import Selection from "../Components/Selection/Selection"

function Home() {
    const { isGameStarted, gameOptions, startGame } = useGlobalContext()

    const navigate = useNavigate()

    const content = (
        <section className="start-page-container">
            <div className="start-page-intro">
                <h1 className="start-page-title">
                    Welcome to <span className="quizzical">Quizzical!</span>
                </h1>
            </div>

            <Selection />

            <button
                onClick={() => {
                    startGame()
                    navigate("/quizzical/questions")
                }}
                className="action-btn"
            >
                Begin Game
            </button>
        </section>
    )

    return isGameStarted ? <QuestionList gameOptions={gameOptions} /> : content
}

export default Home
