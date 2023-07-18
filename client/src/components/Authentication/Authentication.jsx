import useAppContext from "../App/useAppContext"
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import GoogleSignIn from "./GoogleSignIn";
import { Link } from "react-router-dom";

export default function Authentication() {

  const { userId } = useAppContext();

  return (
    <>
      {userId ?
        <SignOut /> :
        <>
          <SignIn />
          <div className="secondary-container">
            <Link to="/authentication/signup"><button className="secondary-button">Sign Up</button></Link>
            <Link to="/authentication/forgotpassword"><button className="secondary-button">Forgot Password</button></Link>
          </div>
          <GoogleSignIn />
        </>}
    </>
  )
}
