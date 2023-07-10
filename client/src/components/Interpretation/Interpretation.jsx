import { useState } from "react";
import useAppContext from "../App/useAppContext";
import "./Interpretation.css"

export default function Interpretation() {
  const { setNeedsUpdate, userId, keywords, chatOutput, imageUrl } = useAppContext();

  const bulletsOutput = chatOutput.split("• ");
  bulletsOutput.shift();

  const mainOutput = bulletsOutput.pop();

  const [sharedStatus, setSharedStatus] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [shareFailed, setShareFailed] = useState(false);

  async function postDream(isPublic) {
    if (!sharedStatus) {
      try {
        setIsPosting(true);
        // const response = await fetch("https://dreamwake-ai.onrender.com/gallery", {
        const response = await fetch ("http://localhost:5000/gallery", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keywords, mainOutput, imageUrl, bulletsOutput, userId, isPublic })
        })
        if (response.ok) {
          setSharedStatus(true);
          setNeedsUpdate(true);
        } else {
          setShareFailed(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsPosting(false);
      }
    }
  }

  return (
    <>
      <div className="interpretation">
        <h2>{keywords}</h2>
        {bulletsOutput && <ul>{bulletsOutput.map((text, index) => <li key={index}>{text}</li>)}</ul>}
        <h4>{mainOutput}</h4>
      </div>
      <div className="image">
        <img src={`data:image/png;base64,${imageUrl}`} />
      </div>
      {!shareFailed ? isPosting ? <button className="posting-button">Sharing...</button> :
        <button className={sharedStatus ? "shared-button" : "share-button"} onClick={() => postDream(true)}>{sharedStatus ? "Shared" : "Share to the world"}</button> :
        <button className="failed-button">Failed to share</button>}
      {!shareFailed ? isPosting ? <button className="posting-button">Sharing...</button> :
        <button className={sharedStatus ? "shared-button" : "share-button"} onClick={() => postDream(false)}>{sharedStatus ? "Saved" : "Save to my journal"}</button> :
        <button className="failed-button">Failed to share</button>}
    </>
  )
}
