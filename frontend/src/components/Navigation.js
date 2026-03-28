import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ stats }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛡️ XDR Platform
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/alerts" className="nav-link">
              Alerts {stats && <span className="alert-badge">{stats.open_count}</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/incidents" className="nav-link">Incidents</Link>
          </li>
          <li className="nav-item">
            <Link to="/rules" className="nav-link">Rules</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;