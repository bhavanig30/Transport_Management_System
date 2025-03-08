import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/AddFC.css"; // Ensure correct CSS file is used

const AddFC = () => {
  const [formData, setFormData] = useState({
    fcId: "",
    vehicleId: "",
    fcNo: "",
    issueDate: "",
    expiryDate: "",
    status: "",
  });

  const [vehicleIds, setVehicleIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleIds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getVehicleIds");
        setVehicleIds(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle IDs:", error);
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
      console.error("Error submitting FC details:", error);
      alert("Failed to add FC details. Please try again.");
    }
  };

  return (
    <div className="fc-form-container">
      <div className="fc-header">National Engineering College</div>

      <form className="fc-form" onSubmit={handleSubmit}>
        <div className="fc-title">FC Details Form</div>

        <div className="fc-form-group">
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

        <div className="fc-form-group">
          <label htmlFor="fcNo">FC No</label>
          <input type="text" id="fcNo" name="fcNo" value={formData.fcNo} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label htmlFor="issueDate">Issue Date</label>
          <input type="date" id="issueDate" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
        </div>

        <div className="fc-form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
        </div>

        {/* Status Dropdown */}
        <div className="fc-form-group">
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

        <button type="submit" className="fc-submit-button">Add FC</button>
      </form>
    </div>
  );
};

export default AddFC;
