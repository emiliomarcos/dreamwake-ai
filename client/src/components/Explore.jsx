import { useState, useEffect } from "react";

export default function Explore() {
  const [dreams, setDreams] = useState(null);

  useEffect(() => {
    async function getDreams() {
      try {
        const response = await fetch("http://localhost:5000/dreams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.ok) {
          console.log(response.json());
        }
      } catch (error) {
        console.error(error);
      }
    }

    getDreams();
  }, []);

  return (
    <>
      <h2>Hello</h2>
    </>
  )
}
