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
          <Link to="/authentication/forgotpassword"><button>Forgot Password</button></Link>
          <br></br>
          <Link to="/authentication/signup"><button>Sign Up</button></Link>
          <br></br>
          <GoogleSignIn />
        </>}
    </>
  )
}
