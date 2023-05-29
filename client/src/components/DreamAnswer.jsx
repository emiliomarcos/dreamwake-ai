import { useState, useEffect } from "react";

export default function DreamAnswer() {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    async function getAnswer() {
      try {
        const response = await fetch("http://localhost:5000");

        if (response.ok) {
          setAnswer(response.choices[0].text);
        }

      }
      catch (error) {
        console.error(error);
      }
    }

    getAnswer();
  }, [])

  return (
    <div>
      <h2>${answer}</h2>
    </div>
  )
}
