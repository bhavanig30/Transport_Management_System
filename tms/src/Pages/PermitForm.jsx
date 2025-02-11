import React, { useState, useEffect } from "react";
import "./PermitForm.css";

const PermitForm = () => {
  const [vehicleIds, setVehicleIds] = useState([]);
  const [formData, setFormData] = useState({
    permitId: "",
    vehicleId: "",
    permitType: "",
    permitNo: "",
    issueDate: "",
    expiryDate: "",
    permitStatus: "",
  });

  // Fetch vehicle IDs from API or database
  useEffect(() => {
    // Simulating API call (Replace this with actual API request)
    const fetchVehicleIds = async () => {
      const vehicles = ["V001", "V002", "V003"]; // Example vehicle IDs
      setVehicleIds(vehicles);
    };

    fetchVehicleIds();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Permit Data Submitted:", formData);
    alert("Permit Added Successfully!");
  };

  return (
    <div className="permit">
        <div className="permit-container">
        <h2>Permit Form</h2>
        <form onSubmit={handleSubmit}>
            <label>Permit ID:</label>
            <input type="text" name="permitId" value={formData.permitId} onChange={handleChange} required />

            <label>Vehicle ID:</label>
            <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
            <option value="">Select Vehicle</option>
            {vehicleIds.map((id) => (
                <option key={id} value={id}>{id}</option>
            ))}
            </select>

            <label>Permit Type:</label>
            <input type="text" name="permitType" value={formData.permitType} onChange={handleChange} required />

            <label>Permit No:</label>
            <input type="text" name="permitNo" value={formData.permitNo} onChange={handleChange} required />

            <label>Issue Date:</label>
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />

            <label>Expiry Date:</label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />

            <label>Permit Status:</label>
            <select name="permitStatus" value={formData.permitStatus} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
            </select>

            <button type="submit" className="permit-button">Add Permit</button>
        </form>
        </div>
    </div>
  );
};

export default PermitForm;
