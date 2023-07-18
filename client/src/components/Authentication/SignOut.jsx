import useAppContext from "../App/useAppContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignOut() {
  const { setInterpretationState } = useAppContext();

  async function handleSignOut() {
    try {
      await signOut(auth);
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
    <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
  )
}
