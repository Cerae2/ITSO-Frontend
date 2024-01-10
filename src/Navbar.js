import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { Notifications, Person, ViewHeadline } from "@mui/icons-material";
import logo from "./assets/logo-blue.jpg";
import "./App.css";
import { Button } from "@mui/material";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const ProfileMenu = (
    <Menu
      style={{ width: 250, position: "relative", zIndex: 999999 }}
      className="profile-menu"
    >
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="nav table">
      <div className="nav-header table">
        <img className="nav-logo table" src={logo} alt="Logo" />
        <div className="title-nav">
          <h3 className="nav-h3">UNIVERSITY OF SCIENCE AND TECHNOLOGY</h3>
          <h3 className="nav-h3">OF SOUTHERN PHILIPPINES</h3>
        </div>
      </div>

      {user && (
        <ul className={`ui-nav main table ${isMenuActive ? "active" : ""}`}>
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

      <li className="logout table">
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
        <div className="logout-con bar ">
          <Button onClick={handleMenu}>
            <ViewHeadline style={{ color: "white" }} />
          </Button>
        </div>
      </li>

      <div className={`drop-down-nav table ${isMenuActive ? "active" : ""}`}>
        {user && (
          <ul className={`ui-nav drop ${isMenuActive ? "active" : ""}`}>
            {user.role === "client" ? (
              <>
                <CustomLink to="/dashboardadmin">Dashboard</CustomLink>
                <CustomLink to="/adduser">Add User</CustomLink>
                <CustomLink to="/userlist">User List</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
                <CustomLink to="/logout">Logout</CustomLink>
              </>
            ) : (
              <>
                <CustomLink to="/dashboard">Dashboard</CustomLink>
                <CustomLink to="/service">Service</CustomLink>
                <CustomLink to="/download">Downloadable Files</CustomLink>
                <CustomLink to="/submit">Submit Request</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
                <CustomLink to="/logout">Logout</CustomLink>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

function CustomLink({ to, children }) {
  const isActive = useLocation().pathname === to;

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
