import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { FaBars, FaUserCircle, FaHome, FaListUl } from 'react-icons/fa'; // Importing icons

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsSidebarOpen(false);
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Header */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2>National Engineering College</h2>
          <p>Transport Management System</p>
        </div>

        <div className="navbar-right">
          <FaHome className="icon" title="Home" />
          <FaListUl className="icon" title="Count" />
          <div className="profile-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            A
          </div>
        </div>
      </nav>

      {/* Cards Section */}
      <div className="cards-container">
        {[
          'Vehicle Details', 'Route Information', 'Driver Records',
          'Cost Analysis', 'Driver Allotment', 'Vehicle Scheduling',
          'Tracking System', 'Maintenance Logs', 'Fuel Consumption Report',
          'Vehicle Status Overview', 'Driver Performance', 'Student Transport Details'
        ].map((title, index) => (
          <div key={index} className={`card ${index % 2 === 0 ? 'odd-card' : 'even-card'}`}>
            <h3>{title}</h3>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button onClick={() => setIsSidebarOpen(false)} className="close-btn">✖</button>
        <h3>Account</h3>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

     
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Home;
