import React, { useState, useEffect } from "react";
import "../../styles/AddTraveller.css";
import axios from "axios";

const AddTraveller = () => {
    const [routeOptions, setRouteOptions] = useState([]);
    const [stageOptions, setStageOptions] = useState([]);
    const [travellerData, setTravellerData] = useState({
        name: "",
        rollno: "",
        designation: "",
        role: "",
        doorNo: "",
        street: "",
        place: "",
        branch: "",
        routeId: "",
        point: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/getRoute")
            .then(response => setRouteOptions(response.data))
            .catch(error => console.error("Error fetching routes:", error));
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Convert routeId to string to match DB varchar type
        if (name === "routeId") {
            value = String(value);
            axios.get(`http://localhost:5000/getStagesByRouteId?routeid=${value}`)
                .then(res => setStageOptions(res.data.stages))
                .catch(err => {
                    console.error("Error fetching stages:", err);
                    setStageOptions([]);
                });
        }

        setTravellerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/addTraveller", travellerData)
            .then(res => {
                alert("Traveller details submitted successfully!");
            })
            .catch(err => {
                console.error(err);
                alert("Error submitting details.");
            });
    };

    return (
        <div className="traveller-form-container">
            <form className="traveller-form" onSubmit={handleSubmit}>
                <h2 className="traveller-title">Traveller Allotment</h2>

                <div className="traveller-form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={travellerData.name} onChange={handleChange} required />
                </div>

                <div className="traveller-form-group">
                    <label>Roll Number</label>
                    <input type="text" name="rollno" value={travellerData.rollno} onChange={handleChange} required />
                </div>

                <div className="traveller-form-group">
                    <label>Role</label>
                    <select name="role" value={travellerData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>

                <div className="traveller-form-group">
                    <label>Branch</label>
                    <input type="text" name="branch" value={travellerData.branch} onChange={handleChange} required />
                </div>

                <div className="traveller-form-group">
                    <label>Door No</label>
                    <input type="text" name="doorNo" value={travellerData.doorNo} onChange={handleChange} required />
                </div>

                <div className="traveller-form-group">
                    <label>Street</label>
                    <input type="text" name="street" value={travellerData.street} onChange={handleChange} required />
                </div>

                <div className="traveller-form-group">
                    <label>Place</label>
                    <select name="place" value={travellerData.place} onChange={handleChange} required>
                        <option value="">Select City</option>
                        <option value="Kovilpatti">Kovilpatti</option>
                        <option value="Thoothukudi">Thoothukudi</option>
                        <option value="Tirunelveli">Tirunelveli</option>
                        <option value="Sattur">Sattur</option>
                        <option value="Virudhunagar">Virudhunagar</option>
                        <option value="Vilathikulam">Vilathikulam</option>
                        <option value="Sivakasi">Sivakasi</option>
                        <option value="Kayathar">Kayathar</option>
                        <option value="Sankarakovil">Sankarakovil</option>
                        <option value="Kalugumali">Kalugumali</option>
                    </select>
                </div>

                <div className="traveller-form-group">
                    <label>Route ID</label>
                    <select name="routeId" value={travellerData.routeId} onChange={handleChange} required>
                        <option value="">Select Route</option>
                        {routeOptions.map((route, index) => (
                            <option key={index} value={String(route.routeid)}>
                                {route.routeid}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="traveller-form-group">
                    <label>Point (Stage)</label>
                    <select name="point" value={travellerData.point} onChange={handleChange} required>
                        <option value="">Select Stage</option>
                        {stageOptions.map((stage, idx) => (
                            <option key={idx} value={stage}>{stage}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="traveller-submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddTraveller;
