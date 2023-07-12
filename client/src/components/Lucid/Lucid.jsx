import { useState } from "react";
import { Loader } from "../";
import "./Lucid.css"

export default function Lucid() {
  const [lucidPrompt, setLucidPrompt] = useState("Give me some basic tips for lucid dreaming including the most popular techniques");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [lucidOutput, setLucidOutput] = useState(null);

  async function handleClick(e) {
    e.preventDefault();

    try {
      setLoadingStatus(true);
      const responseLucid = await fetch("https://dreamwake-ai.onrender.com/luciddream", {
      // const responseLucid = await fetch("http://localhost:5000/luciddream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ lucidPrompt })
      });
      setLucidPrompt("Give me some basic tips for lucid dreaming including the most popular techniques");
      if (responseLucid.ok) {
        const responseLucidJSON = await responseLucid.json();
        setLucidOutput(responseLucidJSON.choices[0].text);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatus(false);
    }
  }

  return (
    <>
      <div className="lucid-info">
        <h2>What is Lucid Dreaming?</h2>
        <p>Lucid dreaming is the phenomenon where a dreamer becomes aware that they are dreaming, while they are in the dream. This awareness can range from faint recognition of the dream state to a momentous broadening of perspective. Lucid dreamers can often manipulate and control their dreams, creating an extraordinary virtual reality.</p>

        <h2>Techniques to Induce Lucid Dreaming</h2>
        <ul>
          <li><strong>Mnemonic Induction of Lucid Dreams (MILD)</strong>: This technique involves waking up after a period of sleep and then developing the intention to remember that you are dreaming before returning to sleep.</li>
          <li><strong>Wake Back to Bed (WBTB)</strong>: WBTB involves waking up for a few minutes after a period of sleep and then going back to sleep, aiming to enter a REM sleep period where dreams are more likely to occur.</li>
          <li><strong>Wake Induced Lucid Dreams (WILD)</strong>: This technique is based on transitioning from the awake state directly into the dream state while maintaining consciousness.</li>
        </ul>

        <h2>Benefits of Lucid Dreaming</h2>
        <p>Lucid dreaming provides a uniquely rich and vivid dream world, where everything you see, hear, touch, taste, and smell can be as authentic as reality. Some of the key benefits include:</p>
        <ul>
          <li>Enhancing creativity and problem-solving skills</li>
          <li>Practicing real-life skills</li>
          <li>Overcoming nightmares</li>
          <li>Exploring personal issues and self-reflection</li>
        </ul>
      </div>
      {loadingStatus ? <Loader /> : lucidOutput ? lucidOutput : <button onClick={handleClick}>Ask AI</button>}
    </>
  )

  // return (
  //   loadingStatus ? <Loader /> : lucidOutput ? lucidOutput : <button onClick={handleClick}>Ask AI</button>
  // )
}
