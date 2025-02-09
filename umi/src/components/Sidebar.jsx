import React, { useState } from 'react';
import { Link } from 'umi';
import { Menu } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="toggle-button"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} color="#00695c" />
      </button>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Unified Medical Interface</h2>
        </div>
        
        <nav className="sidebar-navigation">
          <ul className="sidebar-links">
            <li>
              <Link to="/">
                <span className="link-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/patients">
                <span className="link-text">Patients</span>
              </Link>
            </li>
            <li>
              <Link to="/doctors">
                <span className="link-text">Doctors</span>
              </Link>
            </li>
            <li>
              <Link to="/prescriptions">
                <span className="link-text">Prescriptions</span>
              </Link>
            </li>
            <li>
              <Link to="/appointments">
                <span className="link-text">Appointments</span>
              </Link>
            </li>
            <li>
              <Link to="/reports">
                <span className="link-text">Reports</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <span className="link-text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p>© 2025 UMI System</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;