import React from "react";
import "./header.css";
import logo from "./../../assets/logo-white.png";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown, Menu, Space } from "antd";
import campusData from "./../JSON/campus.json";
import aboutUsData from "./../JSON/about.json";
import { Button } from "@mui/material";

function Header(props) {
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

  return (
    <div className="header-container">
      <img
        style={{ height: 90, width: 90, marginRight: 40, marginLeft: 20 }}
        src={logo}
        alt="Logo"
      ></img>
      <div className="header-title">
        <p>UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
        <p>OF THE SOUTHERN PHILIPPINES</p>
      </div>
      <div className="dropdown-container">
        <Dropdown overlay={campusMenu} trigger={["click", "hover"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Campuses <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlay={aboutMenu} trigger={["click", "hover"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            About us <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown overlay={contactMenu} trigger={["click", "hover"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Contact us <DownOutlined />
          </a>
        </Dropdown>
        <button className="button-login">Login</button>
      </div>
    </div>
  );
}

export default Header;
