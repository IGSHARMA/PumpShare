import React from 'react';
import { BrowserRouter as Router, Form, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <h1>GasShare App</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;