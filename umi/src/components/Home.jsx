import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import JsBarcode from "jsbarcode";
import "../styles/Home.css";
import logo from "../images/logo.jpg";
import medicalhistory from "../images/medicalhistory.jpg";
import settings from "../images/settings.jpg";
import profile from "../images/profile.jpg";
import Registration from "../images/Registration.jpg";
import pharmacyIcon from "../images/pharmacy.png"; // Add pharmacy icon
import consultantIcon from "../images/talk.png"; // Add consultant icon

const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
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
    <div className="home">
      {/* Header Section */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Unified Medical Interface</h1>
      </header>

      {/* Today's Appointments Panel */}
      <div className="appointments-panel">
        <h2>Today's Appointments</h2>
        <p>You have 1 appointment today</p>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <Link to="/Pharmacies" className="card">
          <img src={pharmacyIcon} alt="Pharmacies" className="card-icon" />
          <h3>Pharmacies</h3>
        </Link>
        <Link to="/Consultants" className="card">
          <img src={consultantIcon} alt="Consultants" className="card-icon" />
          <h3>Consultants</h3>
        </Link>
      </div>

      {/* Sidebar Toggle */}
      <button className="sidebar-toggle" onClick={() => setSidebarVisible(!sidebarVisible)}>
        {sidebarVisible ? "yes" : "no"}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <ul>
          <li>
            <Link to="/Registration" className="nav-link">
              <img src={Registration} alt="Register" className="sidebar-icon" />
              <span>Register</span>
            </Link>
          </li>
          <li>
            <Link to="/Profile" className="nav-link">
              <img src={profile} alt="profile" className="sidebar-icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/MedicalHistory" className="nav-link">
              <img src={medicalhistory} alt="Medical History" className="sidebar-icon" />
              <span>Medical History</span>
            </Link>
          </li>
          <li>
            <Link to="/Settings" className="nav-link">
              <img src={settings} alt="Settings" className="sidebar-icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>

        {/* Barcode Section */}
        <div className="barcode-section">
          <h2>User Barcode</h2>
          <svg ref={barcodeRef}></svg>
        </div>
      </nav>

      {/* Chatbot Toggle */}
      <button className="chatbot-toggle" onClick={() => setChatOpen(!chatOpen)}>💬</button>

      {/* Chatbot Section */}
      {chatOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <span>DOC-O</span>
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>
          <div className="chatbot-body">
            <p>Hi! I'm DOC-O! How are you feeling today?</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;