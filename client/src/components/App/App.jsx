import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DreamForm, Explore, Dream, Navbar } from '../';
import './App.css'

export const AppContext = createContext();

export default function App() {
  const [dreamsData, setDreamsData] = useState(null);

  useEffect(() => {
    async function getDreamsData() {
      try {
        const responseDB = await fetch("https://dreamwake-ai.onrender.com/dreams", {
        // const responseDB = await fetch("http://localhost:5000/dreams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (responseDB.ok) {
          const data = await responseDB.json();
          console.log(data);
          setDreamsData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getDreamsData();
  }, []);


  return (
    <AppContext.Provider value={{ dreamsData, setDreamsData }}>
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
    </AppContext.Provider>
  )
}
