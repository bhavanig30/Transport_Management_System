import React, { useState } from "react";
import "./VehiclePermitForm.css"; // Ensure the correct CSS file is used

const VehiclePermitForm = () => {
  const [formData, setFormData] = useState({
    permitId: "",
    vehicleId: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehicle Permit Form Submitted", formData);
  };

  return (
    <div className="vp-form-container">
      {/* Header with College Name */}
      <div className="vp-header">National Engineering College</div>

      {/* Form Card */}
      <form className="vp-form" onSubmit={handleSubmit}>
        <div className="vp-title">Vehicle Permit Details</div>

        <div className="vp-form-group">
          <label htmlFor="permitId">Permit ID</label>
          <input
            type="text"
            id="permitId"
            name="permitId"
            placeholder="Enter Permit ID"
            value={formData.permitId}
            onChange={handleChange}
          />
        </div>

        <div className="vp-form-group">
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

        <div className="vp-form-group">
          <label htmlFor="permitNo">Permit Number</label>
          <input
            type="text"
            id="permitNo"
            name="permitNo"
            placeholder="Enter Permit Number"
            value={formData.permitNo}
            onChange={handleChange}
          />
        </div>

        <div className="vp-form-group">
          <label htmlFor="issueDate">Issue Date</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
        </div>

        <div className="vp-form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="vp-form-group">
          <label htmlFor="permitType">Permit Type</label>
          <input
            type="text"
            id="permitType"
            name="permitType"
            placeholder="Enter Permit Type"
            value={formData.permitType}
            onChange={handleChange}
          />
        </div>

        <div className="vp-form-group">
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

        <button type="submit" className="vp-submit-button">
          Add Permit
        </button>
      </form>
    </div>
  );
};

export default VehiclePermitForm;