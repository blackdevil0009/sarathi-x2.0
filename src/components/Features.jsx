import "./Features.css";

function Features() {
  return (
    <section className="features-section" id="features">

      <div className="features-heading">
        <p>POWERFUL FEATURES</p>
        <h1>Why Students Choose Sarthi-X</h1>
      </div>

      <div className="features-grid">

        <div className="feature-box">
          <h2>💻 Smart Compiler</h2>
          <p>
            Write and run code instantly with beginner friendly coding support.
          </p>
        </div>

        <div className="feature-box">
          <h2>🧠 AI Assistant</h2>
          <p>
            Solve doubts, get explanations, and learn concepts interactively.
          </p>
        </div>

        <div className="feature-box">
          <h2>📊 Dashboard</h2>
          <p>
            View performance analytics, streaks, achievements, and reports.
          </p>
        </div>

        <div className="feature-box">
          <h2>🎯 Quiz Practice</h2>
          <p>
            Improve logical reasoning and aptitude through quizzes.
          </p>
        </div>

        <div className="feature-box">
          <h2>🚀 Career Growth</h2>
          <p>
            Build confidence with coding challenges and interview preparation.
          </p>
        </div>

        <div className="feature-box">
          <h2>🌐 Community</h2>
          <p>
            Connect with learners, share ideas, and grow together.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;