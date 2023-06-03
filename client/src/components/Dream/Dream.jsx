import { useParams } from "react-router-dom";
import "./Dream.css"

export default function Dream() {
  const { dreamId } = useParams();
  return (
    <>
      <h2>{dreamId}</h2>
    </>
  )
}
