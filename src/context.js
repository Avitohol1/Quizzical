import { createContext, useContext, useEffect, useReducer } from "react"
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
    isGameStarted: false,
    isGameOver: false,
    gameOptions: {
        category: "",
        difficulty: "",
        type: "",
    },
    points: 0,
    error: "",
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

    const startGame = () => dispatch({ type: "START_GAME" })
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
