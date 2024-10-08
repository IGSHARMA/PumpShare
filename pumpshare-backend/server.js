const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fuelCostRoute = require('./routes/fuelCost')

// Initialize environment variables
dotenv.config();

// Set up express app
const app = express();
app.use(express.json());
app.use(cors()); // Allow requests from frontend

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes)

app.use('/api/fuel', fuelCostRoute);

// Listen on Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
