import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Sarathi-X</h1>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#HowItwork">HowItWork</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <Link to="/login">
        <button className="start-btn">
          Get Started
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;