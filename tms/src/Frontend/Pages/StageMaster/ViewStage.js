import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ViewStage.css";
import { exportToExcel } from "../ReportGenerator"

const ViewStage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [routeId, setRouteId] = useState("");
  const [stageName, setStageName] = useState("");
  const [stages, setStages] = useState([]);
  const [allStages, setAllStages] = useState([]);
  const [routeIds, setRouteIds] = useState([]);
  const [error, setError] = useState("");

  // Predefined list of cities
  const cities = [
    "Kovilpatti", "Thoothukudi", "Tirunelveli", "Sattur", "Virudhunagar",
    "Vilathikulam", "Sivakasi", "Kayathar", "Sankarankovil", "Kalugumalai"
  ];

  // Fetch all stages
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getStage");
        console.log("API Response:", response.data);
        setStages(response.data);
        setAllStages(response.data);
      } catch (error) {
        console.error("Error fetching stages:", error);
        setError("Failed to fetch stages. Please try again.");
      }
    };

    fetchStages();
  }, []);

  // Fetch Route IDs from the database
  useEffect(() => {
    const fetchRouteIds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getRoute"); // Adjust endpoint as needed
        setRouteIds(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRouteIds();
  }, []);

  // Handle search/filter
  const handleSearch = () => {
    const filtered = allStages.filter((stage) => {
      return (
        (city === "" || stage.city?.trim() === city.trim()) &&
        (routeId === "" || stage.routeid.toString() === routeId.trim()) &&
        (stageName === "" || stage.stagename.toLowerCase().includes(stageName.toLowerCase()))
      );
    });

    setStages(filtered);
    console.log("Filtered Stages:", filtered);

    setCity("");
    setRouteId("");
    setStageName("");
  };

  return (
    <div className="view-stage-master-container">
      <div className="view-stage-box-wrapper">
        <div className="view-stage-main-title">STAGE MASTER</div>
        <div className="view-stage-title">View</div>

        <div className="view-filter-container">
          {/* City Dropdown */}
          <div className="view-filter-item">
            <label>City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All</option>
              {cities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>

          {/* Route ID Dropdown */}
          <div className="view-filter-item">
            <label>Route ID</label>
            <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
              <option value="">All</option>
              {routeIds.map((route) => (
                <option key={route.routeid} value={route.routeid}>
                  {route.routeid}
                </option>
              ))}
            </select>
          </div>

          {/* Stage Name Input */}
          <div className="view-filter-item">
            <label>Stage Name</label>
            <input
              type="text"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              placeholder="Enter Stage Name"
            />
          </div>

          {/* Search Button */}
          <button className="view-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <button
            className="report-button"
            onClick={() => exportToExcel(stages, "Stages_Report")}
          >
            Generate Report
          </button>
        </div>

        {/* Stage Table */}
        <table className="view-stage-table">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Stage Name</th>
              <th>City</th>
              <th>Route ID</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {stages.length > 0 ? (
              stages.map((stage, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stage.stagename}</td>
                  <td>{stage.city}</td>
                  <td>{stage.routeid}</td>
                  <td>{stage.arrivaltime || "N/A"}</td>
                  <td>{stage.departuretime || "N/A"}</td>
                  <td>{stage.fee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No stage data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStage;
