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
import ViewPermit from "./Frontend/pages/VehicleMaster/PermitDetails/ViewPermit";
import AddInsurance from "./Frontend/pages/VehicleMaster/InsuranceDetails/AddInsurance";
import ViewInsurance from "./Frontend/pages/VehicleMaster/InsuranceDetails/ViewInsurance";
import AddFC from "./Frontend/pages/VehicleMaster/FCDetails/AddFC";
import ViewFC from "./Frontend/pages/VehicleMaster/FCDetails/ViewFC";
import Home from "./Frontend/pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* The Home route should act as a wrapper for child routes */}
        <Route path="/home" element={<Home />}>
          {/* Nested routes for the Home page */}
          <Route path="vehiclemaster" element={<VehicleMaster />} />
          <Route path="addstage" element={<AddStage />} />
          <Route path="addroute" element={<AddRoute />} />
          <Route path="adddriver" element={<AddDriver />} />
          <Route path="addtraveller" element={<AddTraveller />} />
          
          {/* Nested routes for Vehicle Master */}
          <Route path="vehiclemaster/viewvehicle" element={<ViewVehicle />} />
          <Route path="vehiclemaster/addvehicle" element={<AddVehicle />} />
          <Route path="vehiclemaster/addpermit" element={<AddPermit />} />
          <Route path="vehiclemaster/viewpermit" element={<ViewPermit />} />
          <Route path="vehiclemaster/addinsurance" element={<AddInsurance />} />
          <Route path="vehiclemaster/viewinsurance" element={<ViewInsurance />} />
          <Route path="vehiclemaster/addfc" element={<AddFC />} />
          <Route path="vehiclemaster/viewfc" element={<ViewFC />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
