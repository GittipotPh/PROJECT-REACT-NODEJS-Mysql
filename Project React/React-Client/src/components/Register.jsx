import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Register() {
  const api_url = "http://localhost:3004";
  const [contact, setContact] = useState({
    username : "",
    password: "",
    email: "",
  });

  const [isMousedOver, setMouseOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    

    try {
      
      const response = await axios.post(`${api_url}/userregister`, contact);

      console.log("Registration successful:", response.data);

    
      navigate('/userlogin');
    } catch (error) {
      
      console.error("Registration failed:", error.response.data);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  

    return (
      <div style={{ background: '#3cdbde', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Container style={{ width: '700px',height: '800px' , marginTop: '20px', padding: '20px', border: '10px solid black', borderRadius: '8px' }}>
          <h2 style={{margin: '30px', fontSize : "rem"}}>  WELCOME TO FEYVERLY  REGISTER</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
  
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              name="email"
              value={contact.email}
              placeholder="Email"
              type="email"
              style={{ marginBottom: '10px' }}
            />
  
            <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} 
            type="submit" style={{ marginTop: '30px', padding:'10px' , fontWeight : "bold" ,transition: 'background-color 0.3s', backgroundColor: isMousedOver ? "black" : "whitesmoke" , color : "#40eb42"}}>Register</button>
          </form>
          <img style={{display: 'block',  border: '2px solid black' , padding : '30px' , margin: 'auto', marginTop : '150px' , backgroundColor : "white"}}
          
          src="https://feyverly.com/wp-content/uploads/2020/04/cropped-Feyverlylogo.jpg" alt="Feyverly Logo" />
        </Container>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
  
  export default Register;