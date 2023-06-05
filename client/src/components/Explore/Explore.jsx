import useAppContext from "../App/useAppContext";
import { Link } from "react-router-dom";
import "./Explore.css";

export default function Explore() {
  const { dreamsData } = useAppContext();

  const dreams = dreamsData && dreamsData.map(dream => {
    return (
      <Link to={`/dreams/${dream._id}`} key={dream._id} className="explore-dream">
        <div>
          <img src={dream.imageUrl} className="explore-dream-image"/>
          <h5>{dream.keywords}</h5>
        </div>
      </Link>
    )
  })

  return (
    <div className="explore-dreams-container">
      {dreamsData && dreams}
    </div>
  )
}
