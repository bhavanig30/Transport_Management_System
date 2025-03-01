import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./FC.css";

const FCForm = () => {
  const [formData, setFormData] = useState({
    fcId: "",
    vehicleId: "",
    fcNo: "",
    issueDate: "",
    expiryDate: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/addFC", formData);
      alert(response.data.message);
      setFormData({
        fcId: "",
        vehicleId: "",
        fcNo: "",
        issueDate: "",
        expiryDate: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding FC details:", error);
      alert("Failed to add FC details. Please try again.");
    }
  };

  return (
    <div className="fc-form-container">
      <header className="fc-header">National Engineering College</header>

      <form className="fc-form" onSubmit={handleSubmit}>
        <h2 className="fc-title">FC Details</h2>

        <div className="fc-form-group">
          <label>FC ID</label>
          <input type="text" name="fcId" value={formData.fcId} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label>Vehicle ID</label>
          <input type="text" name="vehicleId" value={formData.vehicleId} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label>FC Number</label>
          <input type="text" name="fcNo" value={formData.fcNo} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label>Issue Date</label>
          <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button type="submit" className="fc-submit-button">Add FC</button>
      </form>
    </div>
  );
};

export default FCForm;
