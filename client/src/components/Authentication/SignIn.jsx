import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInUser(e) {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  return (
    <form onSubmit={signInUser}>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button>Sign in</button>
    </form>
  )
}
