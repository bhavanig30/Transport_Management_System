import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBus, FaRoute, FaMoneyBill, FaUserTie, FaUsers, FaSignOutAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show blog cards only on the home page
  const isHomePage = location.pathname === "/home";

  return (
    <>
      <div className="home-header">
        <h1 className="home-header-title">National Engineering College</h1>
        <div className="live-clock">{time.toLocaleTimeString()}</div>
        <button className="logout-btn" onClick={() => navigate("/")}>
          <FaSignOutAlt className="logout-icon"/>
        </button>
      </div>

      <div className="home-container">
        {/* Sidebar */}
        <div className="sidebar">
          <NavLink to="/home/vehiclemaster"><FaBus /> Vehicle Master</NavLink>
          <NavLink to="/home/addstage"><FaMapMarkerAlt /> Stage</NavLink>
          <NavLink to="/home/addroute"><FaRoute /> Route</NavLink>
          <NavLink to="/home/addcost"><FaMoneyBill /> Cost</NavLink>
          <NavLink to="/home/adddriver"><FaUserTie /> Driver</NavLink>
          <NavLink to="/home/addtraveller"><FaUsers /> Traveller</NavLink>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {isHomePage ? (
            <div className="blog-container">
              <div className="blog-card">
                <FaBus className="blog-icon" />
                <h3>Total Buses</h3>
                <p>25</p>
              </div>

              <div className="blog-card">
                <FaRoute className="blog-icon" />
                <h3>Total Routes</h3>
                <p>10</p>
              </div>

              <div className="blog-card">
                <FaUsers className="blog-icon" />
                <h3>Students Traveling</h3>
                <p>500</p>
              </div>

              <div className="blog-card">
                <FaUserTie className="blog-icon" />
                <h3>Total Drivers</h3>
                <p>15</p>
              </div>

              <div className="blog-card">
                <FaMapMarkerAlt className="blog-icon" />
                <h3>Total Stages</h3>
                <p>20</p>
              </div>
            </div>
          ) : (
            <div className="form-container">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;