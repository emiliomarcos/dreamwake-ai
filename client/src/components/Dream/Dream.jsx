import { useParams } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import { Loader } from "../"
import "./Dream.css"

export default function Dream() {
  const { dreamsData } = useAppContext();
  const { dreamId } = useParams();

  const dream = dreamsData && dreamsData.find(dream => dream._id === dreamId);

  if (dream) {
    return (
      <>
        <h2 className="dream-keywords">{dream.keywords}</h2>
        <img src={dream.imageUrl} className="dream-image"/>
        <p>{dream.bulletsOutput && dream.bulletsOutput}</p>
        <h5>{dream.mainOutput}</h5>
      </>
    )
  } else {
    return (
      <Loader />
    )
  }
}
