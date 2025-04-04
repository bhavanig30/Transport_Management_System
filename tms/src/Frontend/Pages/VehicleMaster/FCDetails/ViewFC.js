import "../../../styles/ViewFC.css"; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/ViewFC.css";

const ViewFC = () => {
  const navigate = useNavigate();
  const [vehicleId, setVehicleId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [fcDetails, setFcDetails] = useState([]);
  const [allFcDetails, setAllFcDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFcDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getFC");
        console.log("API Response:", response.data);
        setFcDetails(response.data);
        setAllFcDetails(response.data);
      } catch (error) {
        console.error("Error fetching FC details:", error);
        setError("Failed to fetch FC details. Please try again.");
      }
    };
    fetchFcDetails();
  }, []);

  const handleSearch = () => {
    const filtered = allFcDetails.filter((fc) => {
      return (
        (vehicleId === "" || fc.vehicleId.includes(vehicleId)) &&
        (issueDate === "" || fc.issueDate.includes(issueDate))
      );
    });
    setFcDetails(filtered);
  };

  return (
    <div className="view-fc-container">
      <div className="view-fc-box">
        <div className="view-fc-title-main">View FC Details</div>

        <div className="view-fc-filter-container">
          <div className="view-fc-filter-item">
            <label>Vehicle ID</label>
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              <option value="">All</option>
              {allFcDetails.map((fc) => (
                <option key={fc.vehicleId} value={fc.vehicleId}>
                  {fc.vehicleId}
                </option>
              ))}
            </select>
          </div>

          <div className="view-fc-filter-item">
            <label>Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>

          <button className="view-fc-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <div className="view-fc-table">
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>FC No</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fcDetails.length > 0 ? (
                fcDetails.map((fc, index) => (
                  <tr key={index}>
                    <td>{fc.vehicleId}</td>
                    <td>{fc.fcNo}</td>
                    <td>{fc.issueDate}</td>
                    <td>{fc.expiryDate}</td>
                    <td>{fc.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No FC records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFC;
