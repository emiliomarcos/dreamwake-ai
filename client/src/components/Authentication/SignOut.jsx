import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignOut() {
  async function signOutUser() {
    try {
      signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button onClick={signOutUser}>Sign Out</button>
  )
}
