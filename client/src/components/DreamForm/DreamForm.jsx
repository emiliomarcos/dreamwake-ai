import { useState } from "react";
import useAppContext from "../App/useAppContext";
import { Interpretation, Loader } from "../";
import "./DreamForm.css"

export default function DreamForm() {
  const { interpretationState, setInterpretationState } = useAppContext();

  const [currentKeywords, setCurrentKeywords] = useState("");
  const [chatPrompt, setChatPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setInterpretationState(prevState => ({...prevState, keywords: currentKeywords, isPosted: false}));

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
        setInterpretationState(prevState => ({...prevState, chatOutput: responseGptJSON.choices[0].message.content}));
      } else {
        console.error(responseGpt);
      }

      if (responseDalle.ok) {
        const responseDalleJSON = await responseDalle.json();
        setInterpretationState(prevState => ({...prevState, imageUrl: responseDalleJSON.data[0].b64_json}));
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
    setCurrentKeywords(e.target.value);
    setChatPrompt(`Interpret each of the following dream keywords shortly and succintly, providing possible representations of each in the context of a dream. I'd like your responses to be separated by bullet points (•). Finally, give me a brief full dream interpretation, considering all these elements together. The keywords are: ${currentKeywords}. Your response should look like this:
    • Keyword 1: Interpretation
    • Keyword 2: Interpretation
    • Keyword 3: Interpretation
    • Full Dream Interpretation: Summary of all elements`)
    setImagePrompt(`lucid dreaming scene with these keywords: ${currentKeywords}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="dream-form">
        <input className="dream-input" type="text" placeholder="Dream keywords" onChange={handleKeywords} />
        <button>Dream On</button>
      </form>
      {loadingStatus ? <Loader /> : interpretationState.chatOutput && <Interpretation />}
    </>
  )
}
