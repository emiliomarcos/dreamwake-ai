import { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import { Loader } from "../"
import "./Dream.css"

export default function Dream() {
  const { dreamsData, userId } = useAppContext();
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

  async function updateDream() {
    try {
      const response = await fetch ("http://localhost:5000/dream", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: dreamId, isPublic: !dream.isPublic })
      })
      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (dream) {
    return (
      <div className="dream">
        <h2 className="dream-keywords">{dream.keywords}</h2>
        <img src={dream.imageUrl} className="dream-image"/>
        <ul>{bullets}</ul>
        <h4 className="dream-full-interpretation">{dream.mainOutput}</h4>
        {userId && dream.userId == userId ?
          dream.isPublic ? <button onClick={updateDream}>Unshare from Gallery</button> :
            <button onClick={updateDream}>Share to Gallery</button> : null}
      </div>
    )
  } else {
    return (
      <Loader />
    )
  }
}
