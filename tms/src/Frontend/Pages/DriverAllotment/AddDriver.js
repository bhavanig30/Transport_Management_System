import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AddDriver.css";

const AddDriver = () => {

  const [formData, setFormData] = useState({
    vehicleid: "",
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

  const [vehicleIds, setVehicleIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleIds = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getVehicle");
            const vehicleIds = response.data.map(vehicle => vehicle.vehicleid); // Extract only vehicleId
            setVehicleIds(vehicleIds);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching vehicle IDs:", error);
            setError("Failed to fetch vehicle IDs. Please try again.");
            setLoading(false);
        }
    };
    fetchVehicleIds();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating FormData for file upload
    const data = new FormData();
    data.append("vehicleid", formData.vehicleid);
    data.append("staffcode", formData.staffcode);
    data.append("staffname", formData.staffname);
    data.append("doorno", formData.doorno);
    data.append("streetname", formData.streetname);
    data.append("city", formData.city);
    data.append("pincode", formData.pincode);
    data.append("state", formData.state);
    data.append("mobileno", formData.mobileno);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const response = await axios.post("http://localhost:5000/addDriver", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert(response.data.message);
          setFormData({
          vehicleid: "",
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
      }
    } catch (error) {
      console.error("Error adding driver:", error);
      setError("Failed to add driver. Please try again.");
    }
  };

  return (
    <>
      <div className="driver-form-container">
        <form className="driver-form" onSubmit={handleSubmit}>
          <div className="driver-title">Driver Allotment Form</div>

          <div className="driver-form-row">
            <div className="driver-form-group">
              <label htmlFor="staffcode">Staff Code</label>
              <input type="text" id="staffcode" name="staffcode" placeholder="Enter Staff Code" value={formData.staffcode} onChange={handleChange} required/>
            </div>
            <div className="driver-form-group">
              <label htmlFor="staffname">Staff Name</label>
              <input type="text" id="staffname" name="staffname" placeholder="Enter Staff Name" value={formData.staffname} onChange={handleChange} required/>
            </div>
          </div>

          <div className="driver-form-group">
              <label>Vehicle Id</label>
                  <select name="vehicleid" value={formData.vehicleid} onChange={handleChange} required>
                      <option value="">Select vehicleId</option>
                          {vehicleIds.map((route, index) => (
                             <option key={index} value={route}>{route}</option>
                            ))}
                    </select>
          </div>

          <div className="driver-form-row">
            <div className="driver-form-group">
              <label htmlFor="doorno">Door No</label>
              <input type="text" id="doorno" name="doorno" placeholder="Enter Door No" value={formData.doorno} onChange={handleChange} required/>
            </div>
            <div className="driver-form-group">
              <label htmlFor="streetname">Street Name</label>
              <input type="text" id="streetname" name="streetname" placeholder="Enter Street Name" value={formData.streetname} onChange={handleChange} required/>
            </div>
          </div>

          <div className="driver-form-row">
            <div className="driver-form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} required/>
            </div>
            <div className="driver-form-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" value={formData.pincode} onChange={handleChange} required/>
            </div>
          </div>

          <div className="driver-form-row">
            <div className="driver-form-group">
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} required/>
            </div>
            <div className="driver-form-group">
              <label htmlFor="mobileno">Mobile No</label>
              <input type="text" id="mobileno" name="mobileno" placeholder="Enter Mobile No" value={formData.mobileno} onChange={handleChange} required/>
            </div>
          </div>

          <div className="driver-form-group">
            <label htmlFor="photo">Upload Photo</label>
            <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required/>
          </div>

          <button type="submit" className="driver-submit-button">Add Driver</button>
        </form>
      </div>
      
    </>
  );
};

export default AddDriver;