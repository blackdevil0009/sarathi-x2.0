import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Sarathi-X</h2>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#quiz">Quiz</a></li>
        <li><a href="#ai">AI Assistant</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#HowItWork">HowItWork</a></li>
        <li><a href="#Dashboard">Dashboard</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;