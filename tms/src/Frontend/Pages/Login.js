import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      {/* Header Section */}
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

      {/* Login Box */}
      <div className="login">
        <div className="login-box">
          <h1>Login</h1>

          <label>User Name</label>
          <input type="text" placeholder="Enter User Name" />
          
          <label>Password</label>
          <input type="password" placeholder="Enter Password" />

          {/* Stay Signed In Checkbox */}
          <div className="stay-signed-in">
            <input type="checkbox" id="staySignedIn" />
            <label htmlFor="staySignedIn">Stay signed in</label>
          </div>

          <button className="login-button">Login</button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a href="#">Forgot password / username</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;