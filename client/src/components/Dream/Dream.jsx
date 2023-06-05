import { useParams } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import "./Dream.css"

export default function Dream() {
  const { dreamsData } = useAppContext();
  const { dreamId } = useParams();
  return (
    <>
      <h2>{dreamsData}</h2>
    </>
  )
}
