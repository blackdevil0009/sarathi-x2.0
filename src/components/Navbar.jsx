import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Sarathi-X</h1>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#ai">AI</a></li>
        <li><a href="#quiz">Quiz</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <a href="#dashboard">
        <button className="start-btn">Get Started</button>
      </a>
    </nav>
  );
}

export default Navbar;