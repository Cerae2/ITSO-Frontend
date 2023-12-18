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
import Dashboard from "./Pages/PRIVATE/Dashboard/Dashboard";
import Landing from "./Pages/PUBLIC/Landing/Landing";
import Services from "./Pages/PRIVATE/Services/Services";
import DetailsPage from "../src/Pages/PUBLIC/Search/DetailsPage/DetailsPage"
import Profile from "./Pages/PRIVATE/Profile/Profile";
import DetailsDash from "./Pages/PRIVATE/Dashboard/DetailsDash/DetailsDash";
import Submit from "./Pages/PRIVATE/Submit/Submit";
import Search from "./Pages/PUBLIC/Search/Search";
import Downloadable from "./Pages/PRIVATE/Downloadable/Downloadable";
import Home from "./Pages/PRIVATE/Home/Home";
import Patent from "./Pages/PRIVATE/Services/Patent/Patent";
import UtilityModel from "./Pages/PRIVATE/Services/UtilityModel/UtilityModel";
import IndustrialDesign from "./Pages/PRIVATE/Services/IndustrialDesign/IndustrialDesign";
import Trademark from "./Pages/PRIVATE/Services/Trademark/Trademark";
import Copyright from "./Pages/PRIVATE/Services/Copyright/Copyright";

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
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/detailsPage/:id" element={<DetailsPage />} />
          <Route path="/detailsDashPage/:id" element={<DetailsDash />} />
          <Route path="/logout" element={<Search />} />
          <Route path="/patent" element={<Patent />} />
          <Route path="/utilitymodel" element={<UtilityModel />} />
          <Route path="/industraildesign" element={<IndustrialDesign />} />
          <Route path="/trademark" element={<Trademark />} />
          <Route path="/copyright" element={<Copyright />} />
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
