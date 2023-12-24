import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginUserPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const api_url = "http://localhost:3004";

  const handleUserLoginClick = async () => {
    try {
      const response = await axios.post(`${api_url}/userlogin`, { username, password });

      if (response.status >= 200 && response.status < 300) {
        const { token } = response.data;

        localStorage.setItem('jwtToken', token);

        onLogin();

        navigate("/homepage");
      } else {

        const { usernameError, passwordError } = response.data.errors || {};
        setErrorMessage({ username: usernameError || 'usernameErr', password: passwordError || 'passwordError' });
      }
    } catch (error) {
      const { usernameError, passwordError } = error.response.data.errors || {};
        setErrorMessage({ username: usernameError || 'usernameErr', password: passwordError || 'passwordError' });
    }
  };

  const LoginAdminpage = () => {
    navigate("/adminlogin");
  }

  const RegisterLink = () => {
    navigate("/register");}

  return (
    <div style={{ background: '#3cdbde', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Container style={{ width: '600px',height: '800px' , marginTop: '20px', padding: '20px', border: '10px solid black', borderRadius: '8px' }}>
      <h1 className="mt-4">FEYVERLY Login {errorMessage && <span style={{ color: 'red' }}>{errorMessage.username}</span>}</h1>
      <Form style={{marginTop : "100px"}}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={errorMessage ? { borderColor: "red" } : {}}
          />
          {errorMessage && <Form.Text className="text-danger">{errorMessage.username}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={errorMessage ? { borderColor: "red" } : {}}
          />
          {errorMessage && <Form.Text className="text-danger">{errorMessage.password}</Form.Text>}
        </Form.Group>

        <Button variant="primary" onClick={handleUserLoginClick}>
          Login
        </Button>
        <Button type="button" onClick={RegisterLink} style={{marginLeft : "20px"}} className="btn btn-warning">Register</Button>
        <Button variant="success" style={{ marginLeft: 'auto', display: 'block', marginTop: '-40px' }} onClick={LoginAdminpage}>
          Admin
        </Button>
        

      </Form>
      <img style={{
        
        display: 'block',  border: '2px solid black' , padding : '30px' , margin: 'auto', marginTop : '120px' , backgroundColor : "white"}}
          
          src="https://feyverly.com/wp-content/uploads/2020/04/cropped-Feyverlylogo.jpg" alt="Feyverly Logo" />
    </Container></div>
  );
}

export default LoginUserPage;
