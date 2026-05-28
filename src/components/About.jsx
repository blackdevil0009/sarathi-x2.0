import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="about-top">
          <p className="about-tag">WELCOME TO SARTHI-X</p>

          <h1>
            Learn Smarter <span>With AI</span>
          </h1>

          <p className="about-desc">
            Sarthi-X is an AI powered learning platform for students.
            Practice coding, improve aptitude, solve quizzes, track
            progress, and learn with personalized AI guidance.
          </p>
        </div>

        <div className="about-cards">

          <div className="about-card">
            <div className="icon">🤖</div>
            <h2>AI Mentor</h2>
            <p>
              Get instant AI guidance, coding help, and smart learning support.
            </p>
          </div>

          <div className="about-card">
            <div className="icon">📚</div>
            <h2>Interactive Learning</h2>
            <p>
              Practice coding, quizzes, and aptitude with real-time feedback.
            </p>
          </div>

          <div className="about-card">
            <div className="icon">📈</div>
            <h2>Track Growth</h2>
            <p>
              Monitor your learning journey with dashboards and analytics.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;