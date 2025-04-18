import React, { useState, useEffect } from "react";
import "../../styles/AddStage.css";

const AddStage = () => {
  const [formData, setFormData] = useState({
    stageName: "",
    city: "",
    routeId: "",
    arrivalTime: "",
    departureTime: "",
    fee: ""
  });

  const [routeIds, setRouteIds] = useState([]);
 
  const cities = [
    "Kovilpatti", "Thoothukudi", "Tirunelveli", "Sattur", "Virudhunagar",
    "Vilathikulam", "Sivakasi", "Kayathar", "Sankarankovil", "Kalugumalai"
  ];

  useEffect(() => {
    const fetchRouteIds = async () => {
      if (formData.city) {
        try {
          const response = await fetch(`http://localhost:5000/getRouteByCity?city=${formData.city}`);
          const data = await response.json();
          if (response.ok) {
            setRouteIds(data.routes);
          } else {
            alert("Error fetching routes: " + data.message);
            setRouteIds([]);
          }
        } catch (error) {
          console.error("Error fetching routes:", error);
          setRouteIds([]);
        }
      } else {
        setRouteIds([]);
      }
    };

    fetchRouteIds();
  }, [formData.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch("http://localhost:5000/addStage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Stage added successfully! Stage ID: " + data.stageId);
        setFormData({
          stageName: "",
          city: "",
          routeId: "",
          arrivalTime: "",
          departureTime: "",
          fee: ""
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit stage data.");
    }
  };

  return (
    <div className="stage-form-container">
      <form className="stage-form" onSubmit={handleSubmit}>
        <div className="stage-title">Stage Master Form</div>

        <div className="stage-form-group">
          <label htmlFor="stageName">Stage Name</label>
          <input
            type="text"
            id="stageName"
            name="stageName"
            placeholder="Enter Stage Name"
            value={formData.stageName}
            onChange={handleChange}
          />
        </div>

        <div className="stage-form-group">
          <label htmlFor="city">City</label>
          <select id="city" name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="stage-form-group">
          <label htmlFor="routeId">Route ID</label>
          <select id="routeId" name="routeId" value={formData.routeId} onChange={handleChange} disabled={!formData.city}>
            <option value="">Select Route ID</option>
            {routeIds.map((routeId, index) => (
              <option key={index} value={routeId}>{routeId}</option>
            ))}
          </select>
        </div>

        <div className="stage-form-group">
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
          />
        </div>

        <div className="stage-form-group">
          <label htmlFor="departureTime">Departure Time</label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
          />
        </div>

        <div className="stage-form-group">
          <label htmlFor="fee">Fee</label>
          <input
            type="number"
            id="fee"
            name="fee"
            placeholder="Enter Fee"
            value={formData.fee}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="stage-submit-button">
          Add Stage
        </button>
      </form>
    </div>
  );
};

export default AddStage;