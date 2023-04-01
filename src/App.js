import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import QuestionList from "./pages/QuestionList"
import ThemeToggler from "./Components/ThemeToggler/ThemeToggler"
import { useGlobalContext } from "./context"

function App() {
    const { theme } = useGlobalContext()

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <Router>
            <ThemeToggler />
            <main>
                <Routes>
                    <Route path="/quizzical" element={<Home />}>
                        <Route
                            path="/quizzical/questions"
                            element={<QuestionList />}
                        ></Route>
                    </Route>
                    <Route path="*" element={<h2>Page Not Found</h2>}></Route>
                </Routes>
            </main>
        </Router>
    )
}

export default App
