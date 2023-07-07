import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Authentication.css";

export default function LogOut() {
  async function logOutUser() {
    try {
      signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button onClick={logOutUser} className="logout-button">Log Out</button>
  )
}
