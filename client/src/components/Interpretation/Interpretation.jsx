import { useState } from "react";
import PropTypes from "prop-types";
import "./Interpretation.css"

export default function Interpretation({ keywords, chatOutput, imageUrl }) {
  const bulletsOutput = chatOutput.split("• ");
  bulletsOutput.shift();

  const mainOutput = bulletsOutput.pop();

  const [sharedStatus, setSharedStatus] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  async function postDream() {
    if (!sharedStatus) {
      try {
        setIsPosting(true);
        // const response = await fetch("https://dreamwake-ai.onrender.com/dreams", {
        const response = await fetch ("http://localhost:5000/dreams", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keywords, mainOutput, imageUrl, bulletsOutput })
        })
        if (response.ok) {
          setSharedStatus(true);
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
        {bulletsOutput && <ul>{bulletsOutput.map((text, index) => <li key={index}>{text}</li>)}</ul>}
        <h4>{mainOutput}</h4>
      </div>
      <div className="image">
        <img src={`data:image/png;base64,${imageUrl}`} />
      </div>
      {isPosting ? <button className="posting-button">Sharing...</button> :
        <button className={sharedStatus ? "shared-button" : "share-button"} onClick={postDream}>{sharedStatus ? "Shared" : "Share to the world"}</button>
      }
    </>
  )
}

Interpretation.propTypes = {
  keywords: PropTypes.string.isRequired,
  chatOutput: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}
