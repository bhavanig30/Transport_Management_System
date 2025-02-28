import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RouteMasterAdd.css"; // Ensure correct CSS file is used

const RouteMasterForm = () => {
  const [formData, setFormData] = useState({
    routeId: "",
    routeName: "",
    totalStages: "",
    startingStage: "",
    endingStage: "",
  });

  const [stages, setStages] = useState([]); // Store stage data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch stage data when component mounts
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getStage");
        setStages(response.data); // Assuming response.data is an array of stage objects
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stages:", error);
        setLoading(false);
      }
    };

    fetchStages();
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

      // Reset form fields after successful submission
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
          <label htmlFor="routeName">Route Name</label>
          <input
            type="text"
            id="routeName"
            name="routeName"
            placeholder="Enter Route Name"
            value={formData.routeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="route-form-group">
          <label htmlFor="totalStages">Total Stages</label>
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

        {/* Starting Stage Dropdown */}
        <div className="route-form-group">
          <label htmlFor="startingStage">Starting Stage</label>
          <select
            id="startingStage"
            name="startingStage"
            value={formData.startingStage}
            onChange={handleChange}
            required
          >
            <option value="">Select Starting Stage</option>
            {loading ? (
              <option disabled>Loading stages...</option>
            ) : (
              stages.map((stage) => (
                <option key={stage.stageId} value={stage.stageId}>
                  {stage.stageName}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Ending Stage Dropdown */}
        <div className="route-form-group">
          <label htmlFor="endingStage">Ending Stage</label>
          <select
            id="endingStage"
            name="endingStage"
            value={formData.endingStage}
            onChange={handleChange}
            required
          >
            <option value="">Select Ending Stage</option>
            {loading ? (
              <option disabled>Loading stages...</option>
            ) : (
              stages.map((stage) => (
                <option key={stage.stageId} value={stage.stageId}>
                  {stage.stageName}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit" className="route-submit-button">
          Add Route
        </button>
      </form>
    </div>
  );
};

export default RouteMasterForm;
