import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/ViewRoute.css";

const ViewRoute = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [routeName, setRouteName] = useState("");
  
  // Sample Data for Display
  const routeData = [
    { routeId: "R001", routeName: "Route Alpha", city: "City A", totalStages: 5, totalDistance: 25 },
    { routeId: "R002", routeName: "Route Beta", city: "City B", totalStages: 6, totalDistance: 30 },
    { routeId: "R003", routeName: "Route Gamma", city: "City C", totalStages: 4, totalDistance: 20 },
  ];

  const [filteredData, setFilteredData] = useState(routeData);

  const cities = ["City A", "City B", "City C"];
  const routeNames = ["Route Alpha", "Route Beta", "Route Gamma"];

  // Filter Data Based on Input
  const handleSearch = () => {
    const result = routeData.filter(item => 
      (city === "" || item.city === city) &&
      (routeName === "" || item.routeName.toLowerCase().includes(routeName.toLowerCase()))
    );
    setFilteredData(result);
  };

  return (
    <>
      <div className="view-route-master-container">
        <div className="view-route-box-wrapper">
          <div className="view-route-main-title">ROUTE MASTER</div>
          <div className="view-route-title">View</div>

          <div className="view-filter-container">
            <div className="view-filter-item">
              <label>City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="view-filter-item">
              <label>Route Name</label>
              <select value={routeName} onChange={(e) => setRouteName(e.target.value)}>
                <option value="">All</option>
                {routeNames.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <button className="view-search-button" onClick={handleSearch}>SEARCH</button>
          </div>

          <table className="view-route-table">
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Route Name</th>
                <th>City</th>
                <th>Total Stages</th>
                <th>Total Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.routeId}</td>
                    <td>{item.routeName}</td>
                    <td>{item.city}</td>
                    <td>{item.totalStages}</td>
                    <td>{item.totalDistance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewRoute;