import {
  NotificationImportant,
  Notifications,
  Person,
} from "@mui/icons-material";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import logo from "./assets/logo-blue.jpg";
import "./App.css";

function Navbar(props) {
  const ProfileMenu = (
    <Menu style={{ width: 250 }}>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="nav">
      <div className="nav-header">
        <img className="nav-logo" src={logo} alt="Logo"></img>
        <div className="title-nav">
          <h3 className="nav-h3">UNIVERSITY OF SCIENCE AND TECHNOLOGY</h3>
          <h3 className="nav-h3">OF SOUTHERN PHILIPPINES</h3>
        </div>
      </div>

      <ul className="ui-nav">
        <CustomLink to="/dashboard">Dashboard</CustomLink>
        <CustomLink to="/service">Service</CustomLink>
        <CustomLink to="/download">Downloadable Files</CustomLink>
        <CustomLink to="/submit">Submit Request</CustomLink>
      </ul>

      <li className="logout">
        <dv className="logout-con bell">
          <Button
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "none",
            }}
          >
            <Notifications></Notifications>
          </Button>
        </dv>
        <div className="logout-con">
          <Dropdown overlay={ProfileMenu} placement="bottomRight" arrow>
            <Person style={{ color: "white" }} />
          </Dropdown>
        </div>
      </li>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
