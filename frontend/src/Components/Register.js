// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("https://himhop1.onrender.com/register", {
        name,
        email,
        password
      });
      
      if (response.data.status) {
        setMessage(response.data.message);
        navigate("/login")

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
        <h2 className="reg">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Register</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Register;
