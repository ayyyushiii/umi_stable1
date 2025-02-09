import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MedicalHistory from './components/MedicalHistory';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Registration from './components/Registration';
import PersonalDetails from './components/PersonalDetails';
import Pharmacies from './components/Pharmacies'; // Import Pharmacies component
import Consultants from './components/Consultants'; // Import Consultants component
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MedicalHistory" element={<MedicalHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/PersonalDetails" element={<PersonalDetails />} />
          <Route path="/Pharmacies" element={<Pharmacies />} /> {/* Add Pharmacies route */}
          <Route path="/Consultants" element={<Consultants />} /> {/* Add Consultants route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;