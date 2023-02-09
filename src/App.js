import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useEffect } from "react"
import Home from './pages/Home'
import QuestionList from "./pages/QuestionList"
import Footer from "./Components/Footer"
import { useGlobalContext } from "./context"
import {BsSun, BsMoonStars} from "react-icons/bs"

function App() {
  const {theme, changeTheme} = useGlobalContext()

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <Router>
      <button type="button" onClick={changeTheme} className="theme-btn">
        {theme === "light-theme" ? <BsMoonStars size={30}/> : <BsSun size={30}/>}
      </button>
      <Routes>
        <Route path="/quizzical" element={<Home />}>
          <Route path="/quizzical/questions" element={<QuestionList />}></Route>
        </Route>
        <Route path="*" element={<h2>Page Not Found</h2>}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
