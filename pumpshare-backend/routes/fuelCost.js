const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to get car MPG from FuelEconomy API
async function getCarMPG(make, model, year) {
    try {
        const response = await axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`);
        const vehicleOptions = response.data.menuItem;
        if (vehicleOptions && vehicleOptions.length > 0) {
            const vehicleId = vehicleOptions[0].value;  // Get the first vehicle option's ID
            const vehicleDetails = await axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`);
            const mpg = vehicleDetails.data.comb08;  // `comb08` is the combined MPG for city/highway driving
            return mpg;
        }
        return null;
    } catch (error) {
        console.log('Error fetching car MPG', error);
        return null;
    }
}

// Function to get trip distance from Google Distance Matrix API
async function getTripDistance(origin, destination) {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyCHFcj5wrN6pM9R2yAt7rwCdswz0Vp4YdE`
        );
        const distanceInMeters = response.data.rows[0].elements[0].distance.value;
        const distanceInMiles = distanceInMeters / 1609.34;  // Convert meters to miles
        console.log(`Distance: ${distanceInMiles}`);  // Use backticks for template literals
        return distanceInMiles;
    } catch (error) {
        console.error('Error fetching trip distance:', error);
        return null;
    }
}

async function getGasPrice(state) {
    try {
        const response = await axios.get(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=${state}`, {
            headers: {
                'authorization': 'apikey 2A9pqXrJ8u4jE9CROrFU3F:0y82zNoh66jXL2nUnwaeeJ',  // Replace with your CollectAPI key
                'content-type': 'application/json'
            }
        });

        if (response.data.success) {
            const gasPrices = response.data.result.state;  // Extracts the gas prices
            console.log('Gas Prices:', gasPrices);
            return parseFloat(gasPrices.gasoline);  // Returns regular gas price as a float
        } else {
            console.error('Error fetching gas prices from CollectAPI');
            return 3.50;  // Fallback price
        }
    } catch (error) {
        console.error('Error fetching gas prices:', error);
        return 3.50;  // Return a fallback price if API fails
    }
}

// POST route to calculate trip fuel cost
router.post('/calculate-trip-cost', async (req, res) => {
    const { make, model, year, origin, destination } = req.body;

    try {
        const mpg = await getCarMPG(make, model, year);
        if (!mpg) {
            return res.status(400).json({ error: "Unable to find MPG for the specified car." });
        }
        const distance = await getTripDistance(origin, destination);
        if (!distance) {
            return res.status(400).json({ error: 'Unable to calculate trip distance.' });
        }

        const gasPrice = await getGasPrice(origin);
        const gallonsUsed = distance / mpg;
        const fuelCost = gallonsUsed * gasPrice;

        console.log(`MPG: ${mpg}, Distance: ${distance}, Gas Price: ${gasPrice}, Gallons Used: ${gallonsUsed}`);
        return res.status(200).json({ fuelCost: fuelCost.toFixed(2) });
    } catch (error) {
        console.error('Error calculating trip cost:', error);
        res.status(500).json({ error: 'An error occurred while calculating the trip cost.' });
    }
});

module.exports = router;