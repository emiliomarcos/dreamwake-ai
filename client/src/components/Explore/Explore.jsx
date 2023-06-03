import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "./Explore.css"

export default function Explore() {
  const [dreamsData, setDreamsData] = useState(null);

  const dreams = dreamsData && dreamsData.map(dream => {
    return (
      <Link to={`/dreams/${dream._id}`} key={dream._id}>
        <div className="explore-dream">
          <img src={dream.imageUrl} className="explore-dream-image"/>
          <h5>{dream.keywords}</h5>
        </div>
      </Link>
    )
  })

  useEffect(() => {
    async function getDreams() {
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

    getDreams();
  }, []);

  return (
    <div className="explore-dreams-container">
      {dreamsData && dreams}
    </div>
  )
}
