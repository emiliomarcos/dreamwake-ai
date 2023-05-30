import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";


export default function DreamForm() {
  const [chatPrompt, setChatPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [interpretation, setInterpretation] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoadingStatus(true);
      const promiseGpt = fetch("http://localhost:5000/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ chatPrompt })
      });

      const promiseDalle = fetch("http://localhost:5000/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ imagePrompt })
      })

      const [responseGpt, responseDalle] = await Promise.all([promiseGpt, promiseDalle]);

      if (responseGpt.ok) {
        const responseGptJSON = await responseGpt.json();
        setInterpretation(responseGptJSON.choices[0].text);
      } else {
        console.error(responseGpt);
      }

      if (responseDalle.ok) {
        const responseDalleJSON = await responseDalle.json();
        setImageUrl(responseDalleJSON.data[0].url);
      } else {
        console.error(responseDalle);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatus(false);
    }
  }

  function handlePrompts(e) {
    setChatPrompt(`give me a dream interpretation of each of the following keywords and only include positive meanings of what these words could possibly represent in my dream, give me this in bullet points and a short full dream interpretation in the end: ${e.target.value}`);
    setImagePrompt(`lucid dreaming scene with these keywords: ${e.target.value}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Dream keywords:
          <input type="text" onChange={handlePrompts} />
        </label>
        <button>
          Dream On
        </button>
      </form>
      {loadingStatus && <div className="loading">{loadingStatus && <FontAwesomeIcon icon={faMoon} size="xl" spin />}</div>}
      <div className="interpretation">
        {!loadingStatus && interpretation}
      </div>
      <div>
        {!loadingStatus && <img src={imageUrl} />}
      </div>
    </>
  )
}
