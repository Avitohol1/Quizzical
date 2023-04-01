import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggler from '../ThemeToggler'
import { GameProvider } from '../../../context'


// MOCK LOCAL STORAGE
global.localStorage = {
    setItem (key, item) {
        this.state[key] = item
    },
    getItem (key) { 
        return this.state[key]
    },
}

// Initial theme
global.localStorage.setItem("theme", "light-theme")

const MockThemeToggler = () => {
    /* Since we use Context the ThemeToggler must be wrapped in the GameProvider
    to access the context values */
    return <GameProvider>
        <ThemeToggler />
    </GameProvider>    
}

const toggleTheme = () => {
    // Get the current theme from the body classes
    let activeTheme = document.body.classList[0]
    // Theme button
    const themeBtn = screen.getByTestId("theme-btn")

    fireEvent.click(themeBtn)
    // Switch the active theme
    activeTheme = activeTheme === "light-theme" ? "dark-theme" : "light-theme"
    expect(document.body.classList[0]).toBe(activeTheme)
}

const compareThemes = (theme) => {
    const localTheme = global.localStorage.getItem("theme", theme)
    const bodyTheme = document.body.classList[0]
    expect(bodyTheme).toBe(localTheme)
}

describe("Theme Toggler", () => {
    it("renders theme button on load", () => {
        render(<MockThemeToggler />)
        const themeBtn = screen.getByTestId("theme-btn")
        expect(themeBtn).toBeInTheDocument()
    })

    it("body class should not be empty on click", () => {
        render(<MockThemeToggler />)
        const themeBtn = screen.getByTestId("theme-btn")
        fireEvent.click(themeBtn)
        expect(document.body.classList).not.toBe("")
    })

    it("should add correct class to body", () => {
        render(<MockThemeToggler />)
        toggleTheme()   //toggles dark theme
        toggleTheme()   //toggles light theme
        toggleTheme()   //toggles dark theme
        toggleTheme()   //toggles light theme
    })

    it("local storage theme should be not be empty on initial page load", () => {
        render(<MockThemeToggler />)
        const localStorageTheme = global.localStorage.getItem("theme")
        expect(localStorageTheme).toBeTruthy()
    })

    it("local storage theme should be the same as body theme on initial load", () => {
        compareThemes()
    })
})