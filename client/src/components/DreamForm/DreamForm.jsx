import { useState } from "react";
import { Interpretation, Loader, SignIn, SignUp } from "../";
import "./DreamForm.css"

export default function DreamForm() {
  const [keywords, setKeywords] = useState("");
  const [chatPrompt, setChatPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [chatOutput, setChatOutput] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoadingStatus(true);
      const promiseGpt = fetch("https://dreamwake-ai.onrender.com/gpt", {
      // const promiseGpt = fetch("http://localhost:5000/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ chatPrompt })
      });

      const promiseDalle = fetch("https://dreamwake-ai.onrender.com/dalle", {
      // const promiseDalle = fetch("http://localhost:5000/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ imagePrompt })
      })

      const [responseGpt, responseDalle] = await Promise.all([promiseGpt, promiseDalle]);

      if (responseGpt.ok) {
        const responseGptJSON = await responseGpt.json();
        setChatOutput(responseGptJSON.choices[0].text);
      } else {
        console.error(responseGpt);
      }

      if (responseDalle.ok) {
        const responseDalleJSON = await responseDalle.json();
        setImageUrl(responseDalleJSON.data[0].b64_json);
      } else {
        console.error(responseDalle);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatus(false);
    }
  }

  function handleKeywords(e) {
    setKeywords(e.target.value);
    setChatPrompt(`give me a dream interpretation of each of the following keywords and only include positive meanings of what these words could possibly represent in my dream, at the end include a short • full dream interpretation, give me this separated in • : ${e.target.value}`);
    setImagePrompt(`lucid dreaming scene with these keywords: ${e.target.value}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="dream-form">
        <label>
          Dream keywords:
          <input type="text" onChange={handleKeywords} />
        </label>
        <button>
          Dream On
        </button>
      </form>
      {loadingStatus && <Loader />}
      {!loadingStatus && chatOutput && <Interpretation keywords={keywords} chatOutput={chatOutput} imageUrl={imageUrl} />}
      <SignIn />
      <br></br>
      <SignUp />
    </>
  )
}
