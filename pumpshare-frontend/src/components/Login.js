import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    console.log('Login component loaded');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password,
            });
            setMessage(`Welcome back, ${response.data.user.name}!`);
            // Store the JWT token in local storage or state
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Log In</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;