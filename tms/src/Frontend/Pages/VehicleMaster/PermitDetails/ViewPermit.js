import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/ViewPermit.css";
import { exportToExcel } from "../../ReportGenerator"

const ViewPermit = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [permitId, setPermitId] = useState("");
  const [permitData, setPermitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [permitIds, setPermitIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPermitData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getPermit");
        setPermitData(response.data);
        setFilteredData(response.data);
        setPermitIds(response.data.map(p => p.permitno));
      } catch (error) {
        console.error("Error fetching permit data:", error);
        setError("Failed to fetch permit data.");
      }
    };

    const fetchVehicleIds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getVehicle");
        const vehicleIds = response.data.map(vehicle => vehicle.vehicleid);
        setVehicleIds(vehicleIds);
      } catch (error) {
        console.error("Error fetching vehicle IDs:", error);
        setError("Failed to fetch vehicle IDs.");
      }
    };

    fetchPermitData();
    fetchVehicleIds();
    setLoading(false);
  }, []);

  const handleSearch = () => {
    const result = permitData.filter(item =>
      (vehicleId === "" || item.vehicleid.toLowerCase().includes(vehicleId.toLowerCase())) &&
      (permitId === "" || item.permitno.toLowerCase().includes(permitId.toLowerCase()))
    );
    setFilteredData(result);
  };

  return (
    <div className="view-permit-container">
      <div className="view-permit-box">
        <div className="view-permit-main-title">PERMIT DETAILS</div>

        <div className="view-permit-filter-container">
          {/* Vehicle ID Dropdown */}
          <div className="view-permit-filter-item">
            <label>Vehicle ID</label>
            <div className="view-permit-dropdown-container">
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="vehicle-id-dropdown"
              >
                <option value="">Select Vehicle ID</option>
                {vehicleIds.map((id, index) => (
                  <option key={index} value={id}>{id}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="view-permit-filter-item">
            <label>Permit ID</label>
            <div className="view-permit-dropdown-container">
              <select
                value={permitId}
                onChange={(e) => setPermitId(e.target.value)}
                className="permit-id-dropdown"
              >
                <option value="">Select Permit ID</option>
                {permitIds.map((id, index) => (
                  <option key={index} value={id}>{id}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="view-permit-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <button className="report-button" onClick={() => exportToExcel(filteredData, "Permit_Report")}>
            Generate Report
          </button>
        </div>        

        {error && <div className="error-message">{error}</div>}

        <table className="view-permit-table">
          <thead>
            <tr>
              <th>Permit ID</th>
              <th>Vehicle ID</th>
              <th>Permit No</th>
              <th>Permit Type</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((permit, index) => (
                <tr key={index}>
                  <td>{permit.vehicleid}</td>
                  <td>{permit.permitno}</td>
                  <td>{permit.permittype}</td>
                  <td>{permit.issuedate.split('T')[0]}</td>
                  <td>{permit.expirydate.split('T')[0]}</td>
                  <td>{permit.status}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No Data Found</td></tr>
            )}
          </tbody>
        </table>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ViewPermit;
