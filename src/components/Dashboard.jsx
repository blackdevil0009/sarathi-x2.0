import { Link } from "react-router-dom";
import React from "react";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Sarathi-X</h2>

        <ul>
  <li><Link to="/dashboard">🏠 Dashboard</Link></li>

  <li><Link to="/ai">🤖 AI Assistant</Link></li>

  <li><Link to="/compiler">💻 Compiler</Link></li>

  <li><Link to="/quiz">📝 Quiz</Link></li>

  <li>📚 Courses</li>
  <li>🏆 Leaderboard</li>
  <li>⚙️ Settings</li>
</ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="header">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
          />

          <div className="profile">
            🔔
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
            />
          </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome">
          <h1>Welcome Back 👋</h1>
          <p>Continue your learning journey with Sarathi-X</p>
        </div>

        {/* Stats Cards */}
        <div className="stats">
          <div className="card">
            <h3>Problems Solved</h3>
            <p>120</p>
          </div>

          <div className="card">
            <h3>Quiz Score</h3>
            <p>85%</p>
          </div>

          <div className="card">
            <h3>Streak</h3>
            <p>15 Days</p>
          </div>

          <div className="card">
            <h3>AI Queries</h3>
            <p>450</p>
          </div>
        </div>

<div className="graph-card">
  <h2>Coding Progress</h2>

</div>

      </div>

    </div>
  );
};

export default Dashboard;