import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpUser(e) {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  return (
    <form onSubmit={signUpUser}>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}></input>
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></input>
      <button>Sign Up</button>
    </form>
  )
}
