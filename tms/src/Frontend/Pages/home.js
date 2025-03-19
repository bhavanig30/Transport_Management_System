import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-header">
        <h1 className="home-header-title">National Engineering College</h1>
        <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
      </div>

      <div className="home-container">
        <div className="sidebar">
          <NavLink to="vehiclemaster" className={({ isActive }) => isActive ? "active" : ""}>Vehicle Master</NavLink>
          <NavLink to="addstage" className={({ isActive }) => isActive ? "active" : ""}>Stage</NavLink>
          <NavLink to="addroute" className={({ isActive }) => isActive ? "active" : ""}>Route</NavLink>
          <NavLink to="addcost" className={({ isActive }) => isActive ? "active" : ""}>Cost</NavLink>
          <NavLink to="adddriver" className={({ isActive }) => isActive ? "active" : ""}>Driver</NavLink>
          <NavLink to="addtraveller" className={({ isActive }) => isActive ? "active" : ""}>Traveller</NavLink>
        </div>

        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
