import React, { useState } from "react";
import "./VehicleMasterAdd.css";

const VehicleMasterAdd = () => {
    const [vehicleData, setVehicleData] = useState({
        vendorId: "",
        vehicleId: "",
        vehicleType: "",
        seatCapacity: "",
        regNo: "",
        routeId: "",
        regDate: "",
        purchaseDate: "",
        rcNo: "",
        regPlace: "",
    });

    const vehicleTypeOptions = ["A/C", "Non-A/C"];
    const routeOptions = ["R001", "R002", "R003", "R004", "R005", "R006", "R007", "R008", "R009", "R010"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Vehicle Master Details:", vehicleData);
        alert("Vehicle details submitted successfully!");
    };

    return (
        <div className="vehicle-page">
            <header className="vehicle-header">National Engineering College</header>
            
            <div className="vehicle-form-container">
                {/* Main Title */}
                <h2 className="vehicle-main-title">VEHICLE MASTER</h2>
                
                {/* View Title (Added Similar to View Page) */}
                <div className="vehicle-title">ADD</div>

                <form className="vehicle-form" onSubmit={handleSubmit}>
                    <div className="vehicle-form-grid">
                        <div className="vehicle-form-group">
                            <label>Vehicle ID</label>
                            <input type="text" name="vehicleId" value={vehicleData.vehicleId} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>Vehicle Type</label>
                            <select name="vehicleType" value={vehicleData.vehicleType} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                {vehicleTypeOptions.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="vehicle-form-group">
                            <label>Seat Capacity</label>
                            <input type="number" name="seatCapacity" value={vehicleData.seatCapacity} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>Registration Number</label>
                            <input type="text" name="regNo" value={vehicleData.regNo} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>Route ID</label>
                            <select name="routeId" value={vehicleData.routeId} onChange={handleChange} required>
                                <option value="">Select Route</option>
                                {routeOptions.map((route, index) => (
                                    <option key={index} value={route}>{route}</option>
                                ))}
                            </select>
                        </div>
                        <div className="vehicle-form-group">
                            <label>Vendor ID</label>
                            <input type="text" name="vendorId" value={vehicleData.vendorId} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>Registration Date</label>
                            <input type="date" name="regDate" value={vehicleData.regDate} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>Purchase Date</label>
                            <input type="date" name="purchaseDate" value={vehicleData.purchaseDate} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>RC Number</label>
                            <input type="text" name="rcNo" value={vehicleData.rcNo} onChange={handleChange} required />
                        </div>

                        <div className="vehicle-form-group">
                            <label>Registration Place</label>
                            <input type="text" name="regPlace" value={vehicleData.regPlace} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="vehicle-submit-button">Add Vehicle</button>
                </form>
            </div>
        </div>
    );
};

export default VehicleMasterAdd;
