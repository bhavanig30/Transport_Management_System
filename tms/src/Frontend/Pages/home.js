import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBus, FaRoute, FaMoneyBill, FaUserTie, FaUsers, FaSignOutAlt } from "react-icons/fa";
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="home-header">
        <h1 className="home-header-title">National Engineering College</h1>
        <div className="live-clock">{time.toLocaleTimeString()}</div>
        <button className="logout-btn" onClick={() => navigate("/")}>
          <FaSignOutAlt className="logout-icon" />
        </button>
      </div>

      <div className="home-container">
        {/* Sidebar */}
        <div className="sidebar">
          <NavLink to="vehiclemaster"><FaBus /> Vehicle Master</NavLink>
          <NavLink to="addstage"><FaRoute /> Stage</NavLink>
          <NavLink to="addroute"><FaRoute /> Route</NavLink>
          <NavLink to="addcost"><FaMoneyBill /> Cost</NavLink>
          <NavLink to="adddriver"><FaUserTie /> Driver</NavLink>
          <NavLink to="addtraveller"><FaUsers /> Traveller</NavLink>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
