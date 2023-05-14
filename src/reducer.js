import { nanoid } from "nanoid"

const reducer = (state, action) => {
    if (action.type === "CHANGE_THEME") {
        return {
            ...state,
            theme: state.theme === "light-theme" ? "dark-theme" : "light-theme",
        }
    }

    if (action.type === "HANDLE_SELECTION") {
        const { name, value } = action.payload
        return {
            ...state,
            gameOptions: {
                ...state.gameOptions,
                [name]: value,
            },
        }
    }

    if (action.type === "START_GAME") {
        const questions = action.payload.map((question) => {
            return {
                ...question,
                id: nanoid(),
                selectedAnswer: "",
                showAnswer: false,
            }
        })
        return {
            ...state,
            questions,
            isGameStarted: true,
        }
    }

    if (action.type === "TOGGLE_LOADING") {
        const isLoading = action.payload
        return {
            ...state,
            isLoading,
        }
    }

    if (action.type === "SELECT_ANSWER") {
        const { questionId, answer } = action.payload
        const questions = state.questions.map((question) => {
            if (question.id === questionId) {
                return { ...question, selectedAnswer: answer }
            } else {
                return question
            }
        })
        return {
            ...state,
            questions,
        }
    }

    if (action.type === "CHECK_ANSWERS") {
        let points = 0
        state.questions.forEach((question) => {
            if (question.selectedAnswer === question.correct_answer) {
                points += 1
            }
        })
        const questions = state.questions.map((question) => {
            return {
                ...question,
                showAnswer: true,
            }
        })
        return {
            ...state,
            questions,
            points,
        }
    }

    if (action.type === "HANDLE_ALERT") {
        const { msg, show } = action.payload
        return {
            ...state,
            alert: {
                msg,
                show,
            },
        }
    }

    if (action.type === "STOP_GAME") {
        return {
            ...state,
            isGameStarted: false,
            alert: {
                msg: "",
                show: false,
            },
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
