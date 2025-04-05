import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/ViewFC.css";

const ViewFC = () => {
  const navigate = useNavigate();
  const [vehicleid, setVehicleid] = useState("");
  const [fcno, setFcno] = useState(""); // FC No for filtering
  const [fcDetails, setFcDetails] = useState([]);
  const [allFcDetails, setAllFcDetails] = useState([]);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [fcNos, setFcNos] = useState([]); // FC No values
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFcDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getFC");

        const formattedData = response.data.map((fc) => ({
          ...fc,
          vehicleid: String(fc.vehicleid).trim(),
          fcno: String(fc.fcno).trim(),
        }));

        setFcDetails(formattedData);
        setAllFcDetails(formattedData);

        // Extract unique Vehicle IDs and FC No values
        setVehicleIds([...new Set(formattedData.map((fc) => fc.vehicleid))]);
        setFcNos([...new Set(formattedData.map((fc) => fc.fcno))]);
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
        (vehicleid === "" || String(fc.vehicleid).trim() === vehicleid) &&
        (fcno === "" || String(fc.fcno).trim() === fcno)
      );
    });

    setFcDetails(filtered);

    // Reset dropdowns after search
    setVehicleid("");
    setFcno("");
  };

  return (
    <div className="view-fc-container">
      <div className="view-fc-box">
        <div className="view-fc-title-main">View FC Details</div>

        <div className="view-fc-filter-container">
          {/* Vehicle ID Dropdown */}
          <div className="view-fc-filter-item">
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

          {/* FC No Dropdown */}
          <div className="view-fc-filter-item">
            <label>FC No</label>
            <select value={fcno} onChange={(e) => setFcno(e.target.value)}>
              <option value="">All</option>
              {fcNos.map((no, index) => (
                <option key={index} value={no}>
                  {no}
                </option>
              ))}
            </select>
          </div>

          <button className="view-fc-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

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

