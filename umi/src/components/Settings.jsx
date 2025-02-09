import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    console.log("Settings Updated:", { username, email, theme });
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="settings-card">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        
        <div className="settings-card">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="settings-card">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
