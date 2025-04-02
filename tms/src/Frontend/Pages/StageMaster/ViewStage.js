import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/ViewStage.css";

const ViewStage = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [routeId, setRouteId] = useState("");
  const [stageName, setStageName] = useState("");
  
  // Sample Data for Display
  const stageData = [
    { sno: 1, stageName: "Stage A", city: "City A", routeId: "Route 1", arrivalTime: "10:00 AM", departureTime: "10:15 AM", fee: "$10" },
    { sno: 2, stageName: "Stage B", city: "City B", routeId: "Route 2", arrivalTime: "11:00 AM", departureTime: "11:15 AM", fee: "$12" },
    { sno: 3, stageName: "Stage C", city: "City C", routeId: "Route 3", arrivalTime: "12:00 PM", departureTime: "12:15 PM", fee: "$15" },
    { sno: 4, stageName: "Stage D", city: "City A", routeId: "Route 1", arrivalTime: "1:00 PM", departureTime: "1:15 PM", fee: "$8" },
  ];

  const [filteredData, setFilteredData] = useState(stageData);

  const cities = ["City A", "City B", "City C"];
  const routeIds = Array.from({ length: 10 }, (_, i) => `Route ${i + 1}`);

  // Filter Data Based on Input
  const handleSearch = () => {
    const result = stageData.filter(item => 
      (city === "" || item.city === city) &&
      (routeId === "" || item.routeId === routeId) &&
      (stageName === "" || item.stageName.toLowerCase().includes(stageName.toLowerCase()))
    );
    setFilteredData(result);
  };

  return (
    <>
      <div className="view-stage-master-container">
        <div className="view-stage-box-wrapper">
          <div className="view-stage-main-title">STAGE MASTER</div>
          <div className="view-stage-title">View</div>

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
              <label>Route ID</label>
              <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
                <option value="">All</option>
                {routeIds.map((id) => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.sno}</td>
                    <td>{item.stageName}</td>
                    <td>{item.city}</td>
                    <td>{item.routeId}</td>
                    <td>{item.arrivalTime}</td>
                    <td>{item.departureTime}</td>
                    <td>{item.fee}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewStage;
