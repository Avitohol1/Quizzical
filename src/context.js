import {createContext, useContext, useState, useEffect} from "react"

const GameContext = createContext()

const getLocalStorageTheme = () => {
    let theme ="light-theme"
    if(localStorage.getItem("theme")) {
        theme = localStorage.getItem("theme")
    }
    return theme
}


const GameProvider = ({children}) => {
    const [theme, setTheme] = useState(getLocalStorageTheme())
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

    useEffect(() => {
        document.body.classList = theme
    }, [theme])

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