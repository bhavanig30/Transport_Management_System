import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/AddInsurance.css";

const AddInsurance = () => {
  const initialFormData = {
    policyId: "",
    vehicleId: "",
    policyNo: "",
    issueDate: "",
    expiryDate: "",
    provider: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleIds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getVehicleIds");
        setVehicleIds(response.data);
      } catch (err) {
        console.error("Error fetching vehicle IDs:", err);
        setError("Failed to load vehicle IDs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleIds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.issueDate) >= new Date(formData.expiryDate)) {
      alert("Expiry date must be later than the issue date.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addInsurance", formData);
      alert(response.data.message);
      setFormData(initialFormData);
    } catch (err) {
      console.error("Error submitting insurance details:", err);
      alert("Failed to add insurance details. Please try again.");
    }
  };

  return (
    <div className="ins-form-container">
      <div className="ins-header">National Engineering College</div>

      <form className="ins-form" onSubmit={handleSubmit}>
        <div className="ins-title">Insurance Details Form</div>

        {error && <p className="error-message">{error}</p>}

        <div className="ins-form-group">
          <label htmlFor="vehicleId">Vehicle ID</label>
          <select
            id="vehicleId"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Vehicle</option>
            {loading ? (
              <option disabled>Loading vehicle IDs...</option>
            ) : (
              vehicleIds.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))
            )}
          </select>
        </div>

        <div className="ins-form-group">
          <label htmlFor="policyNo">Policy No</label>
          <input
            type="text"
            id="policyNo"
            name="policyNo"
            value={formData.policyNo}
            onChange={handleChange}
            required
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
            required
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
            required
          />
        </div>

        <div className="ins-form-group">
          <label htmlFor="provider">Insurance Provider</label>
          <input
            type="text"
            id="provider"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ins-form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button type="submit" className="ins-submit-button">Add Insurance</button>
      </form>
    </div>
  );
};

export default AddInsurance;
