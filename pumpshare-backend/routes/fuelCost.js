const express = require('express');
const axios = require('axios');
const router = express.Router();

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


async function getTripDistance(origin, destination) {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyCHFcj5wrN6pM9R2yAt7rwCdswz0Vp4YdE`
        );
        const distanceInMeters = response.data.rows[0].elements[0].distance.value;
        const distanceInMiles = distanceInMeters / 1609.34;
        console.log('Distance: ${distanceInMiles}')
        return distanceInMiles;
    } catch (error) {
        console.error('Error fetching trip distance:', error);
        return null;
    }
}

async function getGasPrice(location) {
    try {
        const response = await axios.get(
            `https://www.fuelapi.com/api/v1/json/price?location=${location}&apikey=YOUR_FUELAPI_KEY`
        );
        const gasPrice = response.data.price;  // Assuming API returns gas price in "price"
        console.log('Gas Price: ${gasPrice}')
        return gasPrice;
    } catch (error) {
        console.error('Error fetching gas prices:', error);
        return 3.50;  // Return a fallback price if API fails
    }
}

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
        return res.status(200).json({ fuelCost: fuelCost.toFixed(2) });
    } catch (error) {
        console.error('Error calculating trip cost:', error);
        res.status(500).json({ error: 'An error occurred while calculating the trip cost.' });
    }
});

module.exports = router;