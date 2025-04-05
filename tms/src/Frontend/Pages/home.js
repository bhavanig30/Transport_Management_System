import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBus, FaRoute, FaUserTie, FaUsers, FaSignOutAlt, FaMapMarkerAlt, 
  FaFileAlt, FaPlus, FaCaretDown, FaCaretUp, FaDollarSign 
} from "react-icons/fa";
import "../styles/Home.css";

import ViewVehicle from "./VehicleMaster/ViewVehicle";
import AddVehicle from "./VehicleMaster/AddVehicle";
import ViewPermit from "./VehicleMaster/PermitDetails/ViewPermit";
import AddPermit from "./VehicleMaster/PermitDetails/AddPermit";
import ViewInsurance from "./VehicleMaster/InsuranceDetails/ViewInsurance";
import AddInsurance from "./VehicleMaster/InsuranceDetails/AddInsurance";
import ViewFC from "./VehicleMaster/FCDetails/ViewFC";
import AddFC from "./VehicleMaster/FCDetails/AddFC";

import ViewStage from "./StageMaster/ViewStage";
import AddStage from "./StageMaster/AddStage";

import ViewRoute from "./RouteMaster/ViewRoute";
import AddRoute from "./RouteMaster/AddRoute";

import ViewDriver from "./DriverAllotment/ViewDriver";
import AddDriver from "./DriverAllotment/AddDriver";

import ViewTraveller from "./TravellerAllotment/ViewTraveller";
import AddTraveller from "./TravellerAllotment/AddTraveller";

import ViewCost from "./CostMaster/ViewCost";
import AddCost from "./CostMaster/AddCost";

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [dropdowns, setDropdowns] = useState({
    vehicle: false,
    permit: false,
    insurance: false,
    fc: false,
    stage: false,
    route: false,
    driver: false,
    traveller: false,
    cost: false
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDropdown = (key) => {
    setDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="home-layout">
      <div className="home-header">
        <h1 className="home-header-title">National Engineering College</h1>
        <div className="live-clock">{time.toLocaleTimeString()}</div>
        <button className="logout-btn" onClick={() => navigate("/")}> 
          <FaSignOutAlt className="logout-icon" />
        </button>
      </div>

      <div className="home-container">
        <div className="sidebar">
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => toggleDropdown("vehicle")}> <FaBus /> Vehicle Master {dropdowns.vehicle ? <FaCaretUp /> : <FaCaretDown />} </div>
            {dropdowns.vehicle && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewVehicle />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddVehicle />)}><FaPlus /> Add</button>

                <div className="sub-dropdown">
                  <div className="sub-dropdown-toggle" onClick={() => toggleDropdown("permit")}>Vehicle Permit {dropdowns.permit ? <FaCaretUp /> : <FaCaretDown />}</div>
                  {dropdowns.permit && (
                    <div className="sub-dropdown-menu">
                      <button onClick={() => setSelectedComponent(<ViewPermit />)}><FaFileAlt /> View</button>
                      <button onClick={() => setSelectedComponent(<AddPermit />)}><FaPlus /> Add</button>
                    </div>
                  )}

                  <div className="sub-dropdown-toggle" onClick={() => toggleDropdown("insurance")}>Insurance Details {dropdowns.insurance ? <FaCaretUp /> : <FaCaretDown />}</div>
                  {dropdowns.insurance && (
                    <div className="sub-dropdown-menu">
                      <button onClick={() => setSelectedComponent(<ViewInsurance />)}><FaFileAlt /> View</button>
                      <button onClick={() => setSelectedComponent(<AddInsurance />)}><FaPlus /> Add</button>
                    </div>
                  )}

                  <div className="sub-dropdown-toggle" onClick={() => toggleDropdown("fc")}>FC Details {dropdowns.fc ? <FaCaretUp /> : <FaCaretDown />}</div>
                  {dropdowns.fc && (
                    <div className="sub-dropdown-menu">
                      <button onClick={() => setSelectedComponent(<ViewFC />)}><FaFileAlt /> View</button>
                      <button onClick={() => setSelectedComponent(<AddFC />)}><FaPlus /> Add</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => toggleDropdown("stage")}><FaMapMarkerAlt /> Stage {dropdowns.stage ? <FaCaretUp /> : <FaCaretDown />}</div>
            {dropdowns.stage && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewStage />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddStage />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => toggleDropdown("route")}><FaRoute /> Route {dropdowns.route ? <FaCaretUp /> : <FaCaretDown />}</div>
            {dropdowns.route && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewRoute />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddRoute />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => toggleDropdown("driver")}><FaUserTie /> Driver {dropdowns.driver ? <FaCaretUp /> : <FaCaretDown />}</div>
            {dropdowns.driver && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewDriver />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddDriver />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => toggleDropdown("traveller")}><FaUsers /> Traveller {dropdowns.traveller ? <FaCaretUp /> : <FaCaretDown />}</div>
            {dropdowns.traveller && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewTraveller />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddTraveller />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => toggleDropdown("cost")}><FaDollarSign /> Cost {dropdowns.cost ? <FaCaretUp /> : <FaCaretDown />}</div>
            {dropdowns.cost && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewCost />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddCost />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>
        </div>

        <div className="content-area">
          {selectedComponent ? (
            <div className="form-container">{selectedComponent}</div>
          ) : (
            <div className="blog-container">
              <div className="blog-card"><FaBus className="blog-icon" /><h3>Total Buses</h3><p>25</p></div>
              <div className="blog-card"><FaRoute className="blog-icon" /><h3>Total Routes</h3><p>10</p></div>
              <div className="blog-card"><FaUsers className="blog-icon" /><h3>Students Traveling</h3><p>500</p></div>
              <div className="blog-card"><FaUserTie className="blog-icon" /><h3>Total Drivers</h3><p>15</p></div>
              <div className="blog-card"><FaMapMarkerAlt className="blog-icon" /><h3>Total Stages</h3><p>20</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
