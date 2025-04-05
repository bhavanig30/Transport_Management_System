import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/ViewInsurance.css";

const ViewInsurance = () => {
  const [vehicleid, setVehicleid] = useState("");
  const [insuranceno, setInsuranceno] = useState(""); // Insurance No for filtering
  const [insuranceDetails, setInsuranceDetails] = useState([]);
  const [allInsuranceDetails, setAllInsuranceDetails] = useState([]);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [insuranceNos, setInsuranceNos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsuranceDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getInsurance");

        const formattedData = response.data.map((ins) => ({
          ...ins,
          vehicleid: String(ins.vehicleid).trim(),
          insuranceno: String(ins.insuranceno).trim(),
        }));

        setInsuranceDetails(formattedData);
        setAllInsuranceDetails(formattedData);

        // Extract unique Vehicle IDs and Insurance Nos
        setVehicleIds([...new Set(formattedData.map((ins) => ins.vehicleid))]);
        setInsuranceNos([...new Set(formattedData.map((ins) => ins.insuranceno))]);
      } catch (error) {
        console.error("Error fetching insurance details:", error);
        setError("Failed to fetch insurance details. Please try again.");
      }
    };

    fetchInsuranceDetails();
  }, []);

  const handleSearch = () => {
    const filtered = allInsuranceDetails.filter((ins) => {
      return (
        (vehicleid === "" || String(ins.vehicleid).trim() === vehicleid) &&
        (insuranceno === "" || String(ins.insuranceno).trim() === insuranceno)
      );
    });

    setInsuranceDetails(filtered);

    // Reset dropdowns after search
    setVehicleid("");
    setInsuranceno("");
  };

  return (
    <div className="view-insurance-container">
      <div className="view-insurance-box">
        <div className="view-insurance-title-main">View Insurance Details</div>

        <div className="view-insurance-filter-container">
          {/* Vehicle ID Dropdown */}
          <div className="view-insurance-filter-item">
            <label>Vehicle ID</label>
            <select value={vehicleid} onChange={(e) => setVehicleid(e.target.value)}>
              <option value="">All</option>
              {vehicleIds.map((id, index) => (
                <option key={index} value={id}>{id}</option>
              ))}
            </select>
          </div>

          {/* Insurance No Dropdown */}
          <div className="view-insurance-filter-item">
            <label>Insurance No</label>
            <select value={insuranceno} onChange={(e) => setInsuranceno(e.target.value)}>
              <option value="">All</option>
              {insuranceNos.map((no, index) => (
                <option key={index} value={no}>{no}</option>
              ))}
            </select>
          </div>

          <button className="view-insurance-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <table className="view-insurance-table">
          <thead>
            <tr>
              <th>Insurance ID</th>
              <th>Vehicle ID</th>
              <th>Insurance No</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {insuranceDetails.length > 0 ? (
              insuranceDetails.map((ins, index) => (
                <tr key={index}>
                  <td>{ins.insuranceid}</td>
                  <td>{ins.vehicleid}</td>
                  <td>{ins.insuranceno}</td>
                  <td>{ins.startdate ? new Date(ins.startdate).toLocaleDateString() : "N/A"}</td>
                  <td>{ins.expirydate ? new Date(ins.expirydate).toLocaleDateString() : "N/A"}</td>
                  <td>{ins.status}</td>
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

export default ViewInsurance;