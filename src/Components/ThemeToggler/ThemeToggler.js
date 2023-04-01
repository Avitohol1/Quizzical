import { useGlobalContext } from "../../context"
import { BsSun, BsMoonStars } from "react-icons/bs"

const ThemeToggler = () => {
    const { theme, changeTheme } = useGlobalContext()

    return (
        <button type="button" onClick={changeTheme} className="theme-btn" data-testid="theme-btn">
            {theme === "light-theme" ? (
                <BsMoonStars size={30} data-testid="moon-btn" />
            ) : (
                <BsSun size={30} data-testid="sun-btn" />
            )}
        </button>
    )
}

export default ThemeToggler
