

import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sarathi-X</h1>
        <p>Welcome Back</p>

        <input
          type="email"
          placeholder="Enter Email"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;