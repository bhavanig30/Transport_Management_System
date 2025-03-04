import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (page) => {
    switch (page) {
      case 'Vehicle Master':
        navigate('/vehicle-master');
        break;
      case 'Stage Master':
        navigate('/stage-master');
        break;
      case 'Route Master':
        navigate('/route-master');
        break;
      case 'Cost Master':
        navigate('/cost-master');
        break;
      case 'Driver Allotment':
        navigate('/driver-allotment');
        break;
      case 'Traveller Allotment':
        navigate('/traveller-allotment');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="home-header">
        <h1>National Engineering College</h1>
      </div>
      <div className="home-container">
        <div className="home-grid">
          <div className="home-box" onClick={() => handleClick('Vehicle Master')}>
            Vehicle Master
          </div>
          <div className="home-box" onClick={() => handleClick('Stage Master')}>
            Stage Master
          </div>
          <div className="home-box" onClick={() => handleClick('Route Master')}>
            Route Master
          </div>
          <div className="home-box" onClick={() => handleClick('Cost Master')}>
            Cost Master
          </div>
          <div className="home-box" onClick={() => handleClick('Driver Allotment')}>
            Driver Allotment
          </div>
          <div className="home-box" onClick={() => handleClick('Traveller Allotment')}>
            Traveller Allotment
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
