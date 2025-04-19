import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ViewCost.css";
import { exportToExcel } from "../ReportGenerator"

const ViewCost = () => {
  const [route, setRoute] = useState("");
  const [stage, setStage] = useState("");
  const [routes, setRoutes] = useState([]);
  const [allStages, setAllStages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch route and stage data on mount
  useEffect(() => {
    axios.get("http://localhost:5000/getRoute")
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error("Error loading routes", err));

    axios.get("http://localhost:5000/getStage")
      .then((res) => {
        setAllStages(res.data);
        setFilteredData(res.data); // Show all by default
      })
      .catch((err) => console.error("Error loading stages", err));
  }, []);

  // Handle filter logic
  const handleSearch = () => {
    const result = allStages.filter((item) =>
      (route === "" || item.routeid.toString() === route) &&
      (stage === "" || item.stagename.toLowerCase().includes(stage.toLowerCase()))
    );
    setFilteredData(result);
  };

  // Get route name by ID
  const getRouteName = (routeId) => {
    const found = routes.find((r) => r.routeid === routeId);
    return found ? found.routename : "N/A";
  };

  return (
    <div className="view-cost-container">
      <div className="view-cost-box-wrapper">
        <div className="view-cost-main-title">COST DETAILS</div>
        <div className="view-cost-title">View</div>

        <div className="view-cost-filter-container">
          <div className="view-cost-filter-item">
            <label>Route</label>
            <select value={route} onChange={(e) => setRoute(e.target.value)}>
              <option value="">All</option>
              {routes.map((r, index) => (
                <option key={index} value={r.routeid}>
                  {r.routeid} - {r.routename}
                </option>
              ))}
            </select>
          </div>

          <div className="view-cost-filter-item">
            <label>Stage</label>
            <input
              type="text"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder="Enter Stage Name"
            />
          </div>

          <button className="view-cost-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <button
            className="report-button"
            onClick={() => exportToExcel(filteredData, "Cost_Report")}
          >
            Generate Report
          </button>
        </div>

        <table className="view-cost-table">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Route ID</th>
              <th>Route Name</th>
              <th>Stage Name</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.routeid}</td>
                  <td>{getRouteName(item.routeid)}</td>
                  <td>{item.stagename}</td>
                  <td>{item.fee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No cost data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCost;
