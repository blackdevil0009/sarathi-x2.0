function Navbar() {
  return (
    <nav className="navbar">
      <h2>Sarathi-X</h2>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#quiz">Quiz</a></li>
        <li><a href="#ai">AI Assistant</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button className="btn">Get Started</button>
    </nav>
  );
}

export default Navbar;