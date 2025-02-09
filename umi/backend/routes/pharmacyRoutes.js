// routes/pharmacyRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pharmacy = require('../models/Pharmacy');

// Function to get coordinates from address using Google Geocoding API
async function getCoordinates(address) {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        }
        throw new Error('Location not found');
    } catch (error) {
        throw new Error('Geocoding failed');
    }
}

// Get nearby pharmacies
router.get('/pharmacies', async (req, res) => {
    try {
        let { lat, lon, address } = req.query;

        // If address is provided instead of coordinates, geocode it
        if (address && !lat && !lon) {
            const coords = await getCoordinates(address);
            lat = coords.latitude;
            lon = coords.longitude;
        }

        // Convert string coordinates to numbers
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        // Validate coordinates
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Invalid coordinates' });
        }

        // Find nearby pharmacies within 5km radius
        const pharmacies = await Pharmacy.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    distanceField: 'distance',
                    maxDistance: 5000, // 5km in meters
                    spherical: true
                }
            },
            {
                $project: {
                    name: 1,
                    address: 1,
                    contact: 1,
                    email: 1,
                    timings: 1,
                    distance: { $divide: ['$distance', 1000] } // Convert distance to kilometers
                }
            }
        ]);

        res.json(pharmacies);
    } catch (error) {
        console.error('Error fetching pharmacies:', error);
        res.status(500).json({ error: 'Failed to fetch pharmacies' });
    }
});

// Add a new pharmacy
router.post('/pharmacies', async (req, res) => {
    try {
        const { name, address, contact, email, timings } = req.body;

        // Get coordinates for the pharmacy address
        const coords = await getCoordinates(address);

        const pharmacy = new Pharmacy({
            name,
            location: {
                type: 'Point',
                coordinates: [coords.longitude, coords.latitude]
            },
            address,
            contact,
            email,
            timings
        });

        await pharmacy.save();
        res.status(201).json(pharmacy);
    } catch (error) {
        console.error('Error adding pharmacy:', error);
        res.status(500).json({ error: 'Failed to add pharmacy' });
    }
});

module.exports = router;