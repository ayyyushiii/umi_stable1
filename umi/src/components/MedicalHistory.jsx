import React from 'react';
import '../styles/MedicalHistory.css';

const MedicalHistory = () => {
  return (
    <div className="medical-history">
      <h1>Your Medical History</h1>

      {/* Past Illnesses Card */}
      <div className="history-card">
        <h2>Past Illnesses</h2>
        <p><strong>Asthma</strong> - Diagnosed in 2015. Currently under control with an inhaler.</p>
        <p><strong>Chickenpox</strong> - Had in childhood (2005), no current symptoms.</p>
      </div>

      {/* Prescriptions Card */}
      <div className="history-card">
        <h2>Prescriptions</h2>
        <p><strong>Antihistamines</strong> - Used to manage seasonal allergies. Prescribed in 2022.</p>
        <p><strong>Ventolin Inhaler</strong> - For asthma, as needed. Prescribed in 2015.</p>
      </div>

      {/* Allergies Card */}
      <div className="history-card">
        <h2>Allergies</h2>
        <p><strong>Pollen</strong> - Seasonal allergy (spring and summer).</p>
        <p><strong>Penicillin</strong> - Severe reaction, documented in 2016.</p>
      </div>

      {/* Vaccinations Card */}
      <div className="history-card">
        <h2>Vaccinations</h2>
        <p><strong>COVID-19</strong> - Fully vaccinated with both doses of the Pfizer vaccine in 2021.</p>
        <p><strong>Flu Vaccine</strong> - Annual flu shot, last received in October 2024.</p>
      </div>

    </div>
  );
}

export default MedicalHistory;
