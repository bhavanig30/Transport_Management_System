import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ViewStage.css";

const ViewStage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [routeId, setRouteId] = useState("");
  const [stageName, setStageName] = useState("");
  const [stages, setStages] = useState([]);
  const [allStages, setAllStages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getStages");
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

  const handleSearch = () => {
    const filtered = allStages.filter((stage) => {
      return (
        (city === "" || stage.city?.toLowerCase() === city.toLowerCase()) &&
        (routeId === "" || stage.routeid.toString() === routeId.trim()) &&
        (stageName === "" || stage.stagename.toLowerCase().includes(stageName.toLowerCase()))
      );
    });
    setStages(filtered);
    console.log("Filtered Stages:", filtered);
  };

  return (
    <div className="view-stage-master-container">
      <div className="view-stage-box-wrapper">
        <div className="view-stage-main-title">STAGE MASTER</div>
        <div className="view-stage-title">View</div>

        <div className="view-filter-container">
          <div className="view-filter-item">
            <label>City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All</option>
              {allStages.map((stage) => (
                <option key={stage.city} value={stage.city}>{stage.city}</option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Route ID</label>
            <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
              <option value="">All</option>
              {allStages.map((stage) => (
                <option key={stage.routeid} value={stage.routeid}>{stage.routeid}</option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Stage Name</label>
            <input type="text" value={stageName} onChange={(e) => setStageName(e.target.value)} placeholder="Enter Stage Name" />
          </div>

          <button className="view-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

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
                <tr key={stage.sno}>
                  <td>{index + 1}</td>
                  <td>{stage.stagename}</td>
                  <td>{stage.city}</td>
                  <td>{stage.routeid}</td>
                  <td>{stage.arrivaltime}</td>
                  <td>{stage.departuretime}</td>
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
