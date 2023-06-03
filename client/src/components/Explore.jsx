import { useState, useEffect } from "react";

export default function Explore() {
  const [dreamsData, setDreamsData] = useState(null);

  const dreams = dreamsData && dreamsData.map(dream => {
    return (
      <div className="dream" key={dream._id}>
        <img src={dream.imageUrl} className="explore-image"/>
        <h5>{dream.keywords}</h5>
      </div>
    )
  })

  useEffect(() => {
    async function getDreams() {
      try {
        // const responseDB = await fetch("https://dreamwake-ai.onrender.com/dreams", {
        const responseDB = await fetch("http://localhost:5000/dreams", {
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
    <div className="explore-dreams">
      {dreamsData && dreams}
      {/* {dreamsData && dreams[13]}
      {dreamsData && dreams[14]}
      {dreamsData && dreams[15]}
      {dreamsData && dreams[16]} */}
    </div>
  )
}
