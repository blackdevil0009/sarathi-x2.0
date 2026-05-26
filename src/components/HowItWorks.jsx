import React from "react";

const HowItWorks = () => {
  return (
    <section id="howitworks" className="how-section">
      <h1>How Sarathi-X Works</h1>

      <div className="steps-container">
        <div className="step-card">
          <h2>1️⃣ Create Account</h2>
          <p>
            Students join the platform and access smart learning tools,
            quizzes, coding support, and AI features.
          </p>
        </div>

        <div className="step-card">
          <h2>2️⃣ Learn & Practice</h2>
          <p>
            Explore coding concepts, practice quizzes, solve problems,
            and improve technical skills step-by-step.
          </p>
        </div>

        <div className="step-card">
          <h2>3️⃣ Ask AI Assistant</h2>
          <p>
            Get instant answers, explanations, coding help,
            interview preparation, and career guidance using AI.
          </p>
        </div>

        <div className="step-card">
          <h2>4️⃣ Track Progress</h2>
          <p>
            Monitor quiz scores, learning growth, and coding performance
            to improve continuously.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;