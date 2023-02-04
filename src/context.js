import {createContext, useContext, useState} from "react"

const GameContext = createContext()

const GameProvider = ({children}) => {
    const [isGameStarted, setIsGameStarted] = useState(false)

    return <GameContext.Provider value ={{
        isGameStarted,
        setIsGameStarted
    }}>
        {children}
    </GameContext.Provider>
}

const useGlobalContext = () => {
    return useContext(GameContext)
}

export {GameContext, GameProvider, useGlobalContext}