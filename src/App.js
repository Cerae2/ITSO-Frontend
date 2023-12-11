import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation as useReactRouterLocation,
} from "react-router-dom";
import Dashboard from "./pages/PRIVATE/Dashboard/Dashboard";
import Landing from "./pages/PUBLIC/Landing/Landing";
import Services from "./pages/PRIVATE/Services/Services";
import Submit from "./pages/PRIVATE/Submit/Submit";
import Downloadable from "./pages/PRIVATE/Downloadable/Downloadable";
import Home from "./pages/PRIVATE/Home/Home";
import Search from "./pages/PUBLIC/Search/Search";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Search></Search>}></Route>
        </Routes>

        <Routes>
          <Route path="/landing" element={<Landing></Landing>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/service" element={<Services></Services>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route
            path="/download"
            element={<Downloadable></Downloadable>}
          ></Route>
          <Route path="/submit" element={<Submit></Submit>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
