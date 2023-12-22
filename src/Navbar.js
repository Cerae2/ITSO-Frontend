import React, { useState, useRef }  from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import {
  NotificationImportant,
  Notifications,
  Person,
  ViewHeadline,
  WidgetsOutlined,
  Login,
} from "@mui/icons-material";
import logo from "./assets/logo-blue.jpg";
import "./App.css";
import { useAuth } from "./AuthContext";
import { Button } from "@mui/material";

function Navbar(props) {
  const { user, logout } = useAuth();
  const contSelectionRef = useRef(null);

  const handleMenu = () => {
    const contSelection = contSelectionRef.current;

    if (contSelection) {
      contSelection.classList.toggle("active");
    }
  };

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
    <>
      <nav className="nav">
        <div className="nav-header">
          <img className="nav-logo" src={logo} alt="Logo" />
          <div className="title-nav">
            <h3 className="nav-h3">UNIVERSITY OF SCIENCE AND TECHNOLOGY</h3>
            <h3 className="nav-h3">OF SOUTHERN PHILIPPINES</h3>
          </div>
        </div>

        {user && (
          <ul className="ui-nav">
            {user.role === "admin" ? (
              <>
                <CustomLink to="/dashboardadmin">Dashboard</CustomLink>
                <CustomLink to="/adduser">Add User</CustomLink>
                <CustomLink to="/userlist">User List</CustomLink>
              </>
            ) : (
              <>
                <CustomLink to="/dashboard">Dashboard</CustomLink>
                <CustomLink to="/service">Service</CustomLink>
                <CustomLink to="/download">Downloadable Files</CustomLink>
                <CustomLink to="/submit">Submit Request</CustomLink>
              </>
            )}
          </ul>
        )}

        <li className="logout">
          <div className="logout-con bell">
            <Button
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
              }}
            >
              <Notifications />
            </Button>
          </div>
          <div className="logout-con drop">
            <Dropdown
              overlay={ProfileMenu}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <Person style={{ color: "white" }} />
            </Dropdown>
          </div>
          <div className="logout-con bar">
            <Button onClick={handleMenu}>
              <ViewHeadline style={{ color: "white" }}></ViewHeadline>
            </Button>
          </div>
        </li>
      </nav>
      <div ref={contSelectionRef} className="drop-down-nav"></div>
    </>
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
