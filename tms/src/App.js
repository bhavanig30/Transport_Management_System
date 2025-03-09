import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Frontend/pages/Login";
import VehicleMaster from "./Frontend/pages/VehicleMaster/VehicleMaster";
import Home from "./Frontend/pages/Home";
import AddVehicle from "./Frontend/pages/VehicleMaster/AddVehicle"
import ViewVehicle from "./Frontend/pages/VehicleMaster/ViewVehicle"
import AddFC from "./Frontend/pages/VehicleMaster/FCDetails/AddFC"
import AddPermit from "./Frontend/pages/VehicleMaster/PermitDetails/AddPermit"
import AddRoute from "./Frontend/pages/RouteMaster/AddRoute"
import AddStage from "./Frontend/pages/StageMaster/AddStage"
import AddTraveller from "./Frontend/pages/TravellerAllotment/AddTraveller"
import AddDriver from "./Frontend/pages/DriverAllotment/AddDriver"
import AddInsurance from "./Frontend/pages/VehicleMaster/InsuranceDetails/AddInsurance";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/vehiclemaster" element={<VehicleMaster />} />
        <Route path="/home/vehiclemaster/addvehicle" element={<AddVehicle />} />
        <Route path="/home/vehiclemaster/viewvehicle" element={<ViewVehicle />} />
        <Route path="/home/vehiclemaster/addfc" element={<AddFC/>}/>
        <Route path="/home/vehiclemaster/addpermit" element={<AddPermit/>}/>
        <Route path="/home/routemaster/addroute" element={<AddRoute />} />
        <Route path="/home/stagemaster/addstage" element={<AddStage />} />
        <Route path="/home/travellerallotment/addtraveller" element={<AddTraveller />} />
        <Route path="/home/driverallotment/adddriver" element={<AddDriver />} />
        <Route path="/home/vehiclemaster/addinsurance" element={<AddInsurance />} />
      </Routes>
    </Router>
  );
};

export default App;