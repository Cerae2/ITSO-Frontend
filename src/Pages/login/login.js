import React, { useState } from 'react';
import Header from '../../call_components/Header';
import './login.css';
import myImage from '../pictures/ustp_logo.jpg';
import { Link } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!credentials.username || !credentials.password) {
      console.error('Username and password are required');
      return; // Don't proceed with the request if fields are empty
    }

    try {
      const response = await fetch('http://localhost:8000/itsologin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        window.location.href = '/Dashboard'; // Redirect to Dashboard upon successful login
      } else {
        console.error('Authentication failed');
        // Handle authentication errors or display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <div className="login-container">
      <Header />
      <img src={myImage} className="image-resize" alt="USTP Logo" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder='Email:'
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder='Password:'
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <Link to="#" className="forgot-password">Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;
