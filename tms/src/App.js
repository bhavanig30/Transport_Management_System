import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Frontend/Pages/Login";
import VehicleMaster from "./Frontend/Pages/Vehicle Master/VehicleMaster";
import VehicleMasterAdd from "./Frontend/Pages/Vehicle Master/VehicleMasterAdd";
import VehicleMasterView from "./Frontend/Pages/Vehicle Master/VehicleMasterView";
import RouteMasterForm from "./Frontend/Pages/RouteMaster/RouteMasterAdd";
import StageMasterForm from "./Frontend/Pages/StageMaster";
import FCForm from "./Frontend/Pages/Vehicle Master/FC";
import PermitForm from "./Frontend/Pages/Vehicle Master/VehiclePermitForm";
import Home from "./Frontend/Pages/Home";
import TravellerAllotment from "./Frontend/Pages/TravellerAllotment";
import DriverAllotmentForm from "./Frontend/Pages/DriverAllotment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/vehicle-master" element={<VehicleMaster />} />
        <Route path="/vehicle-master/add" element={<VehicleMasterAdd />} />
        <Route path="/vehicle-master/view" element={<VehicleMasterView />} />
        <Route path="/vehicle-master/fc" element={<FCForm/>}/>
        <Route path="/vehicle-master/permit" element={<PermitForm/>}/>
        <Route path="/route-master" element={<RouteMasterForm />} />
        <Route path="/stage-master" element={<StageMasterForm />} />
        <Route path="/home/traveller-allotment" element={<TravellerAllotment />} />
        <Route path="/home/driver-allotment" element={<DriverAllotmentForm />} />
      </Routes>
    </Router>
  );
};

export default App;