import { useState } from "react";
import useAppContext from "../App/useAppContext";
import { Link } from "react-router-dom";
import { Loader } from ".."
import "./Journal.css";

export default function Journal() {
  const { dreamsData, userId } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  if (!userId) {
    return (
      <h3>Sign in needed</h3>
    )
  }

  const userDreams = dreamsData && dreamsData.filter(dream => dream.userId == userId && dream.keywords.toLowerCase().includes(searchQuery)).map(dream => {
    return (
      <Link to={`/journal/${dream._id}`} key={dream._id} className="journal-dream">
        <div>
          <img src={dream.imageUrl} className="journal-dream-image"/>
          <h5>{dream.keywords}</h5>
        </div>
      </Link>
    )
  })

  return (
    <>
      {dreamsData ? userDreams.length ?
        <div className="journal">
          <input className="searchbar" placeholder="Search keywords" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}/>
          <div className="journal-dreams-container">
            {userDreams}
          </div>
        </div>:
        <h3>No dreams</h3> : <Loader />}
    </>
  )
}
