import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1>
          Smart Learning <span>With AI</span>
        </h1>

        <p>
          Sarathi-X helps students learn coding, solve quizzes,
          practice interview questions and grow skills with AI.
        </p>

        <div className="hero-buttons">
          <a href="#dashboard">
            <button>Start Journey</button>
          </a>

          <a href="#features">
            <button className="outline">Explore</button>
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="glass-card">
          <h2>AI Powered Dashboard</h2>
          <p>Track progress, solve coding problems and learn faster.</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;