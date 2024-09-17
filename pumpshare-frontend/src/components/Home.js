import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to PumpShare</h2>
            <p>Login if you already have an account or SignUp!</p>
            <div>
                <Link to='/login'>Login</Link> | <Link to='signup'>Signup</Link>
            </div>
        </div>
    )
}

export default Home;