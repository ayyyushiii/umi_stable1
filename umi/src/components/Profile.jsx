import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import '../styles/Profile.css';
import profile from '../images/profile.jpg';

const Profile = () => {
  const barcodeRef = useRef(null);
  const userId = "123456789"; // Replace with a dynamic user ID

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, userId, {
        format: "CODE128",
        displayValue: true,
        lineColor: "#000",
        width: 2,
        height: 50,
      });
    }
  }, [userId]);

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-picture">
          <img 
            src={profile} 
            alt="Profile" 
            className="profile-img" 
          />
        </div>
        
        {/* Basic Information */}
        <div className="profile-info">
          <h2>Basic Information</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Age:</strong> 29</p>
        </div>

        {/* Contact Information */}
        <div className="profile-info">
          <h2>Contact Information</h2>
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Address:</strong> 123 Main Street, City, Country</p>
        </div>

        {/* Barcode Section */}
        <div className="profile-barcode">
          <h2>User Barcode</h2>
          <svg ref={barcodeRef}></svg>
        </div>

        {/* Settings */}
        <div className="profile-settings">
          <h2>Settings</h2>
          <button className="edit-button">Edit Profile</button>
          <button className="logout-button">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
