import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function LoginAdminPage({ AdminonLogin }) {
  const api_url = "http://localhost:3004";
  const [contact, setContact] = useState({
    username: "",
    password: "",
    keyadmin: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isMousedOver, setIsMousedOver] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    console.log(contact);
    try {
      const response = await axios.post(`${api_url}/adminlogin`, { ...contact }, { withCredentials: true });
      if (response.status === 200) {
        AdminonLogin();
        navigate("/adminpage");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      setErrorMessage("Login Failed, Please check your username and password");
    }
  };

  const handleMouseOver = () => {
    setIsMousedOver(true);
  };

  const handleMouseOut = () => {
    setIsMousedOver(false);
  };

  return (
    <div style={{ background: '#3cdbde', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container style={{ width: '700px', height: '800px', marginTop: '20px', padding: '20px', border: '10px solid black', borderRadius: '8px' }}>
        <h2 style={{ marginLeft: '190px', fontSize: "rem" , padding : "20px" }}>ADMIN LOGIN</h2>
        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChange}
            name="username"
            value={contact.username}
            placeholder="Username"
            style={{ marginBottom: '10px' }}
          />

          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            name="password"
            value={contact.password}
            placeholder="Password"
            type="password"
            style={{ marginBottom: '10px' }}
          />

          <label htmlFor="keyadmin">ADMIN KEY:</label>
          <input
            onChange={handleChange}
            name="keyadmin"
            value={contact.keyadmin}
            placeholder="ADMIN KEY"
            type="password"
            style={{ marginBottom: '10px' }}
          />

          <button
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            type="submit"
            style={{
              marginTop: '30px',
              padding: '10px',
              fontWeight: "bold",
              transition: 'background-color 0.3s',
              backgroundColor: isMousedOver ? "black" : "whitesmoke",
              color: "#40eb42"
            }}>Login</button>
        </form>
        <img
          style={{
            position : 'relative',
            display: 'block',
            border: '2px solid black',
            padding: '30px',
            margin: 'auto',
            marginTop: '150px',
            backgroundColor: "white"
          }}
          src="https://feyverly.com/wp-content/uploads/2020/04/cropped-Feyverlylogo.jpg" alt="Feyverly Logo" />
      </Container>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LoginAdminPage;
