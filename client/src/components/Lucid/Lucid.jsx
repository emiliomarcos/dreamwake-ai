import { useState } from "react";
import { Loader } from "../";
import "./Lucid.css"

export default function Lucid() {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [lucidOutput, setLucidOutput] = useState(null);

  const lucidPrompt = "Give me some basic tips for lucid dreaming without talking about techniques";

  const aiTips = lucidOutput && <div className="ai-tips"><h2>AI Tips</h2>{lucidOutput}</div>

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
          <li><strong>Mnemonic Induction of Lucid Dreams (MILD)</strong>: This technique involves thinking about having a lucid dream, recalling dreams, and visualizing becoming lucid before sleeping.</li>
          <li><strong>Wake Induced Lucid Dreams (WILD)</strong>: This technique involves consciously falling asleep, transitioning from being awake to your body sleeping before your brain, to the dream state.</li>
          <li><strong>Wake Back to Bed (WBTB)</strong>: This technique involves waking up for a few minutes or even a few hours and then going back to sleep, to more easily enter REM state directly and catch yourself dreaming.</li>
          <li><strong>Finger Induced Lucid Dreams (FILD)</strong>: This technique involves sleeping after waking up for a very short time and fall back asleep while gently moving your fingers and using them on some thought action.</li>
          <li><strong>Reality Checks</strong>: This technique goes well with the rest, and it simply involves performing personal reality checks during the day to aim for you to do them during your dreams.</li>
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
      {loadingStatus ? <Loader /> : lucidOutput ? aiTips : <button className="ask-ai-button" onClick={handleClick}>AI Tips</button>}
    </>
  )
}
