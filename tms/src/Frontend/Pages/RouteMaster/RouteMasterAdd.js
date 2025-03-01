import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./RouteMasterAdd.css"; 

const RouteMasterForm = () => {
  const [formData, setFormData] = useState({
    routeId: "",
    routeName: "",
    totalStages: "",
    startingStage: "",
    endingStage: "",
  });

  const [routeNames, setRouteNames] = useState([]); // Store fetched route names

  // Fetch route names on component mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getRoutes");
        setRouteNames(response.data); // Store route names in state
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/addRoute", formData);
      alert(response.data.message);

      // Reset form fields
      setFormData({
        routeId: "",
        routeName: "",
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
          <label htmlFor="routeId">Route ID</label>
          <input
            type="text"
            id="routeId"
            name="routeId"
            placeholder="Enter Route ID"
            value={formData.routeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="routeName">Route Name</label>
          <select
            id="routeName"
            name="routeName"
            value={formData.routeName}
            onChange={handleChange}
            required
          >
            <option value="">Select Route Name</option>
            {routeNames.map((route, index) => (
              <option key={index} value={route.routeName}>
                {route.routeName}
              </option>
            ))}
          </select>
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
