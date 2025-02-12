import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        { }
        <div className="header-content">
          <img src="/Images/NEC_LOGO.png" alt="NEC Logo" className="logo" />
          <h1>National Engineering College</h1>
          
        </div>

        <h2>Login</h2>

        <label>User Name</label>
        <input type="text" placeholder="Enter User Name" />

        <label>Password</label>
        <input type="password" placeholder="Enter Password" />

        <button className="login-button">Sign In</button>
        <div className="forgot-password">Forgot Password / UserName?</div>
      </div>
    </div>
  );
};

export default Login;
