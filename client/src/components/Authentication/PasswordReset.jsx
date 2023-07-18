import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import GoogleSignIn from "./GoogleSignIn";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const { userId } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/authentication");
    }
  }, [navigate, userId])

  async function handlePasswordReset(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="authentication-form" onSubmit={handlePasswordReset}>
        <div className="authentication-inputs">
          <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button className="password-button">Reset Password</button>
      </form>
      <div className="secondary-container">
        <Link to="/authentication"><button className="secondary-button">Sign In</button></Link>
        <Link to="/authentication/signup"><button className="secondary-button">Sign Up</button></Link>
      </div>
      <GoogleSignIn />
    </>
  )
}
