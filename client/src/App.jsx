import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DreamForm, Explore, Dream, Navbar } from './components'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<DreamForm />} />
          <Route path="/dreams" element={<Explore />} />
          <Route path="/dreams/:dreamId" element={<Dream />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
