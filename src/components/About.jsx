import React from "react";

const About = () => {
  return (
    <section id="about" className="section">
      
      <h2>About Sarathi-X</h2>

      <p>
        Sarathi-X is an AI-powered platform designed to help students
        learn smarter, improve technical skills, prepare for quizzes,
        and receive intelligent career guidance.
      </p>

      <div className="about-cards">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To make education smarter, interactive, and accessible.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            Empower every student with AI-driven learning tools.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;