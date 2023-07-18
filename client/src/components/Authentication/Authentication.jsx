import useAppContext from "../App/useAppContext"
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import LogOut from "./LogOut";
import GoogleSignIn from "./GoogleSignIn";
import { Link } from "react-router-dom";

export default function Authentication() {

  const { userId } = useAppContext();

  return (
    <>
      {userId ?
        <LogOut /> :
        <>
          <LogIn />
          <Link to="/authentication/forgotpassword"><button>Forgot Password</button></Link>
          <SignUp />
          <GoogleSignIn />
        </>}
    </>
  )
}
