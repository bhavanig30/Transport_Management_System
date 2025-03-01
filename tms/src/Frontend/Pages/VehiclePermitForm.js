import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./VehiclePermitForm.css";

const VehiclePermitForm = () => {
  const [formData, setFormData] = useState({
    permitId: "",
    vehicleId: "", // Foreign Key
    permitNo: "",
    issueDate: "",
    expiryDate: "",
    permitType: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/addPermit", formData);
      alert(response.data.message);
      setFormData({
        permitId: "",
        vehicleId: "",
        permitNo: "",
        issueDate: "",
        expiryDate: "",
        permitType: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding permit:", error);
      alert("Failed to add permit. Please try again.");
    }
  };

  return (
    <div className="vp-form-container">
      <header className="vp-header">National Engineering College</header>

      <form className="vp-form" onSubmit={handleSubmit}>
        <h2 className="vp-title">Vehicle Permit Details</h2>

        <div className="vp-form-group">
          <label>Permit ID</label>
          <input type="text" name="permitId" value={formData.permitId} onChange={handleChange} required />
        </div>

        <div className="vp-form-group">
          <label>Vehicle ID</label>
          <input type="text" name="vehicleId" value={formData.vehicleId} onChange={handleChange} required />
        </div>

        <div className="vp-form-group">
          <label>Permit Number</label>
          <input type="text" name="permitNo" value={formData.permitNo} onChange={handleChange} required />
        </div>

        <div className="vp-form-group">
          <label>Issue Date</label>
          <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
        </div>

        <div className="vp-form-group">
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
        </div>

        <div className="vp-form-group">
          <label>Permit Type</label>
          <input type="text" name="permitType" value={formData.permitType} onChange={handleChange} required />
        </div>

        <div className="vp-form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button type="submit" className="vp-submit-button">Add Permit</button>
      </form>
    </div>
  );
};

export default VehiclePermitForm;
