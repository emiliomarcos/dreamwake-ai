import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSignIn} className="authentication-form">
      <div className="authentication-inputs">
        <input className="email-input" type="email" placeholder="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type="password" placeholder="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button className="signin-button">Sign In</button>
    </form>
  )
}
