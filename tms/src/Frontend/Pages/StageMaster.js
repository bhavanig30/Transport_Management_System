import React, { useState } from "react";
import "./StageMaster.css"; // Ensure the correct CSS file is used

const StageMasterForm = () => {
  const [formData, setFormData] = useState({
    stageName: "",
    arrivalTime: "",
    departureTime: "",
    fees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/addStage", {  // Make sure the URL is correct
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Stage added successfully! Stage ID: " + data.stageId);
            setFormData({ stageName: "", arrivalTime: "", departureTime: "", fees: "" }); // Reset form
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
      <div className="stage-header">National Engineering College</div>

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
          <label htmlFor="fees">Fees</label>
          <input
            type="number"
            id="fees"
            name="fees"
            placeholder="Enter Fees"
            value={formData.fees}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="stage-submit-button">
          Add 
        </button>
      </form>
    </div>
  );
};

export default StageMasterForm;
