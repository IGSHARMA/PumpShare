import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './LandingPage.css';

const LandingPage = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const [floatUp, setFloatUp] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const containerStyle = {
        width: '100%',
        height: '400px',  // Adjust the height as necessary
    };

    const center = {
        lat: 37.7749,  // Default latitude (San Francisco, adjust as needed)
        lng: -122.4194,  // Default longitude
    };

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 500);

        setTimeout(() => {
            setFloatUp(true);
        }, 2500);

        setTimeout(() => {
            setShowContent(true);
        }, 4500);
    }, []);

    return (
        <div className="landing-container">
            <h1 className={`pump-title ${fadeIn ? 'fade-in' : ''} ${floatUp ? 'float-up-fixed' : ''}`}>
                PumpShare
            </h1>
            {showContent && (
                <div className="app-content">
                    <h2>Welcome to the PumpShare Application</h2>
                    <p>This is where the rest of your application content will load in.</p>

                    {/* Google Map Integration */}
                    <LoadScript googleMapsApiKey="AIzaSyCHFcj5wrN6pM9R2yAt7rwCdswz0Vp4YdE">  {/* Add your API Key here */}
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            {/* Additional map features (markers, etc.) can be added here */}
                        </GoogleMap>
                    </LoadScript>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
