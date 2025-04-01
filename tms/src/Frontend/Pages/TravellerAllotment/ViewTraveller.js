import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/ViewTraveller.css";

const ViewTraveller = () => {
  // Sample Data for Display
  const travellerData = [
    { rollNumber: "S123", name: "John Doe", designation: "Student", pickupPoint: "Point A", dropPoint: "Point B" },
    { rollNumber: "T101", name: "Jane Smith", designation: "Staff", pickupPoint: "Point C", dropPoint: "Point D" },
    { rollNumber: "S456", name: "Mike Johnson", designation: "Student", pickupPoint: "Point E", dropPoint: "Point F" },
    { rollNumber: "T202", name: "Emily Davis", designation: "Staff", pickupPoint: "Point G", dropPoint: "Point H" },
  ];

  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState(travellerData);

  const rollNumberOptions = ["S123", "T101", "S456", "T202"];
  const nameOptions = travellerData.map((traveller) => traveller.name);

  const handleSearch = () => {
    const result = travellerData.filter(item =>
      (rollNumber === "" || item.rollNumber.includes(rollNumber)) &&
      (name === "" || item.name.toLowerCase().includes(name.toLowerCase()))
    );
    setFilteredData(result);
  };

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="view-traveller-container">
      <div className="view-traveller-box-wrapper">
        <div className="view-traveller-main-title">TRAVELLER ALLOTMENT</div>
        <div className="view-traveller-title">View</div>

        <div className="view-filter-container">
          {/* Roll Number Input with Dropdown and Typing */}
          <div className="view-filter-item">
            <label>Roll Number</label>
            <input
              type="text"
              list="rollNumberOptions"
              value={rollNumber}
              onChange={handleRollNumberChange}
              placeholder="Type or Select Roll Number"
            />
            <datalist id="rollNumberOptions">
              {rollNumberOptions.map((num) => (
                <option key={num} value={num} />
              ))}
            </datalist>
          </div>

          {/* Name Input with Dropdown and Typing */}
          <div className="view-filter-item">
            <label>Name</label>
            <input
              type="text"
              list="nameOptions"
              value={name}
              onChange={handleNameChange}
              placeholder="Type or Select Name"
            />
            <datalist id="nameOptions">
              {nameOptions.map((nameOption) => (
                <option key={nameOption} value={nameOption} />
              ))}
            </datalist>
          </div>

          <button className="view-search-button" onClick={handleSearch}>SEARCH</button>
        </div>

        <table className="view-traveller-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Pickup Point</th>
              <th>Drop Point</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((traveller, index) => (
                <tr key={index}>
                  <td>{traveller.rollNumber}</td>
                  <td>{traveller.name}</td>
                  <td>{traveller.designation}</td>
                  <td>{traveller.pickupPoint}</td>
                  <td>{traveller.dropPoint}</td>
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
  );
};

export default ViewTraveller;
