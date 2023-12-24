import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginUserPage from './LoginUserPage';
import HomePage from './HomePage';
import LoginAdminPage from './LoginAdminPage';
import Samsaung from './Samsaung';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import AdminMainPage from './Adminmain';
import UsersEdit2 from './CRUD/Usersedit';
import BannersEdit2 from './CRUD/Banneredit';
import ShopsEdit2 from './CRUD/Shopsedit';

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
  <Route path="/samsaung" element={HomepagePassed ? <Samsaung /> : <Navigate to="/userlogin" />} />
  <Route path="/register" element={<Register RegisterPassed={handleUserLogin} />} />
  <Route path="/adminpage" element={adminAuthenticated ? <AdminMainPage /> : <Navigate to="/adminlogin" />} />
  <Route path="/adminshops" element={adminAuthenticated ? < ShopsEdit2 /> : <Navigate to="/adminlogin/" />} />
  <Route path="/adminbanners" element={adminAuthenticated ? < BannersEdit2 /> : <Navigate to="/adminlogin/" />} />
  <Route path="/adminusers" element={adminAuthenticated ? < UsersEdit2 /> : <Navigate to="/adminlogin/" />} />  
    
    </Routes>

    </Router>

  );
}

export default App;
