import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true); // Set fade-in effect after the page loads
        }, 500); // Delay to apply the fade-in effect (optional)
    }, []);

    return (
        <div className="landing-container">
            <h1 className={`pump-title ${fadeIn ? 'fade-in' : ''}`}>PumpShare</h1>
        </div>
    );
};

export default LandingPage;
