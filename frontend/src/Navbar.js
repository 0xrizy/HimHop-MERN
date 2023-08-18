// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          HimHop
        </Link>
      </div>
      <div>
      {props.isLoggedIn && <Link to="/picks" className="explorebtn">Explore</Link>}
      </div>
      <div>
      {props.isLoggedIn && <Link to="/yourPicks" className="picksbtn">Your Picks</Link>}
      </div>
      <div className="navbar-right">
      {!props.isLoggedIn && (
          <Link to="/login" className="login-button-navbar">
            Login
          </Link>
        )}
        {props.isLoggedIn && (
          <button onClick={() => {
            localStorage.removeItem('token');
            props.setIsLoggedIn(false);
            navigate('/');
          }} className="login-button-navbar">
            Logout
          </button>
        )}
      
      </div>
    </nav>
  );
};

export default Navbar;
