import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/ViewDriver.css";

const ViewDriver = () => {
  const [staffCode, setStaffCode] = useState("");
  const [staffName, setStaffName] = useState("");

  // Sample Data for Display
  const driverData = [
    { staffCode: "S001", staffName: "John Doe", vehicleId: "V001", city: "City A", mobile: "1234567890" },
    { staffCode: "S002", staffName: "Jane Smith", vehicleId: "V002", city: "City B", mobile: "0987654321" },
    { staffCode: "S003", staffName: "Mike Johnson", vehicleId: "V003", city: "City C", mobile: "1122334455" },
  ];

  const [filteredData, setFilteredData] = useState(driverData);

  // Extract unique staff codes and names for dropdown options
  const staffCodes = Array.from(new Set(driverData.map(driver => driver.staffCode)));
  const staffNames = Array.from(new Set(driverData.map(driver => driver.staffName)));

  // Filter Data Based on Input
  const handleSearch = () => {
    const result = driverData.filter(driver =>
      (staffCode === "" || driver.staffCode === staffCode) &&
      (staffName === "" || driver.staffName.toLowerCase().includes(staffName.toLowerCase()))
    );
    setFilteredData(result);
  };

  return (
    <>
      <div className="view-driver-container">
        <div className="view-driver-box-wrapper">
          <div className="view-driver-main-title">DRIVER ALLOTMENT</div>
          <div className="view-driver-title">View</div>

          <div className="view-filter-container">
            <div className="view-filter-item">
              <label>Staff Code</label>
              <select value={staffCode} onChange={(e) => setStaffCode(e.target.value)}>
                <option value="">All</option>
                {staffCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="view-filter-item">
              <label>Staff Name</label>
              <select value={staffName} onChange={(e) => setStaffName(e.target.value)}>
                <option value="">All</option>
                {staffNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <button className="view-search-button" onClick={handleSearch}>SEARCH</button>
          </div>

          <table className="view-driver-table">
            <thead>
              <tr>
                <th>Staff Code</th>
                <th>Staff Name</th>
                <th>Vehicle ID</th>
                <th>City</th>
                <th>Mobile No</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((driver, index) => (
                  <tr key={index}>
                    <td>{driver.staffCode}</td>
                    <td>{driver.staffName}</td>
                    <td>{driver.vehicleId}</td>
                    <td>{driver.city}</td>
                    <td>{driver.mobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewDriver;
