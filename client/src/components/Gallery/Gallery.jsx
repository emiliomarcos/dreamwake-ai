import { useState } from "react";
import useAppContext from "../App/useAppContext";
import { Link } from "react-router-dom";
import { Loader } from ".."
import "./Gallery.css";

export default function Gallery() {
  const { dreamsData } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  const dreams = dreamsData && dreamsData.filter(dream => dream.isPublic != false && dream.keywords.toLowerCase().includes(searchQuery)).map(dream => {
    return (
      <Link to={`/gallery/${dream._id}`} key={dream._id} className="gallery-dream">
        <div>
          <img src={dream.imageUrl} className="gallery-dream-image"/>
          <h5>{dream.keywords}</h5>
        </div>
      </Link>
    )
  })

  return (
    <>
      {dreamsData ? dreams.length ?
        <>
          <input className="searchbar" placeholder="Search keywords" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}/>
          <div className="gallery-dreams-container">
            {dreams}
          </div>
        </>:
        <h3>No dreams</h3> : <Loader />}
    </>
  )
}
