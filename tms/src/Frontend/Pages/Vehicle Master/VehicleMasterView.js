import React, { useState } from "react";
import "./VehicleMasterView.css";

const VehicleMasterView = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [regNo, setRegNo] = useState("");

  const vehicleTypes = ["A/C", "Non A/C"];
  const vehicleIds = Array.from({ length: 10 }, (_, i) => `R00${i + 1}`);

  return (
    <div className="vehicle-master-container">
      <div className="vehicle-header">NATIONAL ENGINEERING COLLEGE</div>

      <div className="vehicle-box-wrapper">
        {/* New Heading for Vehicle Master */}
        <div className="vehicle-main-title">VEHICLE MASTER</div>

        {/* Existing Title */}
        <div className="vehicle-title">View</div>

        <div className="filter-container">
          <div className="filter-item">
            <label>Vehicle Type</label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="">All</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Vehicle ID</label>
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              <option value="">All</option>
              {vehicleIds.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Reg No</label>
            <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="Enter Reg No" />
          </div>

          <button className="search-button">SEARCH</button>
        </div>

        <table className="vehicle-table">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Vehicle Type</th>
              <th>Vehicle ID</th>
              <th>Reg No</th>
              <th>Reg Date</th>
              <th>RC No</th>
              <th>Type</th>
              <th>Purchase Date</th>
              <th>Registration Place</th>
            </tr>
          </thead>
          <tbody>
            {/* Displaying 5 Empty Rows Without Data */}
            {[...Array(1)].map((_, index) => (
              <tr key={index}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleMasterView;
