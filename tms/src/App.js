import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Frontend/Pages/Login";
import Home from "./Frontend/Pages/Home";
import VehicleMaster from "./Frontend/Pages/VehicleMaster";
import VehiclePermitForm from "./Frontend/Pages/VehiclePermitForm";


const App = () => {
  return (
    <VehiclePermitForm />
  );
};

export default App;