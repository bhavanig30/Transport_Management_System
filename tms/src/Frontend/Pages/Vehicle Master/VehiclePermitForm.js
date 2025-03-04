import React, { useState, useEffect } from "react";

const PermitForm = () => {
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
        setFormData({ permitId: "", vehicleId: "", permitNo: "", issueDate: "", expiryDate: "", status: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting permit details:", error);
      alert("Failed to add permit details.");
    }
  };

  return (
    <div>
      <h2>Permit Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Vehicle ID</label>
        <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
          <option value="">Select Vehicle</option>
          {vehicleIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        <label>Permit No</label>
        <input type="text" name="permitNo" value={formData.permitNo} onChange={handleChange} required />

        <label>Issue Date</label>
        <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />

        <label>Expiry Date</label>
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />

        <label>Status</label>
        <input type="text" name="status" value={formData.status} onChange={handleChange} required />

        <button type="submit">Add Permit</button>
      </form>
    </div>
  );
};

export default PermitForm;
