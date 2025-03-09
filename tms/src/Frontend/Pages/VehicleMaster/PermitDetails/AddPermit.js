import React, { useState, useEffect } from "react";
import "../../../styles/AddPermit.css";

const AddPermit = () => {
  const [vehicleIds, setVehicleIds] = useState([]);
  const [formData, setFormData] = useState({
    permitId: "",
    vehicleId: "",
    permitNo: "",
    issueDate: "",
    expiryDate: "",
    status: "",
  });

  // Fetch vehicle IDs from the backend
  useEffect(() => {
    fetch("http://localhost:5000/getVehicleIds")
      .then((res) => res.json())
      .then((data) => setVehicleIds(data))
      .catch((err) => console.error("Error fetching vehicle IDs:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/addPermit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Permit details added successfully!");
        setFormData({
          permitId: "",
          vehicleId: "",
          permitNo: "",
          issueDate: "",
          expiryDate: "",
          status: "",
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting permit details:", error);
      alert("Failed to add permit details.");
    }
  };

  return (
    <div className="vp-form-container">
      <div className="vp-header">National Engineering College</div>
      <div className="vp-form">
        <h2 className="vp-title">Permit Details Form</h2>
        <form className="vp-form-grid" onSubmit={handleSubmit}>
          <div className="vp-form-group">
            <label>Vehicle ID</label>
            <select
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicleIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className="vp-form-group">
            <label>Permit No</label>
            <input
              type="text"
              name="permitNo"
              value={formData.permitNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="vp-form-group">
            <label>Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="vp-form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="vp-form-group">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </div>

          <button className="vp-submit-button" type="submit">
            Add Permit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPermit;
