import React, { useState } from "react";
import "./StageMaster.css"; // Ensure the correct CSS file is used

const StageMasterForm = () => {
  const [formData, setFormData] = useState({
    pointNo: "",
    stageName: "",
    stageLocation: "",
    arrivalTime: "",
    departureTime: "",
    routeNumber: "",
    stagePointNo: "",
    stageFees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Stage Form Submitted", formData);
  };

  return (
    <div className="stage-form-container">
      <div className="stage-header">National Engineering College</div>

      <form className="stage-form" onSubmit={handleSubmit}>
        <div className="stage-title">Stage Master Form</div>

        <div className="stage-form-row">
          <div className="stage-form-group">
            <label htmlFor="pointNo">Point No</label>
            <input
              type="text"
              id="pointNo"
              name="pointNo"
              placeholder="Enter Point No"
              value={formData.pointNo}
              onChange={handleChange}
            />
          </div>

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
        </div>

        <div className="stage-form-row">
          <div className="stage-form-group">
            <label htmlFor="stageLocation">Stage Location</label>
            <input
              type="text"
              id="stageLocation"
              name="stageLocation"
              placeholder="Enter Stage Location"
              value={formData.stageLocation}
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
        </div>

        <div className="stage-form-row">
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
            <label htmlFor="routeNumber">Route Number</label>
            <input
              type="text"
              id="routeNumber"
              name="routeNumber"
              placeholder="Enter Route Number"
              value={formData.routeNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="stage-form-row">
          <div className="stage-form-group">
            <label htmlFor="stagePointNo">Stage Point No</label>
            <input
              type="text"
              id="stagePointNo"
              name="stagePointNo"
              placeholder="Enter Stage Point No"
              value={formData.stagePointNo}
              onChange={handleChange}
            />
          </div>

          <div className="stage-form-group">
            <label htmlFor="stageFees">Stage Fees</label>
            <input
              type="number"
              id="stageFees"
              name="stageFees"
              placeholder="Enter Stage Fees"
              value={formData.stageFees}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="stage-submit-button">
          Add Stage
        </button>
      </form>
    </div>
  );
};

export default StageMasterForm;