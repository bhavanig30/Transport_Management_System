import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./RouteMasterAdd.css"; // Ensure the correct CSS file is used

const RouteMasterForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    routeId: "",
    totalStages: "",
    startingStage: "",
    endingStage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/addRoute", formData);
      alert(response.data.message);

      // Reset form fields after successful submission
      setFormData({
        vehicleId: "",
        routeId: "",
        totalStages: "",
        startingStage: "",
        endingStage: "",
      });
    } catch (error) {
      console.error("Error adding route:", error);
      alert("Failed to add route. Please try again.");
    }
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
            required
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="routeId">RouteId</label>
          <input
            type="text"
            id="routeId"
            name="routeId"
            placeholder="Enter Route Number"
            value={formData.routeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="totalStages">TotalStages</label>
          <input
            type="number"
            id="totalStages"
            name="totalStages"
            placeholder="Enter Total Stages"
            value={formData.totalStages}
            onChange={handleChange}
            required
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
            required
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
            required
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
