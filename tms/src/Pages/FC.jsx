import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="fc-form-container">
      {/* VSS Header */}
      <div className="vss-header">Vehicle Service System</div>

      {/* FC Form Header */}
      <div className="fc-header">National Engineering College</div>

      <header className="fc-header">National Engineering College</header>
      <form className="fc-form" onSubmit={handleSubmit}>
      <h2 className="fc-title">FC Details</h2>

        <div className="fc-form-group">
          <label htmlFor="fcId">FC ID</label>
          <input
            type="text"
            id="fcId"
            name="fcId"
            placeholder="Enter FC ID"
            value={formData.fcId}
            onChange={handleChange}
          />
        </div>

        <div className="fc-form-group">
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

        <div className="fc-form-group">
          <label htmlFor="fcNo">FC Number</label>
          <input
            type="text"
            id="fcNo"
            name="fcNo"
            placeholder="Enter FC Number"
            value={formData.fcNo}
            onChange={handleChange}
          />
        </div>

        <div className="fc-form-group">
          <label htmlFor="issueDate">Issue Date</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
        </div>

        <div className="fc-form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="fc-form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button type="submit" className="fc-submit-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default FCForm;