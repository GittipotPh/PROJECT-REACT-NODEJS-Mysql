import React from 'react';
import { Link } from 'react-router-dom';

const MainAdmin = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Admin Dashboard</h1>

      {/* Navigation Links */}
      <div style={navigationStyle}>
        <Link to="/admin/users" style={linkStyle}>
          <button style={buttonStyle}>Manage Users</button>
        </Link>
        <Link to="/admin/banners" style={linkStyle}>
          <button style={buttonStyle}>Manage Banners</button>
        </Link>
      </div>

      {/* You can include other content or components here */}
    </div>
  );
};

const containerStyle = {
  backgroundColor: '#f4f4f4',
  padding: '20px',
  margin: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const headerStyle = {
  marginBottom: '20px',
};

const navigationStyle = {
  display: 'flex',
  gap: '10px',
};

const linkStyle = {
  textDecoration: 'none',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default MainAdmin;
