import React, { useState } from "react";
import "./DriverAllotment.css";

const DriverAllotmentForm = () => {
  const [formData, setFormData] = useState({
    staffcode: "",
    staffname: "",
    doorno: "",
    streetname: "",
    city: "",
    pincode: "",
    state: "",
    mobileno: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Allotment Form Submitted", formData);
  };

  return (
    <div className="driver-form-container">
      <div className="driver-header">National Engineering College</div>

      <form className="driver-form" onSubmit={handleSubmit}>
        <div className="driver-title">Driver Allotment </div>

        <div className="driver-form-row">
          <div className="driver-form-group">
            <label htmlFor="staffcode">Staff Code</label>
            <input type="text" id="staffcode" name="staffcode" placeholder="Enter Staff Code" value={formData.staffcode} onChange={handleChange} />
          </div>
          <div className="driver-form-group">
            <label htmlFor="staffname">Staff Name</label>
            <input type="text" id="staffname" name="staffname" placeholder="Enter Staff Name" value={formData.staffname} onChange={handleChange} />
          </div>
        </div>

        <div className="driver-form-row">
          <div className="driver-form-group">
            <label htmlFor="doorno">Door No</label>
            <input type="text" id="doorno" name="doorno" placeholder="Enter Door No" value={formData.doorno} onChange={handleChange} />
          </div>
          <div className="driver-form-group">
            <label htmlFor="streetname">Street Name</label>
            <input type="text" id="streetname" name="streetname" placeholder="Enter Street Name" value={formData.streetname} onChange={handleChange} />
          </div>
        </div>

        <div className="driver-form-row">
          <div className="driver-form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} />
          </div>
          <div className="driver-form-group">
            <label htmlFor="pincode">Pincode</label>
            <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" value={formData.pincode} onChange={handleChange} />
          </div>
        </div>

        <div className="driver-form-row">
          <div className="driver-form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} />
          </div>
          <div className="driver-form-group">
            <label htmlFor="mobileno">Mobile No</label>
            <input type="text" id="mobileno" name="mobileno" placeholder="Enter Mobile No" value={formData.mobileno} onChange={handleChange} />
          </div>
        </div>

        <div className="driver-form-group">
          <label htmlFor="photo">Upload Photo</label>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="driver-submit-button">Add </button>
      </form>
    </div>
  );
};

export default DriverAllotmentForm;
