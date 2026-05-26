import React from "react";

const Features = () => {
  return (
    <section id="features" className="section">
      <h2>Features</h2>

      <div className="feature-grid">

        <div className="card">
          <h3>AI Assistant</h3>
          <p>Ask questions and get instant answers.</p>
        </div>

        <div className="card">
          <h3>Smart Quiz</h3>
          <p>Practice quizzes with scores and timer.</p>
        </div>

        <div className="card">
          <h3>Career Guidance</h3>
          <p>Get career recommendations and support.</p>
        </div>

        <div className="card">
          <h3>Skill Development</h3>
          <p>Improve coding and technical skills.</p>
        </div>

      </div>
    </section>
  );
};

export default Features;