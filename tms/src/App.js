import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Frontend/pages/Home";
import VehicleMaster from "./Frontend/pages/VehicleMaster/VehicleMaster";
import Login from "./Frontend/pages/Login";
import AddStage from "./Frontend/pages/StageMaster/AddStage";
import AddRoute from "./Frontend/pages/RouteMaster/AddRoute";
import AddDriver from "./Frontend/pages/DriverAllotment/AddDriver";
import AddTraveller from "./Frontend/pages/TravellerAllotment/AddTraveller";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="vehiclemaster" element={<VehicleMaster />} />
          <Route path="addstage" element={<AddStage />} />
          <Route path="addroute" element={<AddRoute />} />
          <Route path="adddriver" element={<AddDriver />} />
          <Route path="addtraveller" element={<AddTraveller />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
