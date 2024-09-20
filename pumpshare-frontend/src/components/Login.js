import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Initialize navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading screen
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password,
            });
            // Simulate a delay for the loading screen (e.g., 2 seconds)
            setTimeout(() => {
                setLoading(false);
                localStorage.setItem('token', response.data.token);
                navigate('/landing'); // Redirect to landing page after login
            }, 2000); // 2-second delay for loading screen
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {loading ? (
                <div className="loading-screen">
                    <p>Loading...</p> {/* Simple loading screen */}
                </div>
            ) : (
                <>
                    <h2>Log in to PumpShare</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="auth-button">Log In</button>
                        <p className="message">{message}</p>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;
