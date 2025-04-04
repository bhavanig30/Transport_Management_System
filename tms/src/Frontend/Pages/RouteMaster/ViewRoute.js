import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ViewRoute.css";

const ViewRoute = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [routeId, setRouteId] = useState("");
  const [routes, setRoutes] = useState([]);
  const [allRoutes, setAllRoutes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getRoute");
        console.log("API Response:", response.data);
        setRoutes(response.data);
        setAllRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
        setError("Failed to fetch routes. Please try again.");
      }
    };
    fetchRoutes();
  }, []);

  const handleSearch = () => {
    const filtered = allRoutes.filter((route) => {
      return (
        (city === "" || route.city?.trim() === city.trim()) &&
        (routeId === "" || route.routeid.toString() === routeId.trim())
      );
    });

    setRoutes(filtered);
    console.log("Filtered Routes:", filtered);

    setCity("");
    setRouteId("");
  };

  return (
    <div className="view-route-master-container">
      <div className="view-route-box-wrapper">
        <div className="view-route-main-title">ROUTE MASTER</div>
        <div className="view-route-title">View</div>

        <div className="view-filter-container">
          <div className="view-filter-item">
            <label>City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All</option>
              {allRoutes.map((route) => (
                <option key={route.city} value={route.city}>
                  {route.city}
                </option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Route ID</label>
            <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
              <option value="">All</option>
              {allRoutes.map((route) => (
                <option key={route.routeid} value={route.routeid}>
                  {route.routeid}
                </option>
              ))}
            </select>
          </div>

          <button className="view-search-button" onClick={handleSearch}>
            SEARCH
          </button>
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
            {routes.length > 0 ? (
              routes.map((route, index) => (
                <tr key={route.routeid}>
                  <td>{route.routeid}</td>
                  <td>{route.routename}</td>
                  <td>{route.city}</td>
                  <td>{route.totalstages}</td>
                  <td>{route.totaldistance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No route data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRoute;
