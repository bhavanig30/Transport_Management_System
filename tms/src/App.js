import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Frontend/Pages/Login";
<<<<<<< HEAD
import FCForm from "./Frontend/Pages/FC";
import TransactionDetails from "./Frontend/Pages/Transaction Details";
import VehiclePermitForm from "./Frontend/Pages/VehiclePermitForm";
import DriverAllotmentForm from "./Frontend/Pages/DriverAllotment";
import TravellerAllotment from "./Frontend/Pages/TravellerAllotment";
import StageMasterForm from "./Frontend/Pages/StageMaster";
import RouteMasterForm from "./Frontend/Pages/RouteMaster";
import InsuranceForm from "./Frontend/Pages/InsuranceDetails";
import Home from "./Frontend/Pages/Home";
import VehicleMaster from "./Frontend/Pages/VehicleMaster";

function App() {
  return (
    <div>
      <VehicleMaster/>
    </div>
  );
}
=======
import Home from "./Frontend/Pages/home";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
>>>>>>> 7d9ee86935f00b6995ffc024a3c8575e10672fdc

