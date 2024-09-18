import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        const container = document.querySelector('.home-container');
        container.classList.add('fade-in');
    }, []);

    return (
        <div className="home-container">
            <h2>Welcome to GasShare</h2>
            <div className="auth-options">
                <button className="auth-button">
                    <a href="/login">Log In</a>
                </button>
                <button className="auth-button">
                    <a href="/signup">Sign Up</a>
                </button>
            </div>
        </div>
    );
};

export default Home;