import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ViewTraveller.css";
import { exportToExcel } from "../ReportGenerator"

const ViewTraveller = () => {
  const [travellerData, setTravellerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rollNumber, setRollNumber] = useState("");
  const [routeId, setRouteId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/getTraveller")
      .then(res => {
        console.log("Fetched data:", res.data);
        setTravellerData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => {
        console.error("Error fetching traveller data:", err);
      });
  }, []);

  const handleSearch = () => {
    const result = travellerData.filter(item =>
      (rollNumber === "" || item.rollno === rollNumber) &&
      (routeId === "" || item.routeid === routeId)
    );
    setFilteredData(result);
  };

  const rollNumberOptions = [...new Set(travellerData.map(t => t.rollno))];
  const routeIdOptions = [...new Set(travellerData.map(t => t.routeid))];

  return (
    <div className="view-traveller-container">
      <div className="view-traveller-box-wrapper">
        <div className="view-traveller-main-title">TRAVELLER ALLOTMENT</div>
        <div className="view-traveller-title">View</div>

        <div className="view-filter-container">
          <div className="view-filter-item">
            <label>Roll Number</label>
            <select value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}>
              <option value="">All</option>
              {rollNumberOptions.map((num, index) => (
                <option key={index} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="view-filter-item">
            <label>Route ID</label>
            <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
              <option value="">All</option>
              {routeIdOptions.map((id, index) => (
                <option key={index} value={id}>{id}</option>
              ))}
            </select>
          </div>

          <button className="view-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <button
            className="report-button"
            onClick={() => exportToExcel(filteredData, "Traveller_Report")}
          >
            Generate Report
          </button>
        </div>

        <table className="view-traveller-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Door No</th>
              <th>Street</th>
              <th>Place</th>
              <th>Route ID</th>
              <th>Pickup Point</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((traveller, index) => (
                <tr key={index}>
                  <td>{traveller.rollno}</td>
                  <td>{traveller.name}</td>
                  <td>{traveller.role}</td>
                  <td>{traveller.branch}</td>
                  <td>{traveller.doorno}</td>
                  <td>{traveller.street}</td>
                  <td>{traveller.place}</td>
                  <td>{traveller.routeid}</td>
                  <td>{traveller.point}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTraveller;
