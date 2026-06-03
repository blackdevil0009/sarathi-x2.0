import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Welcome to Sarthi-X Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>Quiz Section</h2>
          <p>Test your knowledge with interactive quizzes.</p>
          <button>Open Quiz</button>
        </div>

        <div className="card">
          <h2>Compiler</h2>
          <p>Write and run code easily.</p>
          <button onClick={() => navigate("/compiler")}>
            Open Compiler
          </button>
        </div>

        <div className="card">
          <h2>AI Assistant</h2>
          <p>Get AI help for learning and coding.</p>
          <button onClick={() => navigate("/ai")}>
            Explore AI
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;