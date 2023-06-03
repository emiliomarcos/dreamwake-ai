import { useParams } from "react-router-dom";

export default function Dream() {
  const { dreamId } = useParams();
  return (
    <>
      <h2>{dreamId}</h2>
    </>
  )
}
