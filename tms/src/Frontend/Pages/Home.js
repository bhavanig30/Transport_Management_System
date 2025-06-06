import React from 'react';
import './Home.css';

const Home = () => {
    const handleClick = (page) => {
        alert(`Navigating to ${page}`);
    };

    return (
        <>
            <div className="home-header">
                <h1>National Engineering College</h1>
            </div>
            <div className="home-container">
                <div className="home-grid">
                    <div className="home-box" onClick={() => handleClick('Vehicle Master')}>Vehicle Master</div>
                    <div className="home-box" onClick={() => handleClick('Stage Master')}>Stage Master</div>
                    <div className="home-box" onClick={() => handleClick('Route Master')}>Route Master</div>
                    <div className="home-box" onClick={() => handleClick('Cost Master')}>Cost Master</div>
                    <div className="home-box" onClick={() => handleClick('Driver Allotment')}>Driver Allotment</div>
                    <div className="home-box" onClick={() => handleClick('Traveller Allotment')}>Traveller Allotment</div>
                </div>
            </div>
        </>
    );
};

export default Home;
