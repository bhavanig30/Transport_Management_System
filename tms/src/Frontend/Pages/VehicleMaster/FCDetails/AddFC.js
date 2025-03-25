import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../../styles/AddFC.css";

const AddFC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({
    vehicleId: "",
    fcNo: "",
    issueDate: "",
    expiryDate: "",
    status: "",
  });

  const [vehicleIds, setVehicleIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleIds = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getVehicle");
            const vehicleIds = response.data.map(vehicle => vehicle.vehicleid); // Extract only vehicleId
            setVehicleIds(vehicleIds);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching vehicle IDs:", error);
            setError("Failed to fetch vehicle IDs. Please try again.");
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

    // Date Validation
    if (new Date(formData.issueDate) >= new Date(formData.expiryDate)) {
      setError("Expiry date must be after the issue date.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addFC", formData);
      alert(response.data.message);
      setFormData({
        vehicleId: "",
        fcNo: "",
        issueDate: "",
        expiryDate: "",
        status: "",
      });
      setError("");
    } catch (error) {
      console.error("Error submitting FC details:", error);
      setError("Failed to add FC details. Please try again.");
    }
  };

  return (
    <>
      <div className="fc-header">
        <h1 className="fc-header-title">National Engineering College</h1>
        <button className="logout-btn" onClick={() => handleNavigation("/")}>Logout</button>
      </div>
      <div className="fc-form-container">
        <form className="fc-form" onSubmit={handleSubmit}>
          <div className="fc-title">FC Details Form</div>
          <div className="fc-form-group">
              <label>Vehicle Id</label>
                  <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
                      <option value="">Select vehicleId</option>
                          {vehicleIds.map((route, index) => (
                             <option key={index} value={route}>{route}</option>
                            ))}
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
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

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

          <button
            type="submit"
            className="fc-submit-button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add FC"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFC;
