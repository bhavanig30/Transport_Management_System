import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Frontend/Pages/Login";
import Home from "./Frontend/Pages/Home";
import VehicleMaster from "./Frontend/Pages/Vehicle Master/VehicleMaster";
import VehiclePermitForm from "./Frontend/Pages/VehiclePermitForm";
import VehicleMasterView from "./Frontend/Pages/Vehicle Master/VehicleMasterView";
import VehicleMasterAdd from "./Frontend/Pages/Vehicle Master/VehicleMasterAdd";


const App = () => {
  return (
    <VehicleMasterView />
  );
};

export default App;