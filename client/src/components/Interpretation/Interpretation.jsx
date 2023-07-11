import { useState } from "react";
import useAppContext from "../App/useAppContext";
import "./Interpretation.css"

export default function Interpretation() {
  const { setNeedsUpdate, userId, interpretationState, setInterpretationState } = useAppContext();
  const { keywords, chatOutput, imageUrl, isPosted } = interpretationState;

  const bulletsOutput = chatOutput.split("• ");
  bulletsOutput.shift();

  const mainOutput = bulletsOutput.pop();

  const [isPosting, setIsPosting] = useState(false);
  const [shareFailed, setShareFailed] = useState(false);

  async function postDream(isPublic) {
    if (!isPosted) {
      try {
        setIsPosting(true);
        const response = await fetch("https://dreamwake-ai.onrender.com/gallery", {
        // const response = await fetch ("http://localhost:5000/gallery", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keywords, mainOutput, imageUrl, bulletsOutput, userId, isPublic })
        })
        if (response.ok) {
          setInterpretationState(prevState => ({...prevState, isPosted: true}));
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
      {isPosted ? <button className="shared-button">Posted</button> :
        shareFailed ? <button className="disabled-button">Post Failed</button> :
          isPosting ? <button className="posting-button">Posting...</button> :
            <div className="share-buttons-container">
              <button className="share-button" onClick={() => postDream(true)}>Share to Gallery</button>
              {userId ? <button className="share-button" onClick={() => postDream(false)}>Save to Journal</button> :
                <button className="disabled-button">Save to Journal<span className="sign-in-needed">Sign in needed</span></button>}
            </div>
      }
    </>
  )
}
