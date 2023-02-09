import {createContext, useContext, useState} from "react"

const GameContext = createContext()

const GameProvider = ({children}) => {
    const [theme, setTheme] = useState("light-theme")
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [points, setPoints] = useState(0)

    const startOver = () => {
        setIsGameOver(false)
        setPoints(0)
    }

    const changeTheme = () => {
        setTheme(oldTheme => oldTheme === "light-theme" ? "dark-theme" : "light-theme")
    }

    return <GameContext.Provider value ={{
        isGameStarted,
        setIsGameStarted,
        isGameOver,
        setIsGameOver,
        points,
        setPoints,
        startOver,
        theme,
        changeTheme
    }}>
        {children}
    </GameContext.Provider>
}

const useGlobalContext = () => {
    return useContext(GameContext)
}

export {GameContext, GameProvider, useGlobalContext}