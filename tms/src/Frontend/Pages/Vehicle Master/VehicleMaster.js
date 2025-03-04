import React from "react";
import { useNavigate } from "react-router-dom";
import "./VehicleMaster.css"; // Importing CSS

const VehicleMaster = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Directly navigate to the path
  };

  return (
    <div className="vehicle-master-container">
      <div className="vehicle-header">National Engineering College</div>

      <div className="vehicle-options-container">
        <h2 className="vehicle-title">Vehicle Master</h2>

        <div className="vehicle-options">
          <div className="vehicle-box" onClick={() => handleNavigation("/vehicle-master/view")}>View</div>
          <div className="vehicle-box" onClick={() => handleNavigation("/vehicle-master/add")}>Add</div>
          <div className="vehicle-box" onClick={() => handleNavigation("/vehicle-master/permit")}>Vehicle Permit Form</div>
          <div className="vehicle-box" onClick={() => handleNavigation("/vehicle-master/insurance")}>Insurance Details</div>
          <div className="vehicle-box" onClick={() => handleNavigation("/vehicle-master/fc")}>FC Details</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMaster;
