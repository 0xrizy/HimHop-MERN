// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Login.css';
import { useNavigate } from "react-router-dom";



const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password
      });

      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        props.setIsLoggedIn(true);
        setMessage(response.data.message);
        alert("LOGIN SUCCESS")
        navigate("/picks");
      } else {
        setMessage(response.data.errorMessage);
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="reg">Login</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Login</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Login;
