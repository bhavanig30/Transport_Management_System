import React, { useState } from "react";
import "./RouteMaster.css"; // Ensure the correct CSS file is used

const RouteMasterForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    routeNumber: "",
    totalStages: "",
    startingStage: "",
    endingStage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Route Form Submitted", formData);
  };

  return (
    <div className="route-form-container">
      <div className="route-header">National Engineering College</div>

      <form className="route-form" onSubmit={handleSubmit}>
        <div className="route-title">Route Master Form</div>

        <div className="route-form-group">
          <label htmlFor="vehicleId">Vehicle ID</label>
          <input
            type="text"
            id="vehicleId"
            name="vehicleId"
            placeholder="Enter Vehicle ID"
            value={formData.vehicleId}
            onChange={handleChange}
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="routeNumber">Route Number</label>
          <input
            type="text"
            id="routeNumber"
            name="routeNumber"
            placeholder="Enter Route Number"
            value={formData.routeNumber}
            onChange={handleChange}
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="totalStages">Total No. of Stages</label>
          <input
            type="number"
            id="totalStages"
            name="totalStages"
            placeholder="Enter Total Stages"
            value={formData.totalStages}
            onChange={handleChange}
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="startingStage">Starting Stage</label>
          <input
            type="text"
            id="startingStage"
            name="startingStage"
            placeholder="Enter Starting Stage"
            value={formData.startingStage}
            onChange={handleChange}
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="endingStage">Ending Stage</label>
          <input
            type="text"
            id="endingStage"
            name="endingStage"
            placeholder="Enter Ending Stage"
            value={formData.endingStage}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="route-submit-button">
          Add Route
        </button>
      </form>
    </div>
  );
};

export default RouteMasterForm;