const reducer = (state, action) => {
    if (action.type === "CHANGE_THEME") {
        return {
            ...state,
            theme: state.theme === "light-theme" ? "dark-theme" : "light-theme",
        }
    }

    if (action.type === "HANDLE_SELECTION") {
        const { name, value } = action.payload
        console.log(action.payload)
        return {
            ...state,
            gameOptions: {
                ...state.gameOptions,
                [name]: value,
            },
        }
    }

    if (action.type === "START_GAME") {
        return {
            ...state,
            isGameStarted: true,
        }
    }

    if (action.type === "STOP_GAME") {
        return {
            ...state,
            isGameStarted: false,
        }
    }

    if (action.type === "END_GAME") {
        return {
            ...state,
            isGameOver: true,
        }
    }

    if (action.type === "INCREASE_POINTS") {
        return {
            ...state,
            points: state.points + 1,
        }
    }

    if (action.type === "START_OVER") {
        return {
            ...state,
            isGameOver: false,
            points: 0,
        }
    }
    throw new Error("No Matching Error Type")
}

export default reducer
