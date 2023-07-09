import useAppContext from "../App/useAppContext";
import { Link } from "react-router-dom";
import { Loader } from ".."
import "./Gallery.css";

export default function Gallery() {
  const { dreamsData } = useAppContext();

  const dreams = dreamsData && dreamsData.map(dream => {
    return (
      <Link to={`/dreams/${dream._id}`} key={dream._id} className="gallery-dream">
        <div>
          <img src={dream.imageUrl} className="gallery-dream-image"/>
          <h5>{dream.keywords}</h5>
        </div>
      </Link>
    )
  })

  return (
    <div className="gallery-dreams-container">
      {dreamsData ? dreams : <Loader />}
    </div>
  )
}
