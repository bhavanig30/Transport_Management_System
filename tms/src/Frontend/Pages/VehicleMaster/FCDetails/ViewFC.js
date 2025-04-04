import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/ViewFC.css";

const ViewFC = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [fcDetails, setFcDetails] = useState([]); // Filtered Data
  const [allFcDetails, setAllFcDetails] = useState([]); // All Data
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFcDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getFC");
        console.log("FC API Response:", response.data);
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
        (vehicleId === "" || fc.vehicleid.toString() === vehicleId.trim()) &&
        (issueDate === "" || fc.issuedate.includes(issueDate))
      );
    });

    setFcDetails(filtered);
    console.log("Filtered FC Details:", filtered);

    // Reset fields if needed
    setVehicleId("");
    setIssueDate("");
  };

  return (
    <div className="view-fc-container">
      <div className="view-fc-box">
        <div className="view-fc-title-main">FC DETAILS</div>
        <div className="view-fc-title">View</div>

        <div className="view-fc-filter-container">
          {/* Vehicle ID Dropdown */}
          <div className="view-fc-filter-item">
            <label>Vehicle ID</label>
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              <option value="">All</option>
              {allFcDetails.map((fc) => (
                <option key={fc.vehicleid} value={fc.vehicleid}>
                  {fc.vehicleid}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Date Input */}
          <div className="view-fc-filter-item">
            <label>Issue Date</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          </div>

          <button className="view-fc-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        {/* Table to display results */}
        <table className="view-fc-table">
          <thead>
            <tr>
              <th>FC ID</th>
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
                  <td>{fc.fcid}</td>
                  <td>{fc.vehicleid}</td>
                  <td>{fc.fcno}</td>
                  <td>{fc.issuedate ? new Date(fc.issuedate).toLocaleDateString() : "N/A"}</td>
                  <td>{fc.expirydate ? new Date(fc.expirydate).toLocaleDateString() : "N/A"}</td>
                  <td>{fc.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFC;
