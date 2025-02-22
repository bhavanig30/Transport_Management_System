import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful!");
        window.location.href = "/Home"; // Redirect to home page
      } else {
        alert("Invalid Username or Password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src="/Images/Logo.png" alt="Left Logo" className="logo left-logo" />
        <div className="header-content">
          <h1>National Engineering College</h1>
          <p>
            (An Autonomous Institution Affiliated to Anna University Chennai)
            <br />
            K.R. Nagar, Kovilpatti - 628503, Thoothukudi Dist. Tamilnadu
            <br />
            Phone: 04632 - 222502, 230227 | Email: principal@nec.edu.in | Web: www.nec.edu.in
          </p>
        </div>
        <img src="/Images/Founder.jpg" alt="Right Logo" className="logo right-logo" />
      </div>

      <div className="login">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="stay-signed-in">
              <input type="checkbox" id="staySignedIn" />
              <label htmlFor="staySignedIn">Stay signed in</label>
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="forgot-password">
            <a href="#">Forgot password / username</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
