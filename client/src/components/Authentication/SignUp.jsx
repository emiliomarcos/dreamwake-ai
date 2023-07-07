import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpUser(e) {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={signUpUser} className="signup-form">
      <input type="email" placeholder="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}></input>
      <input type="password" placeholder="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}></input>
      <button className="signup-button">Sign Up</button>
    </form>
  )
}
