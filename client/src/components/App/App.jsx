import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DreamForm, Gallery, Dream, Navbar, Lucid, Authentication, Journal } from '../';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import './App.css'

export const AppContext = createContext();

export default function App() {
  const [dreamsData, setDreamsData] = useState(null);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [userId, setUserId] = useState(null);
  const [interpretationState, setInterpretationState] = useState({
    keywords: "",
    chatOutput: null,
    imageUrl: null,
    isPosted: false
  })

  useEffect(() => {
    async function getDreamsData() {
      try {
        // const responseDB = await fetch("https://dreamwake-ai.onrender.com/gallery", {
        const responseDB = await fetch("http://localhost:5000/gallery", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (responseDB.ok) {
          const data = await responseDB.json();
          setDreamsData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setNeedsUpdate(false);
      }
    }
    getDreamsData();
  }, [needsUpdate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    })
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ dreamsData, needsUpdate, setNeedsUpdate, userId, interpretationState, setInterpretationState }}>
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<DreamForm />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:dreamId" element={<Dream />} />
            <Route path="/luciddream" element={<Lucid />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:dreamId" element={<Dream />} />
            <Route path="/authentication" element={<Authentication />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
