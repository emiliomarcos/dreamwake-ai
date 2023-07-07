import useAppContext from "../App/useAppContext"
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import LogOut from "./LogOut";

export default function Authentication() {

  const { userId } = useAppContext();

  return (
    <>
      {userId ?
        <LogOut /> :
        <>
          <LogIn />
          <SignUp />
        </>}
    </>
  )
}
