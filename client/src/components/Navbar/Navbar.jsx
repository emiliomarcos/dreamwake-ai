import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="navbar-title"><h2>DreamWake AI</h2></Link>
      <Link to="/" className="navbar-link">Interpret</Link>
      <Link to="/dreams" className="navbar-link">Explore</Link>
      <Link to="/luciddream" className="navbar-link">Lucid Dream</Link>
      <Link to="/authentication" className="navbar-icon"><FontAwesomeIcon icon={faUserAstronaut} size="xl" /></Link>
    </nav>
  )
}
