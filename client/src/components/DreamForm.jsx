import { useState } from "react";

export default function DreamForm() {
  const [keywords, setKeywords] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const prompt = `give me a dream interpretation of each of the following keywords and only include positive meanings of what these words could possibly represent in my dream, give me this in bullet points and a short full dream interpretation in the end: ${keywords}`;

    try {
      const response = await fetch("http://localhost:5000/api/dream-interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const interpretation = await response.json();

      console.log(interpretation);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dream keywords:
        <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} />
      </label>
      <button>
        Submit
      </button>
    </form>
  )
}
