import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const loc = useLocation();
  return (
    <div className="header">
      <h2>Mini IELTS Mock</h2>
      <div>
        <Link to="/test" className="btn secondary" style={{ marginRight: 8 }}>Test</Link>
        <Link to="/admin" className="btn">Admin</Link>
        {loc.pathname === '/result' && (
          <Link to="/test" className="btn secondary" style={{ marginLeft: 8 }}>Retake</Link>
        )}
      </div>
    </div>
  );
}