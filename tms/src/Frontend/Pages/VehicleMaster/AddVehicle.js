import React, { useState } from "react";
import axios from "axios";  // Import Axios
import "../../styles/AddVehicle.css";

const AddVehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        vehicleType: "",
        seatCapacity: "",
        registrationNo: "",
        routeId: "",
        vendorId: "",
        registrationDate: "",
        purchaseDate: "",
        rcNo: "",
        registrationPlace: "",
    });

    const vehicleTypeOptions = ["A/C", "Non-A/C"];
    const routeOptions = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/addVehicle", vehicleData); // Adjust backend URL if needed
            alert(response.data.message);
            setVehicleData({ // Reset form after successful submission
                vendorId: "",
                vehicleType: "",
                seatCapacity: "",
                registrationNo: "",
                routeId: "",
                registrationDate: "",
                purchaseDate: "",
                rcNo: "",
                registrationPlace: "",
            });
        } catch (error) {
            console.error("Error adding vehicle:", error);
            alert("Failed to add vehicle. Please try again.");
        }
    };

    return (
        <div className="vehicle-page">
            <header className="vehicle-header">National Engineering College</header>

            <div className="vehicle-form-container">
                <h2 className="vehicle-main-title">VEHICLE MASTER</h2>
                <div className="vehicle-title">ADD</div>

                <form className="vehicle-form" onSubmit={handleSubmit}>
                    <div className="vehicle-form-grid">
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
                            <input type="text" name="registrationNo" value={vehicleData.registrationNo} onChange={handleChange} required />
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
                            <input type="date" name="registrationDate" value={vehicleData.registrationDate} onChange={handleChange} required />
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
                            <input type="text" name="registrationPlace" value={vehicleData.registrationPlace} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="vehicle-submit-button">Add Vehicle</button>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;
