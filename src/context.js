import { createContext, useContext, useEffect, useReducer } from "react"
import getQuestions from "./getQuestions"
import reducer from "./reducer"

const GameContext = createContext()

const getLocalStorageTheme = () => {
    let theme = "light-theme"
    if (localStorage.getItem("theme")) {
        theme = localStorage.getItem("theme")
    }
    return theme
}

const initialState = {
    theme: getLocalStorageTheme(),
    isLoading: false,
    isGameStarted: false,
    isGameOver: false,
    questions: [],
    gameOptions: {
        category: "",
        difficulty: "",
        type: "",
    },
    points: 0,
    alert: {
        msg: "",
        show: false,
    },
}

const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        document.body.classList = state.theme
    }, [state.theme])

    const handleSelectionChange = (event) => {
        const { name, value } = event.target
        dispatch({ type: "HANDLE_SELECTION", payload: { name, value } })
    }

    useEffect(() => {
        if (state.isGameStarted) {
            startGame()
        }
    }, [state.isGameStarted])

    const startGame = async () => {
        dispatch({ type: "TOGGLE_LOADING", payload: true })
        const { category, difficulty, type } = state.gameOptions

        let categoryQuery = ""
        let difficultyQuery = ""
        let typeQuery = ""

        if (category !== "") categoryQuery = `&category=${category}`
        if (difficulty !== "") difficultyQuery = `&difficulty=${difficulty}`
        if (type !== "") typeQuery = `&type=${type}`

        const url = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`

        try {
            const response = await fetch(url)
            const data = await response.json()
            dispatch({ type: "START_GAME", payload: data.results })
            dispatch({ type: "TOGGLE_LOADING", payload: false })
        } catch (err) {
            console.log(err)
            dispatch({ type: "TOGGLE_LOADING", payload: false })
        }
    }
    const handleSelectAnswer = (questionId, answer) => {
        dispatch({ type: "SELECT_ANSWER", payload: { questionId, answer } })
    }
    const checkAnswers = () => dispatch({ type: "CHECK_ANSWERS" })
    const handleAlert = ({ msg, show }) => {
        dispatch({ type: "HANDLE_ALERT", payload: { msg, show } })
    }
    const stopGame = () => dispatch({ type: "STOP_GAME" })
    const endGame = () => dispatch({ type: "END_GAME" })
    const startOver = () => dispatch({ type: "START_OVER" })
    const increasePoints = () => dispatch({ type: "INCREASE_POINTS" })
    const changeTheme = () => dispatch({ type: "CHANGE_THEME" })

    return (
        <GameContext.Provider
            value={{
                ...state,
                startGame,
                handleSelectAnswer,
                handleAlert,
                checkAnswers,
                stopGame,
                endGame,
                increasePoints,
                handleSelectionChange,
                startOver,
                changeTheme,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(GameContext)
}

export { GameContext, GameProvider, useGlobalContext }
