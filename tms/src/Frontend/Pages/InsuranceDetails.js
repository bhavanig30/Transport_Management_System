import React, { useState } from "react";
import "./InsuranceDetails.css"; // Ensure the correct CSS file is used

const InsuranceForm = () => {
  const [formData, setFormData] = useState({
    policyId: "",
    vehicleId: "",
    policyNo: "",
    issueDate: "",
    expiryDate: "",
    provider: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Insurance Form Submitted", formData);
  };

  return (
    <div className="ins-form-container">
      {/* Header with College Name */}
      <div className="ins-header">National Engineering College</div>

      {/* Form Card */}
      <form className="ins-form" onSubmit={handleSubmit}>
        <div className="ins-title">Insurance Details</div>

        <div className="ins-form-group">
          <label htmlFor="policyId">Policy ID</label>
          <input
            type="text"
            id="policyId"
            name="policyId"
            placeholder="Enter Policy ID"
            value={formData.policyId}
            onChange={handleChange}
          />
        </div>

        <div className="ins-form-group">
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

        <div className="ins-form-group">
          <label htmlFor="policyNo">Policy Number</label>
          <input
            type="text"
            id="policyNo"
            name="policyNo"
            placeholder="Enter Policy Number"
            value={formData.policyNo}
            onChange={handleChange}
          />
        </div>

        <div className="ins-form-group">
          <label htmlFor="issueDate">Issue Date</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
        </div>

        <div className="ins-form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="ins-form-group">
          <label htmlFor="provider">Insurance Provider</label>
          <input
            type="text"
            id="provider"
            name="provider"
            placeholder="Enter Insurance Provider"
            value={formData.provider}
            onChange={handleChange}
          />
        </div>

        <div className="ins-form-group">
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

        <button type="submit" className="ins-submit-button">
          Add Insurance
        </button>
      </form>
    </div>
  );
};

export default InsuranceForm;
