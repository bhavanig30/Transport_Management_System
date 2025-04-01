import React, { useState, useEffect } from "react";
import "../../../styles/ViewFC.css"; // Corrected path based on your folder structure

const ViewFC = () => {
  const [vehicleIdInput, setVehicleIdInput] = useState("");
  const [issueDateInput, setIssueDateInput] = useState("");
  const [filteredFcDetails, setFilteredFcDetails] = useState([]);

  // Example static data (replace with API call if needed)
  const fcDetails = [
    {
      vehicleId: "V12345",
      fcNo: "FC5678",
      issueDate: "2023-01-10",
      expiryDate: "2024-01-10",
      status: "Valid"
    },
    {
      vehicleId: "V67890",
      fcNo: "FC1234",
      issueDate: "2022-05-12",
      expiryDate: "2023-05-12",
      status: "Expired"
    },
    {
      vehicleId: "V13579",
      fcNo: "FC2468",
      issueDate: "2023-03-15",
      expiryDate: "2024-03-15",
      status: "Valid"
    }
  ];

  useEffect(() => {
    // Filter FC details based on the vehicle ID and issue date
    const filteredDetails = fcDetails.filter(item => {
      const matchesVehicleId = vehicleIdInput
        ? item.vehicleId.includes(vehicleIdInput)
        : true;
      const matchesIssueDate = issueDateInput
        ? item.issueDate.includes(issueDateInput)
        : true;
      return matchesVehicleId && matchesIssueDate;
    });
    setFilteredFcDetails(filteredDetails);
  }, [vehicleIdInput, issueDateInput]);

  const handleSearch = () => {
    // Triggering the useEffect hook by manually updating the input values
    setVehicleIdInput(vehicleIdInput);
    setIssueDateInput(issueDateInput);
  };

  return (
    <div className="view-fc-container">
      <div className="view-fc-box">
        <div className="view-fc-title-main">View FC Details</div>

        {/* Filters */}
        <div className="view-fc-filter-container">
          <div className="view-fc-filter-item">
            <label>Vehicle ID</label>
            <input
              type="text"
              value={vehicleIdInput}
              onChange={(e) => setVehicleIdInput(e.target.value)}
              placeholder="Enter Vehicle ID"
            />
          </div>

          <div className="view-fc-filter-item">
            <label>Issue Date</label>
            <input
              type="date"
              value={issueDateInput}
              onChange={(e) => setIssueDateInput(e.target.value)}
              placeholder="Select Issue Date"
            />
          </div>
        </div>

        <button
          className="view-fc-search-button"
          onClick={handleSearch}
        >
          SEARCH
        </button>

        {/* Display the filtered results */}
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
              {filteredFcDetails.length > 0 ? (
                filteredFcDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.vehicleId}</td>
                    <td>{detail.fcNo}</td>
                    <td>{detail.issueDate}</td>
                    <td>{detail.expiryDate}</td>
                    <td>{detail.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No records found</td>
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
