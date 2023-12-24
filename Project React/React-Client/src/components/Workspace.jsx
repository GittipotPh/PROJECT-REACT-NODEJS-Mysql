import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

function Workspace({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserLoginClick = () => {
    // Perform login logic (e.g., make API request)
    // If login is successful, invoke the onLogin callback
    // This callback is provided by the parent (App) to update the authenticated state
    onLogin();
  };

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">WELCOME TO FEYVERLY SERVICE</h1>
      <Container
        style={{
          backgroundColor: '#f8f9fa', // Choose your desired background color
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h2 className="mb-4">Login User</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUserLoginClick}>
            Login
          </Button>
        </Form>
      </Container>

      
    </Container>
  );
}

export default Workspace;
