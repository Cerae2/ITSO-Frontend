import React, { useState, useRef,useEffect } from "react";
import "./header.css";
import logo from "./../../assets/logo-white.png";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown, Menu, Space } from "antd";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { Login, ViewHeadline, WidgetsOutlined } from "@mui/icons-material";
import { Link } from 'react-router-dom';


function Header(props) {
 const contSelectionRef = useRef(null);
 const searchMessageRef = useRef(null);

 const handleMenu = () => {
    const contSelection = contSelectionRef.current;

    if (contSelection) {
      contSelection.classList.toggle("active");
    }
 };

 const [lastClickedButton, setLastClickedButton] = useState(null);
 const navigate = useNavigate(); // Use the useNavigate hook

 const handleButtonClick = (buttonId) => {
    setLastClickedButton(buttonId);
    switch (buttonId) {
      case 'home':
        navigate("/#");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'services':
        navigate("/search");
        window.scrollTo({
          top: document.getElementById('services').offsetTop,
          behavior: 'smooth'
        });
        break;
      case 'technology':
        navigate("/search-technologies");
        window.scrollTo({
          top: document.getElementById('search-message').offsetTop,
          behavior: 'smooth'
        });
        break;
      case 'login':
        navigate("/landing");
        break;
      case 'register':
        navigate("/registration");
        break;
      default:
        break;
    }
 };

 return (
    <div>
      <div className="header-container">
        <img
          style={{
            height: "7vh",
            width: "7vh",
            marginRight: 40,
            marginLeft: 20,
          }}
          src={logo}
          alt="Logo"
        ></img>
        <div className="header-title">
          <p className="school-name">UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
          <p className="school-name">OF THE SOUTHERN PHILIPPINES</p>
        </div>
        <div className="dropdown-container">
        <div className="dropdown-container">
      <button onClick={() => handleButtonClick('home')} className={`button-login ${lastClickedButton === 'home' ? 'clicked' : ''}`}>
        Home
      </button>
      <Link to="#services">
      <button onClick={() => handleButtonClick('services')} className={`button-login ${lastClickedButton === 'services' ? 'clicked' : ''}`}>
        Our Services
      </button>
      </Link>
      <Link to="#search-message">
        <button onClick={() => handleButtonClick('technology')} className={`button-login ${lastClickedButton === 'technology' ? 'clicked' : ''}`}>
          Our Technologies
        </button>
      </Link>
      <button onClick={() => handleButtonClick('login')} className={`button-login ${lastClickedButton === 'login' ? 'clicked' : ''}`}>
        Login
      </button>
      <button onClick={() => handleButtonClick('register')} className={`button-login ${lastClickedButton === 'register' ? 'clicked' : ''}`}>
        Register
    
          </button>
        </div>
        </div>
        <div className="header-selection">
          <Button onClick={handleMenu}>
            <ViewHeadline></ViewHeadline>
          </Button>
        </div>
      </div>

      {/* Removed the cont-selection div */}
    </div>
 );
}

export default Header;
