import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DreamForm, Explore, Dream } from './components'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="navbar-link">Interpret</Link>
        <Link to="/dreams" className="navbar-link">Explore</Link>
      </nav>
      <h1>Dreamwake AI</h1>
      <Routes>
        <Route path="/" element={<DreamForm />} />
        <Route path="/dreams" element={<Explore />} />
        <Route path="/dreams/:dreamId" element={<Dream />} />
      </Routes>
    </BrowserRouter>
  )
}
