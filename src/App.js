import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import QuestionList from "./pages/QuestionList"
import Footer from "./Components/Footer"

function App() {
  return (
    <Router>
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
