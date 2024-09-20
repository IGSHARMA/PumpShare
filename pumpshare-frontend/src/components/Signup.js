import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    console.log('Signup component loaded');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                name,
                email,
                password,
            });
            setMessage(`Welcome ${response.data.user.name}! Signup successful.`);
        } catch (error) {
            setMessage('Error during signup. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button type="submit" className="auth-button">Sign Up</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
};

export default Signup;
