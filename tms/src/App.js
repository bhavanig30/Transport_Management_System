import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleMaster from "./Frontend/pages/VehicleMaster/VehicleMaster";
import Login from "./Frontend/pages/Login";
import AddStage from "./Frontend/pages/StageMaster/AddStage";
import AddRoute from "./Frontend/pages/RouteMaster/AddRoute";
import AddDriver from "./Frontend/pages/DriverAllotment/AddDriver";
import AddTraveller from "./Frontend/pages/TravellerAllotment/AddTraveller";
import ViewVehicle from "./Frontend/pages/VehicleMaster/ViewVehicle";
import AddVehicle from "./Frontend/pages/VehicleMaster/AddVehicle";
import AddPermit from "./Frontend/pages/VehicleMaster/PermitDetails/AddPermit";
import AddInsurance from "./Frontend/pages/VehicleMaster/InsuranceDetails/AddInsurance";
import AddFC from "./Frontend/pages/VehicleMaster/FCDetails/AddFC";
import Home from "./Frontend/pages/Home";

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
        
        <Route path="/home/vehiclemaster/viewvehicle" element={<ViewVehicle />} />
        <Route path="/home/vehiclemaster/addvehicle" element={<AddVehicle />}/>
        <Route path="/home/vehiclemaster/addpermit" element={<AddPermit />} />
        <Route path="/home/vehiclemaster/addinsurance" element={<AddInsurance/>} />
        <Route path="/home/vehiclemaster/addfc" element={<AddFC  />} />

      </Routes>
    </Router>
  );
};

export default App;
