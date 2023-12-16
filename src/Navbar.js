import { Widgets } from "@mui/icons-material";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "./assets/logo-blue.jpg";
import "./App.css";

function Navbar(props) {
  return (
    <nav className="nav">
      <img className="nav-logo" src={logo}></img>
      <ul className="ui-nav">
        <CustomLink to="/dashboard">Dashboard</CustomLink>
        <CustomLink to="/service">Service</CustomLink>
        <CustomLink to="/download">Downloadable Files</CustomLink>
        <CustomLink to="/submit">Submit Request</CustomLink>
        <li>
          <CustomLink to="/logout">Logout</CustomLink>
        </li>
      </ul>
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
