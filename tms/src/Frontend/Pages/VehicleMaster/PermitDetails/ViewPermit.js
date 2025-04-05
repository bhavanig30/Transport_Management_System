import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/ViewPermit.css";

const ViewPermit = () => {
  const [vehicleid, setVehicleid] = useState("");
  const [permitno, setPermitno] = useState("");
  const [permitDetails, setPermitDetails] = useState([]);
  const [allPermitDetails, setAllPermitDetails] = useState([]);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [permitNos, setPermitNos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPermitDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getPermit");

        const formattedData = response.data.map((permit) => ({
          ...permit,
          vehicleid: String(permit.vehicleid).trim(),
          permitno: String(permit.permitno).trim(),
        }));

        setPermitDetails(formattedData);
        setAllPermitDetails(formattedData);

        // Extract unique Vehicle IDs and Permit Nos
        setVehicleIds([...new Set(formattedData.map((p) => p.vehicleid))]);
        setPermitNos([...new Set(formattedData.map((p) => p.permitno))]);
      } catch (error) {
        console.error("Error fetching permit details:", error);
        setError("Failed to fetch permit details. Please try again.");
      }
    };

    fetchPermitDetails();
  }, []);

  const handleSearch = () => {
    const filtered = allPermitDetails.filter((permit) => {
      return (
        (vehicleid === "" || permit.vehicleid === vehicleid) &&
        (permitno === "" || permit.permitno === permitno)
      );
    });

    setPermitDetails(filtered);

    // **Immediately reset the filters**
    setVehicleid("");
    setPermitno("");
    setPermitDetails(allPermitDetails);
  };

  return (
    <div className="view-permit-container">
      <div className="view-permit-box">
        <div className="view-permit-main-title">PERMIT DETAILS</div>

        <div className="view-permit-filter-container">
          {/* Vehicle ID Dropdown */}
          <div className="view-permit-filter-item">
            <label>Vehicle ID</label>
            <select value={vehicleid} onChange={(e) => setVehicleid(e.target.value)}>
              <option value="">All</option>
              {vehicleIds.map((id, index) => (
                <option key={index} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          {/* Permit No Dropdown */}
          <div className="view-permit-filter-item">
            <label>Permit No</label>
            <select value={permitno} onChange={(e) => setPermitno(e.target.value)}>
              <option value="">All</option>
              {permitNos.map((no, index) => (
                <option key={index} value={no}>
                  {no}
                </option>
              ))}
            </select>
          </div>

          <button className="view-permit-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

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
            {permitDetails.length > 0 ? (
              permitDetails.map((permit, index) => (
                <tr key={index}>
                  <td>{permit.permitid}</td>
                  <td>{permit.vehicleid}</td>
                  <td>{permit.permitno}</td>
                  <td>{permit.permittype}</td>
                  <td>{new Date(permit.issuedate).toLocaleDateString()}</td>
                  <td>{new Date(permit.expirydate).toLocaleDateString()}</td>
                  <td>{permit.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No records found</td>
              </tr>
            )}
          </tbody>
        </table>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ViewPermit;
