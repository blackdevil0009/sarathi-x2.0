import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard" id="dashboard">
      <div className="dashboard-top">
        <h1>Student Dashboard</h1>
        <p>
          Track your learning progress, coding practice, quiz performance,
          certificates, and AI learning journey in one place.
        </p>
      </div>

      <div className="dashboard-cards">

        <div className="dash-card">
          <h2>92%</h2>
          <p>Quiz Performance</p>
          <span>Excellent progress in weekly quizzes</span>
        </div>

        <div className="dash-card">
          <h2>5 Hrs</h2>
          <p>Study Hours</p>
          <span>Daily average learning time</span>
        </div>

        <div className="dash-card">
          <h2>8</h2>
          <p>Certificates</p>
          <span>Courses completed successfully</span>
        </div>

        <div className="dash-card">
          <h2>15</h2>
          <p>Coding Problems</p>
          <span>Problems solved in compiler section</span>
        </div>

      </div>

      <div className="dashboard-bottom">

        <div className="progress-box">
          <h3>Learning Progress</h3>

          <div className="progress-item">
            <p>Frontend Development</p>
            <div className="progress-bar">
              <div className="progress-fill frontend"></div>
            </div>
          </div>

          <div className="progress-item">
            <p>Java Programming</p>
            <div className="progress-bar">
              <div className="progress-fill java"></div>
            </div>
          </div>

          <div className="progress-item">
            <p>DSA Practice</p>
            <div className="progress-bar">
              <div className="progress-fill dsa"></div>
            </div>
          </div>
        </div>

        <div className="activity-box">
          <h3>Recent Activities</h3>

          <ul>
            <li>✅ Completed React Quiz</li>
            <li>✅ Solved Java Coding Problem</li>
            <li>✅ AI Assistant used for Notes</li>
            <li>✅ Earned Web Development Certificate</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;