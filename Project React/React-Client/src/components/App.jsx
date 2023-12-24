import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginUserPage from './LoginUserPage';
import HomePage from './HomePage';
import LoginAdminPage from './LoginAdminPage';
import Samsaung from './Samsaung';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [HomepagePassed , setHomepagePassed] = useState(false);


  const handleUserLogin = () => {

      setUserAuthenticated(true);
      setHomepagePassed(true); }
  

  const handleAdminLogin = () => {

      setAdminAuthenticated(true);
    }
  
  const handleHomepage =() => {
    setHomepagePassed(true);
  }

  const setLogout = () => { 
    setHomepagePassed(false);
    setAdminAuthenticated(false);
    setUserAuthenticated(false);
  }

  return (
    <Router>
      <Routes>
  <Route path="/" element={<Navigate to="/userlogin" />} />
  <Route path="/userlogin" element={userAuthenticated ? <Navigate to="/homepage" /> : <LoginUserPage onLogin={handleUserLogin} />} />
  <Route path="/homepage" element={HomepagePassed ? <HomePage onLoginHome={handleHomepage} onLogout={setLogout} /> : <Navigate to="/userlogin" />} />
  <Route path="/adminlogin" element={adminAuthenticated ? <Navigate to="/homepage" /> : <LoginAdminPage AdminonLogin={handleAdminLogin} />} />
  <Route path="/adminpage" element={adminAuthenticated ? <AdminCRUDBanners /> : <Navigate to="/adminlogin" />} />
  <Route path="/samsaung" element={HomepagePassed ? <Samsaung /> : <Navigate to="/userlogin" />} />
  <Route path="/register" element={<Register />} />
</Routes>

    </Router>

  );
}

export default App;
