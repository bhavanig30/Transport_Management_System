import React from "react";
import "./VehicleMaster.css"; // Importing the CSS file

const VehicleMaster = () => {
  const handleNavigation = (formName) => {
    alert(`Open ${formName} form`); // Replace this with actual form navigation logic
  };

  return (
    <div className="vehicle-master-container">
      {/* Updated Header */}
      <div className="vehicle-header">National Engineering College</div>

      {/* White Container with Buttons */}
      <div className="vehicle-options-container">
        <h2 className="vehicle-title">Vehicle Master</h2>

        <div className="vehicle-options">
          <div className="vehicle-box" onClick={() => handleNavigation("View")}>View</div>
          <div className="vehicle-box" onClick={() => handleNavigation("Add")}>Add</div>
          <div className="vehicle-box" onClick={() => handleNavigation("Vehicle Permit Form")}>Vehicle Permit Form</div>
          <div className="vehicle-box" onClick={() => handleNavigation("Insurance Details")}>Insurance Details</div>
          <div className="vehicle-box" onClick={() => handleNavigation("FC Details")}>FC Details</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMaster;
