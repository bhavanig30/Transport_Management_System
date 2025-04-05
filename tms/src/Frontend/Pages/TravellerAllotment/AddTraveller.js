import React, { useState } from "react";
import "../../styles/AddTraveller.css";

const AddTraveller = () => {
    const [travellerData, setTravellerData] = useState({
        name: "",
        rollno: "",
        designation: "",
        pickupPoint: "",
        dropPoint: ""
    });

    // Placeholder stage names (will be fetched from the database later)
    const stageOptions = ["Stage 1", "Stage 2"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTravellerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Traveller Allotment Details:", travellerData);
        alert("Traveller details submitted successfully!");
    };

    return (
        <div className="traveller-form-container">
            <form className="traveller-form" onSubmit={handleSubmit}>
                <h2 className="traveller-title">Traveller Allotment</h2>

                <div className="traveller-form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={travellerData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="traveller-form-group">
                    <label>Roll Number</label>
                    <input
                        type="text"
                        name="rollno"
                        value={travellerData.rollno}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="traveller-form-group">
                    <label>Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={travellerData.designation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="traveller-form-group">
                    <label>Pickup Point</label>
                    <select
                        name="pickupPoint"
                        value={travellerData.pickupPoint}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Pickup Stage</option>
                        {stageOptions.map((stage, index) => (
                            <option key={index} value={stage}>{stage}</option>
                        ))}
                    </select>
                </div>

                <div className="traveller-form-group">
                    <label>Drop Point</label>
                    <select
                        name="dropPoint"
                        value={travellerData.dropPoint}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Drop Stage</option>
                        {stageOptions.map((stage, index) => (
                            <option key={index} value={stage}>{stage}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="traveller-submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTraveller;