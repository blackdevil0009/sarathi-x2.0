import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-box">
          <h2>Sarathi-X</h2>
          <p>
            Smart AI-powered learning platform for students,
            coding practice, quizzes, and career guidance.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#HowItwork">HowItWork</a>
          <a href="#features">Features</a>
          <a href="#quiz">Quiz</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-box">
          <h3>Features</h3>

          <p>✅ AI Assistant</p>
          <p>✅ Coding Practice</p>
          <p>✅ Smart Quiz</p>
          <p>✅ Career Guidance</p>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>

          <p>Email: support@sarathix.com</p>
          <p>Phone: +91 9876543210</p>
          <p>India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Sarathi-X | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;