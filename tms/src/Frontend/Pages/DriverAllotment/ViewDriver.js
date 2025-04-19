import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ViewDriver.css";
import { exportToExcel } from "../ReportGenerator"

const ViewDriver = () => {
  const navigate = useNavigate();
  const [staffCode, setStaffCode] = useState("");
  const [staffName, setStaffName] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getdrivers");
            console.log("API Response:", response.data);

            setDrivers(response.data);  // Directly store drivers with images
            setAllDrivers(response.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
            setError("Failed to fetch drivers. Please try again.");
        }
    };

    fetchDrivers();
}, []);

  

  const handleSearch = () => {
    const filtered = allDrivers.filter((driver) => {
      return (
        (staffCode === "" || driver.staffcode === staffCode) &&
        (staffName === "" || driver.staffname.toLowerCase().includes(staffName.toLowerCase()))
      );
    });

    setDrivers(filtered);
    console.log("Filtered Drivers:", filtered);

    setStaffCode("");
    setStaffName("");
  };

  return (
    <div className="view-driver-container">
      <div className="view-driver-box-wrapper">
        <div className="view-driver-main-title">DRIVER ALLOTMENT</div>
        <div className="view-driver-title">View</div>

        <div className="view-filter-container">
          <div className="view-filter-item">
            <label>Staff Code</label>
            <select value={staffCode} onChange={(e) => setStaffCode(e.target.value)}>
              <option value="">All</option>
              {allDrivers.map((driver) => (
                <option key={driver.staffcode} value={driver.staffcode}>
                  {driver.staffcode}
                </option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Staff Name</label>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="Enter Staff Name"
            />
          </div>

          <button className="view-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <button
            className="report-button"
            onClick={() => exportToExcel(drivers, "Driver_Report")}
          >
            Generate Report
          </button>
        </div>

        <table className="view-driver-table">
          <thead>
            <tr>
              <th>Staff Code</th>
              <th>Staff Name</th>
              <th>Vehicle ID</th>
              <th>Door No</th>
              <th>Street Name</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Mobile No</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length > 0 ? (
              drivers.map((driver, index) => (
                <tr key={index}>
                  <td>{driver.staffcode}</td>
                  <td>{driver.staffname}</td>
                  <td>{driver.vehicleid}</td>
                  <td>{driver.doorno}</td>
                  <td>{driver.streetname}</td>
                  <td>{driver.city}</td>
                  <td>{driver.state}</td>
                  <td>{driver.pincode}</td>
                  <td>{driver.mobileno}</td>
                  <td>
  {driver.imageUrl ? (
    <img src={driver.imageUrl} alt="Driver" width="50" height="50" />
  ) : (
    "No Image"
  )}
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDriver;
