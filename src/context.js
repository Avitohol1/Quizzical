import {createContext, useContext, useState} from "react"

const GameContext = createContext()

const GameProvider = ({children}) => {
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [points, setPoints] = useState(0)

    const startOver = () => {
        setIsGameOver(false)
        setPoints(0)
    }

    return <GameContext.Provider value ={{
        isGameStarted,
        setIsGameStarted,
        isGameOver,
        setIsGameOver,
        points,
        setPoints,
        startOver
    }}>
        {children}
    </GameContext.Provider>
}

const useGlobalContext = () => {
    return useContext(GameContext)
}

export {GameContext, GameProvider, useGlobalContext}