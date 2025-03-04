import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <>
      <div className="home-header">
        <h1 className="home-title">National Engineering College</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="home-grid">
        <div className="home-box" onClick={() => handleNavigation("/vehicle-master")}>Vehicle Master</div>
        <div className="home-box" onClick={() => handleNavigation("/stage-master")}>Stage Master</div>
        <div className="home-box" onClick={() => handleNavigation("/route-master")}>Route Master</div>
        <div className="home-box" onClick={() => handleNavigation("/cost-master")}>Cost Master</div>
        <div className="home-box" onClick={() => handleNavigation("/driver-allotment")}>Driver Allotment</div>
        <div className="home-box" onClick={() => handleNavigation("/traveller-allotment")}>Traveller Allotment</div>
      </div>
    </>
  );
};

export default Home;
