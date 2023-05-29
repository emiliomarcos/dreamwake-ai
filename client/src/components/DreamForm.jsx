import { useEffect, useState } from "react";

export default function DreamForm() {
  const [prompt, setPrompt] = useState("");
  const [interpretation, setInterpretation] = useState(null);

  useEffect(() => {
    console.log("interpretation: " + interpretation)
  }, [interpretation])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      console.log(response);

      if (response.ok) {
        const responseJSON = await response.json();
        setInterpretation(responseJSON.choices[0].text);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Dream keywords:
          <input type="text" onChange={e => setPrompt(`give me a dream interpretation of each of the following keywords and only include positive meanings of what these words could possibly represent in my dream, give me this in bullet points and a short full dream interpretation in the end: ${e.target.value}`)} />
        </label>
        <button>
          Submit
        </button>
      </form>
      <div className="interpretation">
        {interpretation}
      </div>
    </>
  )
}
