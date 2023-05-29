import { useState, useEffect } from "react";

export default function Loading() {
  const [loader, setLoader] = useState("Dreaming");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoader(prevLoader => prevLoader + ".")
    }, 2000);

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {loader}
    </div>
  )
}
