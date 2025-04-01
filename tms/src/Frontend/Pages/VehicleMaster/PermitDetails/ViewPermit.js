import React, { useState } from "react";
import "../../../styles/ViewPermit.css"; // Corrected path based on your folder structure

const ViewPermit = () => {
  // Sample Data for Display
  const permitData = [
    { vehicleId: "V001", permitNo: "P001", permitType: "State", issueDate: "2023-01-01", expiryDate: "2024-01-01", status: "Active" },
    { vehicleId: "V002", permitNo: "P002", permitType: "District", issueDate: "2022-06-01", expiryDate: "2023-06-01", status: "Expired" },
    { vehicleId: "V003", permitNo: "P003", permitType: "State", issueDate: "2023-05-15", expiryDate: "2024-05-15", status: "Active" },
    { vehicleId: "V004", permitNo: "P004", permitType: "District", issueDate: "2021-09-20", expiryDate: "2022-09-20", status: "Expired" },
  ];

  const [vehicleId, setVehicleId] = useState("");
  const [filteredData, setFilteredData] = useState(permitData);

  const handleSearch = () => {
    const result = permitData.filter(item =>
      (vehicleId === "" || item.vehicleId.toLowerCase().includes(vehicleId.toLowerCase()))
    );
    setFilteredData(result);
  };

  return (
    <div className="view-permit-container">
      <div className="view-permit-box-wrapper">
        <div className="view-permit-main-title">PERMIT DETAILS</div>
        <div className="view-permit-title">View</div>

        <div className="view-permit-filter-container">
          <div className="view-permit-filter-item">
            <label>Vehicle ID</label>
            <div className="view-permit-dropdown-container">
              <input 
                type="text" 
                value={vehicleId} 
                onChange={(e) => setVehicleId(e.target.value)} 
                placeholder="Enter Vehicle ID" 
              />
              <select 
                value={vehicleId} 
                onChange={(e) => setVehicleId(e.target.value)} 
                className="vehicle-id-dropdown"
              >
                <option value="">Select Vehicle ID</option>
                {permitData.map((permit, index) => (
                  <option key={index} value={permit.vehicleId}>{permit.vehicleId}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="view-permit-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        <table className="view-permit-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Permit No</th>
              <th>Permit Type</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((permit, index) => (
                <tr key={index}>
                  <td>{permit.vehicleId}</td>
                  <td>{permit.permitNo}</td>
                  <td>{permit.permitType}</td>
                  <td>{permit.issueDate}</td>
                  <td>{permit.expiryDate}</td>
                  <td>{permit.status}</td>
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

export default ViewPermit;
