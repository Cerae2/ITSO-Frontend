import React, { useState, useRef } from "react";
import "./header.css";
import logo from "./../../assets/logo-white.png";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown, Menu, Space } from "antd";
import campusData from "./../JSON/campus.json";
import aboutUsData from "./../JSON/about.json";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { Login, ViewHeadline, WidgetsOutlined } from "@mui/icons-material";

function Header(props) {
  const contSelectionRef = useRef(null);

  const handleMenu = () => {
    const contSelection = contSelectionRef.current;

    if (contSelection) {
      contSelection.classList.toggle("active");
    }
  };

  const campusMenu = (
    <Menu style={{ width: 250 }}>
      {campusData.map((campus) => (
        <Menu.Item key={campus.value}>
          <a href={campus.link} target="_blank" rel="noopener noreferrer">
            {campus.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const aboutMenu = (
    <Menu style={{ width: 250 }}>
      {aboutUsData.map((about) => (
        <Menu.Item key={about.value}>
          <a href={about.link} target="_blank" rel="noopener noreferrer">
            {about.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const contactMenu = (
    <Menu style={{ width: 250 }}>
      <Menu.Item>
        <a href={""} target="_blank" rel="noopener noreferrer">
          098-2837-3833
        </a>
        <a href={""} target="_blank" rel="noopener noreferrer">
          ustep.ustp@ustep.ustp.edu.ph
        </a>
      </Menu.Item>
    </Menu>
  );

  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLoginClick = () => {
    navigate("/landing");
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
          <Dropdown overlay={campusMenu} trigger={["click", "hover"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Campuses <DownOutlined />
            </a>
          </Dropdown>
          <Dropdown overlay={aboutMenu} trigger={["click", "hover"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              About us <DownOutlined />
            </a>
          </Dropdown>
          <Dropdown overlay={contactMenu} trigger={["click", "hover"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Contact us <DownOutlined />
            </a>
          </Dropdown>
          <button onClick={handleLoginClick} className="button-login">
            Login
          </button>
        </div>
        <div className="header-selection">
          <Button onClick={handleMenu}>
            <ViewHeadline></ViewHeadline>
          </Button>
        </div>
      </div>
      <div ref={contSelectionRef} className="cont-selection">
        <div className="cam-cont-head">
          <h1 className="title-head-drop">Campuses</h1>
          <a className="link-campus Alubijid" href="https://example.com">
            USTP Alubijid
          </a>
          <a className="link-campus CDO" href="https://example.com">
            USTP Cagayan de Oro
          </a>
          <a className="link-campus Claveria" href="https://example.com">
            USTP Claveria
          </a>
          <a className="link-campus Balubal" href="https://example.com">
            USTP Balubal
          </a>
          <a className="link-campus Jasaan" href="https://example.com">
            USTP Jasaan
          </a>
          <a className="link-campus Oroquieta" href="https://example.com">
            USTP Oroquieta
          </a>
          <a className="link-campus Panaon" href="https://example.com">
            USTP Panaon
          </a>
          <a className="link-campus Villanueva" href="https://example.com">
            USTP Villanueva
          </a>
        </div>
        <div className="cam-cont-head">
          <h1 className="title-head-drop">About Us</h1>
          <a className="link-about" href="https://example.com">
            TPCO Office
          </a>
          <a className="link-about" href="https://example.com">
            Staff
          </a>
        </div>
        <div className="cam-cont-head">
          <h1 className="title-head-drop">Contact Us</h1>
          <a className="link-contact" href="https://example.com">
            098-2837-3833
          </a>
          <a className="link-contact" href="https://example.com">
            ustep.ustp@ustep.ustp.edu.ph
          </a>
        </div>
        <div className="cam-cont-head login">
          <Button
            onClick={handleLoginClick}
            style={{ backgroundColor: "#45c045", color: "white" }}
          >
            LOGIN<Login></Login>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
