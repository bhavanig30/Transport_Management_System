import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ViewRoute.css";

const ViewRoute = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [routeName, setRouteName] = useState("");
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  // Simulating backend data
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, name: "Route A", city: "New York", stages: 5, distance: 15 },
        { id: 2, name: "Route B", city: "Los Angeles", stages: 6, distance: 20 },
        { id: 3, name: "Route C", city: "Chicago", stages: 4, distance: 12 },
        { id: 4, name: "Route D", city: "New York", stages: 7, distance: 18 },
      ];
      setRoutes(data);
      setFilteredRoutes(data);
    };
    fetchData();
  }, []);

  // Filter function
  const handleSearch = () => {
    let filtered = routes;
    if (city) filtered = filtered.filter((route) => route.city === city);
    if (routeName) filtered = filtered.filter((route) => route.name === routeName);
    setFilteredRoutes(filtered);
  };

  return (
    <div className="view-route-master-container">
      <div className="view-route-box-wrapper">
        <div className="view-route-main-title">ROUTE MASTER</div>
        <div className="view-route-title">View</div>

        {/* Filters */}
        <div className="view-filter-container">
          <div className="view-filter-item">
            <label>City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All</option>
              {[...new Set(routes.map((route) => route.city))].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Route Name</label>
            <select value={routeName} onChange={(e) => setRouteName(e.target.value)}>
              <option value="">All</option>
              {[...new Set(routes.map((route) => route.name))].map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button className="view-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        {/* Table */}
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
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <tr key={route.id}>
                  <td>{route.id}</td>
                  <td>{route.name}</td>
                  <td>{route.city}</td>
                  <td>{route.stages}</td>
                  <td>{route.distance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No routes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRoute;
