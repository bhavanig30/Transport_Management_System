import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AddCost.css"; // Ensure correct CSS file is used

const AddCost = () => {
  const [formData, setFormData] = useState({
    routeId: "",
    stageId: "",
    cost: "",
  });

  const [routes, setRoutes] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutesAndStages = async () => {
      try {
        const routeResponse = await axios.get("http://localhost:5000/getRoutes");
        const stageResponse = await axios.get("http://localhost:5000/getStage");
        setRoutes(routeResponse.data);
        setStages(stageResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchRoutesAndStages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/addCost", formData);
      alert(response.data.message);
      setFormData({ routeId: "", stageId: "", cost: "" });
    } catch (error) {
      console.error("Error adding cost:", error);
      alert("Failed to add cost. Please try again.");
    }
  };

  return (
    <div className="cost-form-container">
      <div className="cost-header">National Engineering College</div>

      <form className="cost-form" onSubmit={handleSubmit}>
        <div className="cost-title">Cost Master Form</div>

        <div className="cost-form-group">
          <label htmlFor="routeId">Route</label>
          <select id="routeId" name="routeId" value={formData.routeId} onChange={handleChange} required>
            <option value="">Select Route</option>
            {loading ? (
              <option disabled>Loading routes...</option>
            ) : (
              routes.map((route) => (
                <option key={route.routeId} value={route.routeId}>{route.routeName}</option>
              ))
            )}
          </select>
        </div>

        <div className="cost-form-group">
          <label htmlFor="stageId">Stage</label>
          <select id="stageId" name="stageId" value={formData.stageId} onChange={handleChange} required>
            <option value="">Select Stage</option>
            {loading ? (
              <option disabled>Loading stages...</option>
            ) : (
              stages.map((stage) => (
                <option key={stage.stageId} value={stage.stageId}>{stage.stageName}</option>
              ))
            )}
          </select>
        </div>

        <div className="cost-form-group">
          <label htmlFor="cost">Cost</label>
          <input type="number" id="cost" name="cost" placeholder="Enter Cost" value={formData.cost} onChange={handleChange} required />
        </div>

        <button type="submit" className="cost-submit-button">Add Cost</button>
      </form>
    </div>
  );
};

export default AddCost;
