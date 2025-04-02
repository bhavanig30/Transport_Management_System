// import React, { useState } from "react";
// // import "../../styles/AddTraveller.css";

// const AddTraveller = () => {
//     const [travellerData, setTravellerData] = useState({
//         name: "",
//         rollno: "",
//         designation: "",
//         pickupPoint: "",
//     });

//     // Placeholder stage names (will be fetched from the database later)
//     const stageOptions = ["Stage 1", "Stage 2"];

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTravellerData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Traveller Allotment Details:", travellerData);
//         alert("Traveller details submitted successfully!");
//     };

//     return (
//         <>
//             <div className="traveller-form-container">
//                 <form className="traveller-form" onSubmit={handleSubmit}>
//                     <h2 className="traveller-title">Traveller Allotment</h2>

//                     <div className="traveller-form-group">
//                         <label>Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={travellerData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="traveller-form-group">
//                         <label>Roll Number</label>
//                         <input
//                             type="text"
//                             name="rollno"
//                             value={travellerData.rollno}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="traveller-form-group">
//                         <label>Designation</label>
//                         <input
//                             type="text"
//                             name="designation"
//                             value={travellerData.designation}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="traveller-form-group">
//                         <label>Pickup Point</label>
//                         <select
//                             name="pickupPoint"
//                             value={travellerData.pickupPoint}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select Pickup Stage</option>
//                             {stageOptions.map((stage, index) => (
//                                 <option key={index} value={stage}>{stage}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="traveller-form-group">
//                     <label>Drop Point</label>
//                         <select
//                             name="dropPoint"
//                             value={travellerData.dropPoint}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select Drop Stage</option>
//                             {stageOptions.map((stage, index) => (
//                                 <option key={index} value={stage}>{stage}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <button type="submit" className="traveller-submit-button">
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddTraveller;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "../../styles/AddTraveller.css";

const AddTraveller = () => {
  const [role, setRole] = useState('');
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [fee, setFee] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getRoutes')
      .then(res => setRoutes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRouteChange = (routeId) => {
    setSelectedRoute(routeId);
    setSelectedStage('');
    setFee('');
    axios.get(`http://localhost:3001/getStages/${routeId}`)
      .then(res => setStages(res.data))
      .catch(err => console.error(err));
  };

  const handleStageChange = (stageId) => {
    setSelectedStage(stageId);
    setFee('');
    if (role === 'student') {
      axios.get(`http://localhost:3001/getFees/${selectedRoute}/${stageId}`)
        .then(res => setFee(res.data.fee))
        .catch(err => console.error(err));
    }
  };

  const handleAddTraveller = () => {
    if (!role || !selectedRoute || !selectedStage || !name || !id || !contact || !email || !address) {
      alert('Please fill all fields');
      return;
    }

    const travellerData = {
      role,
      name,
      id,
      contact,
      email,
      address,
      routeId: selectedRoute,
      stageId: selectedStage,
      ...(role === 'student' && { fee })
    };

    axios.post('http://localhost:3001/addTraveller', travellerData)
      .then(() => alert('Traveller added successfully'))
      .catch(err => alert(err.response.data));
  };

  return (
    <div className="container">
      <h1>Traveller Registration</h1>

      {/* Personal Information */}
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>ID: </label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>

      <div>
        <label>Contact Number: </label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
      </div>

      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Address: </label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      {/* Role Selection */}
      <div>
        <label>Role: </label>
        <select value={role} onChange={(e) => { setRole(e.target.value); setFee(''); }}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {/* Route Selection */}
      <div>
        <label>Route: </label>
        <select value={selectedRoute} onChange={(e) => handleRouteChange(e.target.value)}>
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route.routeid} value={route.routeid}>
              {route.routename}
            </option>
          ))}
        </select>
      </div>

      {/* Stage Selection */}
      <div>
        <label>Stage: </label>
        <select value={selectedStage} onChange={(e) => handleStageChange(e.target.value)}>
          <option value="">Select Stage</option>
          {stages.map((stage) => (
            <option key={stage.stageid} value={stage.stageid}>
              {stage.stagename}
            </option>
          ))}
        </select>
      </div>

      {/* Fee Display */}
      {role === 'student' && (
        <div>
          <label>Fee: </label>
          <input type="text" value={fee} readOnly />
        </div>
      )}

      {/* Add Button */}
      <button onClick={handleAddTraveller}>Add Traveller</button>
    </div>
  );
}

export default AddTraveller;