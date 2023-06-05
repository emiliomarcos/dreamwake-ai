import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="navbar-title"><h2>Dreamwake AI</h2></Link>
      <Link to="/" className="navbar-link">Interpret</Link>
      <Link to="/dreams" className="navbar-link">Explore</Link>
    </nav>
  )
}
