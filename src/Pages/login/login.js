import React, { useState } from 'react';
import './login.css'
import myImage from '../pictures/ustp_logo.jpg';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here, e.g., make an API request
  };

  // ...rest of your component code

  return (
    <div className="login-container">
        <img src={myImage} className="image-resize" alt="USTP Logo" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder='Email:'
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder='Password:'
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Login Button */}
        <Link to="/Learnmore"><button type="submit" className="login-button">Login</button></Link>

        {/* Forgot Password Link */}
        <a href="#" className="forgot-password">Forgot Password?</a>
      </form>
    </div>
  );
}  

export default Login;