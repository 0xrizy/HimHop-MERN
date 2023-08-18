import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Home.css'

function Home(props) {
  return (
    <div>
      <div className="home-container">
      <div className="background-image"></div>
      <div className="content">
        <h1 className='h1h'>Welcome to HimHop</h1>
        <h1 className='h1h1'>Himachal - Peaks, Valleys, and Memories</h1>
        {!props.isLoggedIn && <div className="buttons">
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/register" className="signup-button">Register</Link>
        </div>}
      </div>
    </div>
    </div>
  )
}

export default Home
