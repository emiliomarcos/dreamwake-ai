import { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import { Loader } from "../"
import "./Dream.css"

export default function Dream() {
  const { dreamsData, userId, updateDreamsData, updateDeletedDream } = useAppContext();
  const { dreamId } = useParams();

  const [loading, setLoading] = useState(true);
  const [bullets, setBullets] = useState(null);
  const [deleted, setDeleted] = useState(false);

  function handleArray(bulletsArray) {
    setBullets(bulletsArray.map(bullet => {
      return (
        <li key={bullet}>{bullet}</li>
      )
    }))
  }

  const dream = dreamsData && dreamsData.find(dream => dream._id === dreamId);

  useEffect(() => {
    if (dreamsData) {
      setLoading(false);
      if (dream && dream.bulletsOutput) {
        handleArray(dream.bulletsOutput);
      }
      setLoading(false);
    }
  }, [dreamsData, dream])

  async function updateDream() {
    try {
      // const responseDB = await fetch("https://dreamwake-ai.onrender.com/dream", {
      const response = await fetch ("http://localhost:5000/dream", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: dreamId, isPublic: !dream.isPublic })
      })
      if (response.ok) {
        console.log(response);
        updateDreamsData(dreamId, !dream.isPublic);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteDream() {
    try {
      // const responseDB = await fetch("https://dreamwake-ai.onrender.com/dream", {
      const response = await fetch ("http://localhost:5000/dream", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: dreamId })
      })
      if (response.ok) {
        console.log(response);
        updateDeletedDream(dreamId);
        setDeleted(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (dream) {
    return (
      <>
        <div className="dream">
          <h2 className="dream-keywords">{dream.keywords}</h2>
          <img src={dream.imageUrl} className="dream-image"/>
          <ul>{bullets}</ul>
          <h4 className="dream-full-interpretation">{dream.mainOutput}</h4>
        </div>
        {userId && dream.userId == userId ?
          <div className="update-buttons-container">
            <button className={dream.isPublic ? "update-unpost-button" : "update-post-button"} onClick={updateDream}>{dream.isPublic ? "Unshare from Gallery" : "Share to gallery"}</button>
            <button className="delete-button" onClick={deleteDream}>Delete Entirely</button>
          </div> : null
        }
      </>
    )
  } else if (loading) {
    return (
      <Loader />
    )
  } else if (deleted) {
    return (
      <h3>Dream deleted</h3>
    )
  } else {
    return (
      <h3>Dream not found</h3>
    )
  }
}
