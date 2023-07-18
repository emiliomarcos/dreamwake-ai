import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp} className="authentication-form">
        <div className="authentication-inputs">
          <input className="email-input" type="email" placeholder="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}></input>
          <input type="password" placeholder="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <button className="signup-button">Sign Up</button>
      </form>
      <div className="secondary-container">
        <Link to="/authentication"><button className="secondary-button">Sign In</button></Link>
        <Link to="/authentication/forgotpassword"><button className="secondary-button">Forgot Password</button></Link>
      </div>
      <GoogleSignIn />
    </>
  )
}
