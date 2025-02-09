import React from 'react';
import ReactDOM from 'react-dom/client';  // Notice the change here
import App from './App';
import './styles/index.css';  // Optional: make sure this file exists

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot here
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

