import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Facebook } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage({onLoginHome, onLogout}) {
  const [error, setError] = useState('');
  const api_url = "http://localhost:3004";
  const navigate = useNavigate();

  const resetState = () => {
    setError('');}

  const getBannersShopsloca = async () => {
    try {
      const response = await axios.get(`${api_url}/banners`);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
  
        if (typeof onLoginHome === 'function') {
          onLoginHome();
    
          navigate("/samsaung");
        } else {
          
        }
      } else {

        setError("Login failed");
      }
    } catch (error) {
      
      setError("Login failed");
    }
  };

  const LogoutSession = () => { 
    resetState();
    if (typeof onLogout === 'function') {
      onLogout();
    navigate("/userlogin")}
    

  };

  return (
    <div className="d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>FEYVERLY FOR U</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link style={{ color: 'green' }}>
                <span className="loginstatus">Status: Logged In</span>
              </Nav.Link>
              <Nav.Link>
                <span className="logout" onClick={LogoutSession}>Logout</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1 className="text-center">OUR PRODUCTS</h1>

      <Container className="mt-5">
        {/* First Row */}
        <Row className="justify-content-center">
          <Col xs={6} md={6} className="text-center">
            <img
              onClick={getBannersShopsloca}
              src="https://img.global.news.samsung.com/th/wp-content/uploads/2023/02/Galaxy-S23-Series_KV_Product_2p_LI-1024x724.jpg"
              alt="Slot 1"
              className="img-fluid"
              data-value="SamSungS23"
            />
          </Col>
          <Col xs={6} md={6} className="text-center">
            <img
              src="https://via.placeholder.com/500"
              alt="Slot 2"
              className="img-fluid"
              data-value="Product2"
            />
          </Col>
        </Row>

        {/* Second Row */}
        <Row className="mt-3 justify-content-center">
          <Col xs={6} md={6} className="text-center">
            <img
              src="https://via.placeholder.com/500"
              alt="Slot 3"
              className="img-fluid"
              data-value="Product3"
            />
          </Col>
          <Col xs={6} md={6} className="text-center">
            <img
              src="https://via.placeholder.com/500"
              alt="Slot 4"
              className="img-fluid"
              data-value="Product4"
            />
          </Col>
        </Row>
      </Container>

      {/* Bootstrap Footer */}
      <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#twitter"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#instagram"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <Facebook size={24} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default HomePage;
