import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  async function handlePasswordReset(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handlePasswordReset}>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
      <button>Reset Password</button>
    </form>
  )
}
