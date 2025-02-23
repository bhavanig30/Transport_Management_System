import React, { useState } from "react";
import "./VehicleMasterAdd.css"; // Importing CSS file

const VehicleMasterAdd = () => {
  const [formData, setFormData] = useState({
    vehicleID: "",
    vehicleType: "",
    seatCapacity: "",
    regNo: "",
    routeNo: "",
    regDate: "",
    insurancePolicy: "",
    expiryDate: "",
    serviceDueDate: "",
    purchaseDate: "",
    vendorName: "",
    vendorContact: "",
    rcNumber: "",
    type: "",
    regPlace: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Vehicle Details Added Successfully!");
    console.log("Vehicle Data: ", formData);
    setFormData({
      vehicleID: "",
      vehicleType: "",
      seatCapacity: "",
      regNo: "",
      routeNo: "",
      regDate: "",
      insurancePolicy: "",
      expiryDate: "",
      serviceDueDate: "",
      purchaseDate: "",
      vendorName: "",
      vendorContact: "",
      rcNumber: "",
      type: "",
      regPlace: "",
      remarks: "",
    });
  };

  return (
    <div className="vehicle-master-container">
      <div className="vehicle-header">National Engineering College</div>

      <div className="vehicle-box-wrapper">
        <h2 className="vehicle-title">Add</h2>
        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-row">
            <div className="form-group">
              <label>Vehicle ID</label>
              <input type="text" name="vehicleID" value={formData.vehicleID} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Seat Capacity</label>
              <input type="text" name="seatCapacity" value={formData.seatCapacity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Reg No</label>
              <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Route No</label>
              <input type="text" name="routeNo" value={formData.routeNo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Reg Date</label>
              <input type="date" name="regDate" value={formData.regDate} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Insurance Policy No</label>
              <input type="text" name="insurancePolicy" value={formData.insurancePolicy} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Service Due Date</label>
              <input type="date" name="serviceDueDate" value={formData.serviceDueDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Purchase Date</label>
              <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Vendor Name</label>
              <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Vendor Contact No</label>
              <input type="text" name="vendorContact" value={formData.vendorContact} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>RC Number</label>
              <input type="text" name="rcNumber" value={formData.rcNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input type="text" name="type" value={formData.type} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Reg Place</label>
              <input type="text" name="regPlace" value={formData.regPlace} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Remarks</label>
              <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VehicleMasterAdd;
