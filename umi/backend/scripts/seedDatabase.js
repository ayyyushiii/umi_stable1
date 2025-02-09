// scripts/seedDatabase.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Pharmacy = require('../models/Pharmacy');

const samplePharmacies = [
    {
        name: "City Central Pharmacy",
        location: {
            type: "Point",
            coordinates: [-73.9857, 40.7484]  // Example: New York coordinates
        },
        address: "123 Main Street, New York, NY 10001",
        contact: "+1 (212) 555-0123",
        email: "city.central@pharmacy.com",
        timings: "8:00 AM - 10:00 PM"
    },
    {
        name: "HealthCare Pharmacy Plus",
        location: {
            type: "Point",
            coordinates: [-73.9841, 40.7494]  // Nearby location
        },
        address: "456 Park Avenue, New York, NY 10001",
        contact: "+1 (212) 555-0124",
        email: "healthcare@pharmacy.com",
        timings: "9:00 AM - 9:00 PM"
    },
    {
        name: "QuickMeds Pharmacy",
        location: {
            type: "Point",
            coordinates: [-73.9867, 40.7474]  // Another nearby location
        },
        address: "789 Broadway, New York, NY 10001",
        contact: "+1 (212) 555-0125",
        email: "quickmeds@pharmacy.com",
        timings: "24 hours"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing pharmacies
        await Pharmacy.deleteMany({});
        console.log('Cleared existing pharmacy data');

        // Insert sample pharmacies
        await Pharmacy.insertMany(samplePharmacies);
        console.log('Sample pharmacies inserted successfully');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();