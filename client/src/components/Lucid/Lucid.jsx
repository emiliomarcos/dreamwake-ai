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
      // const responseLucid = await fetch("https://dreamwake-ai.onrender.com/luciddream", {
      const responseLucid = await fetch("http://localhost:5000/luciddream", {
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
    loadingStatus ? <Loader /> : lucidOutput ? lucidOutput : <button onClick={handleClick}>Ask AI</button>
  )
}
