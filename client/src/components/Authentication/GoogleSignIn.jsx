import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function GoogleSignIn() {
  const provider = new GoogleAuthProvider();

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button className="google-button" onClick={handleGoogleSignIn}>Google Sign In</button>
  )
}
