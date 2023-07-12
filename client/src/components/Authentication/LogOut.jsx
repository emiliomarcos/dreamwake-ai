import useAppContext from "../App/useAppContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function LogOut() {
  const { setInterpretationState } = useAppContext();

  async function logOutUser() {
    try {
      signOut(auth);
      setInterpretationState({
        keywords: "",
        chatOutput: null,
        imageUrl: null,
        isPosted: false
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="logout-button" onClick={logOutUser}>Log Out</button>
  )
}
