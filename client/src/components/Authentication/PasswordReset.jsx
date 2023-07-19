import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../App/useAppContext";
import GoogleSignIn from "./GoogleSignIn";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

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
      setEmailFailed(false);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      setEmailFailed(true);
    }
  }

  return (
    <>
      <form className="authentication-form" onSubmit={handlePasswordReset}>
        <div className="authentication-inputs">
          <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        {emailSent ? <button className="password-sent-button">Email Sent</button> :
          <button className="password-send-button">Reset Password</button>
        }
        {emailFailed ? <span className="invalid">Invalid User</span> : null}
      </form>
      <div className="secondary-container">
        <Link to="/authentication"><button className="secondary-button">Sign In</button></Link>
        <Link to="/authentication/signup"><button className="secondary-button">Sign Up</button></Link>
      </div>
      <GoogleSignIn />
    </>
  )
}
