import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBus, FaRoute, FaUserTie, FaUsers, FaSignOutAlt, FaMapMarkerAlt, 
  FaFileAlt, FaPlus, FaShieldAlt, FaClipboardCheck, FaCaretDown, FaCaretUp, FaDollarSign 
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

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showVehiclePermitDropdown, setShowVehiclePermitDropdown] = useState(false);
  const [showInsuranceDropdown, setShowInsuranceDropdown] = useState(false);
  const [showFCDropdown, setShowFCDropdown] = useState(false);
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [showDriverDropdown, setShowDriverDropdown] = useState(false);
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
  const [showCostDropdown, setShowCostDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (isLoggedIn) {
        navigate("/home", { replace: true });  
      }
    };

    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);  
    navigate("/", { replace: true });  
  };

  return (
    <div className="home-layout">
      <div className="home-header">
        <h1 className="home-header-title">National Engineering College</h1>
        <div className="live-clock">{time.toLocaleTimeString()}</div>
        <button className="logout-btn" onClick={handleLogout}> 
          <FaSignOutAlt className="logout-icon" />
        </button>
      </div>

      <div className="home-container">
        {/* Sidebar with Scroll */}
        <div className="sidebar">
          {/* Vehicle Master Dropdown */}
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}>
              <FaBus /> Vehicle Master {showVehicleDropdown ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {showVehicleDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewVehicle />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddVehicle />)}><FaPlus /> Add</button>
                
                {/* Nested Vehicle Master Dropdown */}
                <div className="sub-dropdown">
                  <div className="sub-dropdown-toggle" onClick={() => setShowVehiclePermitDropdown(!showVehiclePermitDropdown)}>
                    Vehicle Permit {showVehiclePermitDropdown ? <FaCaretUp /> : <FaCaretDown />}
                  </div>
                  {showVehiclePermitDropdown && (
                    <div className="sub-dropdown-menu">
                      <button onClick={() => setSelectedComponent(<ViewPermit />)}><FaFileAlt /> View</button>
                      <button onClick={() => setSelectedComponent(<AddPermit />)}><FaPlus /> Add</button>
                    </div>
                  )}

                  <div className="sub-dropdown-toggle" onClick={() => setShowInsuranceDropdown(!showInsuranceDropdown)}>
                    Insurance Details {showInsuranceDropdown ? <FaCaretUp /> : <FaCaretDown />}
                  </div>
                  {showInsuranceDropdown && (
                    <div className="sub-dropdown-menu">
                      <button onClick={() => setSelectedComponent(<ViewInsurance />)}><FaFileAlt /> View</button>
                      <button onClick={() => setSelectedComponent(<AddInsurance />)}><FaPlus /> Add</button>
                    </div>
                  )}

                  <div className="sub-dropdown-toggle" onClick={() => setShowFCDropdown(!showFCDropdown)}>
                    FC Details {showFCDropdown ? <FaCaretUp /> : <FaCaretDown />}
                  </div>
                  {showFCDropdown && (
                    <div className="sub-dropdown-menu">
                      <button onClick={() => setSelectedComponent(<ViewFC />)}><FaFileAlt /> View</button>
                      <button onClick={() => setSelectedComponent(<AddFC />)}><FaPlus /> Add</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stage Dropdown */}
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setShowStageDropdown(!showStageDropdown)}>
              <FaMapMarkerAlt /> Stage {showStageDropdown ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {showStageDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewStage />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddStage />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          {/* Route Dropdown */}
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setShowRouteDropdown(!showRouteDropdown)}>
              <FaRoute /> Route {showRouteDropdown ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {showRouteDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewRoute />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddRoute />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          {/* Driver Dropdown */}
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setShowDriverDropdown(!showDriverDropdown)}>
              <FaUserTie /> Driver {showDriverDropdown ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {showDriverDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewDriver />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddDriver />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          {/* Traveller Dropdown */}
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setShowTravellerDropdown(!showTravellerDropdown)}>
              <FaUsers /> Traveller {showTravellerDropdown ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {showTravellerDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewTraveller />)}><FaFileAlt /> View</button>
                <button onClick={() => setSelectedComponent(<AddTraveller />)}><FaPlus /> Add</button>
              </div>
            )}
          </div>

          {/* Cost Dropdown */}
          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setShowCostDropdown(!showCostDropdown)}>
              <FaDollarSign /> Cost {showCostDropdown ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {showCostDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => setSelectedComponent(<ViewCost />)}><FaFileAlt /> View</button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
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
