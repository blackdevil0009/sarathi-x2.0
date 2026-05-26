import React from "react";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Welcome to Sarathi-X</h1>

        <p>
          Your AI-powered learning and career guidance platform.
          Explore quizzes, ask AI questions, and improve your skills.
        </p>

        <div className="hero-btns">
          <button>Get Started</button>
          <button className="secondary">Explore Quiz</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;