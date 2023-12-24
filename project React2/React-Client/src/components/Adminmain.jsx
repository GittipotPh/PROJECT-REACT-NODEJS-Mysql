import React from 'react';
import { Link } from 'react-router-dom';

const AdminMainPage = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Admin Dashboard</h1>

      {/* Navigation Links */}
      <div style={navigationStyle}>
        <Link to="/adminusers" style={linkStyle}>
          <button style={buttonStyle}>Manage Users</button>
        </Link>
        <Link to="/adminbanners" style={linkStyle}>
          <button style={buttonStyle}>Manage Banners</button>
        </Link>

        <Link to="/adminshops" style={linkStyle}>
          <button style={buttonStyle}>Manage Shops</button>
        </Link>
      </div>

      {/* You can include other content or components here */}
    </div>
  );
};

const containerStyle = {
  backgroundColor: '#f4f4f4',
  padding: '40px', // Increased padding
  margin: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  textAlign: 'center',
};

const headerStyle = {
  marginBottom: '80px',

};

const navigationStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px', // Increased gap
};

const linkStyle = {
  textDecoration: 'none',
};

const buttonStyle = {
  padding: '15px', // Increased padding
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '250px', // Increased width
};

export default AdminMainPage;
