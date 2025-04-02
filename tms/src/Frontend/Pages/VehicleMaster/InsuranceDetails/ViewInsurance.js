import React, { useState } from "react";
import "../../../styles/ViewInsurance.css"; // Ensure correct path

const ViewInsurance = () => {
  const insuranceData = [
    { vehicleId: "V001", policyNo: "POL001", companyName: "ABC Insurance", issueDate: "2023-01-01", expiryDate: "2024-01-01", premiumAmount: "5000" },
    { vehicleId: "V002", policyNo: "POL002", companyName: "XYZ Insurance", issueDate: "2022-06-01", expiryDate: "2023-06-01", premiumAmount: "4500" },
    { vehicleId: "V003", policyNo: "POL003", companyName: "PQR Insurance", issueDate: "2023-05-15", expiryDate: "2024-05-15", premiumAmount: "5200" },
    { vehicleId: "V004", policyNo: "POL004", companyName: "DEF Insurance", issueDate: "2021-09-20", expiryDate: "2022-09-20", premiumAmount: "4800" },
  ];

  const [vehicleId, setVehicleId] = useState("");
  const [filteredData, setFilteredData] = useState(insuranceData);

  const handleSearch = () => {
    setFilteredData(insuranceData.filter(item => vehicleId === "" || item.vehicleId === vehicleId));
  };

  return (
    <div className="view-insurance-container">
      <div className="view-insurance-box">
        <h2 className="view-insurance-title">INSURANCE DETAILS</h2>

        <div className="view-insurance-filter">
          <label>Vehicle ID</label>
          <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
            <option value="">Select Vehicle ID</option>
            {insuranceData.map((item, index) => (
              <option key={index} value={item.vehicleId}>{item.vehicleId}</option>
            ))}
          </select>
          <button className="view-insurance-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        <table className="view-insurance-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Policy No</th>
              <th>Company Name</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Premium Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.vehicleId}</td>
                  <td>{item.policyNo}</td>
                  <td>{item.companyName}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.premiumAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewInsurance;
