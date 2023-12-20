import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import {
  NotificationImportant,
  Notifications,
  Person,
} from "@mui/icons-material";
import logo from "./assets/logo-blue.jpg";
import "./App.css";
import { useAuth } from "./AuthContext";

function Navbar(props) {
  const { user, logout } = useAuth();

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
        <div className="logout-con">
          <Dropdown
            overlay={ProfileMenu}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
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
