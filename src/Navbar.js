import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { Notifications, Person, ViewHeadline } from "@mui/icons-material";
import logo from "./assets/logo-blue.jpg";
import "./App.css";
import { Button } from "@mui/material";
import { setLogout } from "./Pages/PUBLIC/Landing/authSlice";

function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isNavVisible, setNavVisibility] = useState(false);
  const dispatch = useDispatch();
  const Role = useSelector((state) => state.auth.role);

  const handleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    dispatch(setLogout());
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
        <Link to="/">Logout</Link>
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

      <ul className={`ui-nav main table ${isMenuActive ? "active" : ""}`}>
        {Role === "admin" ? (
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
        <ul className={`ui-nav drop ${isMenuActive ? "active" : ""}`}>
          {Role === "client" ? (
            <>
              <CustomLink to="/dashboard">Dashboard</CustomLink>
              <CustomLink to="/service">Service</CustomLink>
              <CustomLink to="/download">Downloadable Files</CustomLink>
              <CustomLink to="/submit">Submit Request</CustomLink>
              <CustomLink to="/profile">Profile</CustomLink>
              <CustomLink
                to="/logout"
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                Logout
              </CustomLink>
            </>
          ) : (
            <>
              <CustomLink to="/dashboardadmin">Dashboard</CustomLink>
              <CustomLink to="/adduser">Add User</CustomLink>
              <CustomLink to="/userlist">User List</CustomLink>
              <CustomLink to="/profile">Profile</CustomLink>
              <CustomLink to="/logout">Logout</CustomLink>
            </>
          )}
        </ul>
      </div>
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
