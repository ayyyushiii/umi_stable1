import React, { useState, useEffect } from "react";
import "../styles/Pharmacies.css";

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get user's current location automatically (silently)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          // Silently handle location access denial or failure
          console.log("Location access denied or failed.");
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  // Handle search by entered location
  const handleSearch = async () => {
    if (!searchQuery && !userLocation) {
      setError("Please enter your location or allow access to your current location.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let lat, lon;

      if (searchQuery) {
        // Convert entered location to coordinates using a geocoding API
        const geocodingResponse = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            searchQuery
          )}&key=YOUR_OPENCAGE_API_KEY`
        );
        const geocodingData = await geocodingResponse.json();

        if (geocodingData.results.length === 0) {
          throw new Error("Invalid location. Please try again.");
        }

        lat = geocodingData.results[0].geometry.lat;
        lon = geocodingData.results[0].geometry.lng;
      } else {
        // Use user's current location
        lat = userLocation.latitude;
        lon = userLocation.longitude;
      }

      // Fetch pharmacies based on coordinates
      const response = await fetch(
        `http://localhost:5000/api/pharmacies?lat=${lat}&lon=${lon}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pharmacies.");
      }
      const data = await response.json();
      setPharmacies(data);
    } catch (err) {
      setError(err.message || "Failed to fetch pharmacies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pharmacies-page">
      <h1>Find Pharmacies Near You</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter your location (e.g., city, address, or postal code)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Find Pharmacies"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="pharmacies-list">
        {pharmacies.length > 0 ? (
          pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="pharmacy-card">
              <h2>{pharmacy.name}</h2>
              <p><strong>Distance:</strong> {pharmacy.distance} km</p>
              <p><strong>Timings:</strong> {pharmacy.timings}</p>
              <p><strong>Contact:</strong> {pharmacy.contact}</p>
              <p><strong>Email:</strong> {pharmacy.email}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No pharmacies found near you.</p>
        )}
      </div>
    </div>
  );
};

export default Pharmacies;