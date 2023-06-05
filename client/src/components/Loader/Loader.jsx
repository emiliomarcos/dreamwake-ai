import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassStart, faHourglassHalf, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import "./Loader.css"

const hourglassIcons = [faHourglassStart, faHourglassHalf, faHourglassEnd];

export default function Loader() {
  const [iconIndex, setIconIndex] = useState(0);
  console.log(iconIndex)

  useEffect(() => {
    const interval = setInterval(() => {
      if (iconIndex < 2) {
        setIconIndex(prevIconIndex => prevIconIndex += 1);
      } else {
        setIconIndex(0);
      }
    }, 750);

    return () => clearInterval(interval);
  }, [iconIndex])

  return (
    <div id="loader">
      <FontAwesomeIcon icon={hourglassIcons[iconIndex]} size="xl" />
    </div>
  )
}
