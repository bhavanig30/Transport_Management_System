import React, { useState } from "react";
import "../../styles/ViewCost.css";

const ViewCost = () => {
  // Sample Data for Display (Moved above useState)
  const costData = [
    { route: "Route A", stage: "Stage 1", fee: "100" },
    { route: "Route B", stage: "Stage 2", fee: "200" },
    { route: "Route C", stage: "Stage 3", fee: "150" },
    { route: "Route D", stage: "Stage 4", fee: "250" },
  ];

  const [route, setRoute] = useState("");
  const [stage, setStage] = useState("");
  
  const [filteredData, setFilteredData] = useState(costData);

  const routes = ["Route A", "Route B", "Route C", "Route D"];
  const stages = ["Stage 1", "Stage 2", "Stage 3", "Stage 4"];

  const handleSearch = () => {
    const result = costData.filter(item =>
      (route === "" || item.route === route) &&
      (stage === "" || item.stage === stage)
    );
    setFilteredData(result);
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
              <option value="">Select</option>
              {routes.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="view-cost-filter-item">
            <label>Stage</label>
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="">Select</option>
              {stages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button className="view-cost-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        <table className="view-cost-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Stage</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((cost, index) => (
                <tr key={index}>
                  <td>{cost.route}</td>
                  <td>{cost.stage}</td>
                  <td>{cost.fee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCost;
