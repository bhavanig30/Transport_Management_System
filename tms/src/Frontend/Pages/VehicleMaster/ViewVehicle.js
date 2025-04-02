import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ViewVehicle.css";

const ViewVehicle = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [regNo, setRegNo] = useState("");
  const [vehicles, setVehicles] = useState([]); // Filtered data
  const [allVehicles, setAllVehicles] = useState([]); // All vehicles
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getVehicle");
        console.log("API Response:", response.data);
        setVehicles(response.data);
        setAllVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Failed to fetch vehicles. Please try again.");
      }
    };
    fetchVehicles();
  }, []);

const handleSearch = () => {
  const filtered = allVehicles.filter((vehicle) => {
    return (
      (vehicleType === "" || vehicle.vehicletype?.toLowerCase() === vehicleType.toLowerCase()) &&
      (vehicleId === "" || vehicle.vehicleid.toString() === vehicleId.trim()) &&
      (regNo === "" || vehicle.registrationno.toLowerCase() === regNo.trim().toLowerCase())
    );
  });

  setVehicles(filtered);
  console.log("Filtered Vehicles:", filtered);

  setVehicleType("");
   setVehicleId("");
    setRegNo("");
  // Do not reset the search fields
};

  return (
    <div className="view-vehicle-master-container">
      <div className="view-vehicle-box-wrapper">
        <div className="view-vehicle-main-title">VEHICLE MASTER</div>
        <div className="view-vehicle-title">View</div>

        <div className="view-filter-container">
          <div className="view-filter-item">
            <label>Vehicle Type</label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="">All</option>
              <option value="A/C">A/C</option>
              <option value="Non-A/C">Non A/C</option>
            </select>
          </div>

          <div className="view-filter-item">
            <label>Vehicle ID</label>
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              <option value="">All</option>
              {allVehicles.map((vehicle) => (
                <option key={vehicle.vehicleid} value={vehicle.vehicleid}>
                  {vehicle.vehicleid}
                </option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Reg No</label>
            <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="Enter Reg No" />
          </div>

          <button className="view-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        <table className="view-vehicle-table">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Vehicle Type</th>
              <th>Vehicle ID</th>
              <th>Seat Capacity</th>
              <th>Reg No</th>
              <th>Route ID</th>
              <th>Reg Date</th>
              <th>RC No</th>
              <th>Purchase Date</th>
              <th>Vendor ID</th>
              <th>Registration Place</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle, index) => (
                <tr key={vehicle.vehicleid}>
                  <td>{index + 1}</td>
                  <td>{vehicle.vehicletype}</td>
                  <td>{vehicle.vehicleid}</td>
                  <td>{vehicle.seatcapacity}</td>
                  <td>{vehicle.registrationno}</td>
                  <td>{vehicle.routeid || "N/A"}</td>
                  <td>{vehicle.registrationdate ? new Date(vehicle.registrationdate).toLocaleDateString() : "N/A"}</td>
                  <td>{vehicle.rcno}</td>
                  <td>{vehicle.purchasedate ? new Date(vehicle.purchasedate).toLocaleDateString() : "N/A"}</td>
                  <td>{vehicle.vendorid || "N/A"}</td>
                  <td>{vehicle.registrationplace}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No vehicle data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewVehicle;

