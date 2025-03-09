import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="home-header">
        <h1 className="home-title">National Engineering College</h1>
        <button className="logout-btn" onClick={() => handleNavigation("/")}>Logout</button>
      </div>
      
      <div className="home-grid">
        <div className="home-box" onClick={() => handleNavigation("/home/vehiclemaster")}>Vehicle Master</div>
        <div className="home-box" onClick={() => handleNavigation("/home/stagemaster/addstage")}>Stage Master</div>
        <div className="home-box" onClick={() => handleNavigation("/home/routemaster/addroute")}>Route Master</div>
        <div className="home-box" onClick={() => handleNavigation("/home/costmaster/addcost")}>Cost Master</div>
        <div className="home-box" onClick={() => handleNavigation("/home/driverallotment/adddriver")}>Driver Allotment</div>
        <div className="home-box" onClick={() => handleNavigation("/home/travellerallotment/addtraveller")}>Traveller Allotment</div>
      </div>
    </>
  );
};

export default Home;