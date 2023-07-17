import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function GoogleSignIn() {
  const provider = new GoogleAuthProvider();

  async function handleGoogleSignIn() {
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button onClick={handleGoogleSignIn}>Google Sign In</button>
  )
}
