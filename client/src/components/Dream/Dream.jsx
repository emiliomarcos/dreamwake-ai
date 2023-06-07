import { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import { Loader } from "../"
import "./Dream.css"

export default function Dream() {
  const { dreamsData } = useAppContext();
  const { dreamId } = useParams();

  const [bullets, setBullets] = useState(null);

  function handleArray(bulletsArray) {
    setBullets(bulletsArray.map(bullet => {
      return (
        <li key={bullet}>{bullet}</li>
      )
    }))
  }

  const dream = dreamsData && dreamsData.find(dream => dream._id === dreamId);

  useEffect(() => {
    if (dream && dream.bulletsOutput) {
      handleArray(dream.bulletsOutput)
    }
  }, [dream])

  if (dream) {
    return (
      <>
        <h2 className="dream-keywords">{dream.keywords}</h2>
        <img src={dream.imageUrl} className="dream-image"/>
        <ul>{bullets}</ul>
        <h4>{dream.mainOutput}</h4>
      </>
    )
  } else {
    return (
      <Loader />
    )
  }
}
