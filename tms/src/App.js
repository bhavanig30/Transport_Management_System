import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Frontend/Pages/Login";
import VehicleMasterAdd from "./Frontend/Pages/Vehicle Master/VehicleMasterAdd"
import RouteMasterForm from "./Frontend/Pages/RouteMaster/RouteMasterAdd"
import StageMasterForm from "./Frontend/Pages/StageMaster";

const App = () => {
  return (
    <StageMasterForm/>
  );
};

export default App;
