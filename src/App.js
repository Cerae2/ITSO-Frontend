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
import { AuthProvider } from "./AuthContext";

import Dashboard from "./pages/PRIVATE/Dashboard/Dashboard";
import Landing from "./pages/PUBLIC/Landing/Landing";
import Services from "./pages/PRIVATE/Services/Services";
import Submit from "./pages/PRIVATE/Submit/Submit";
import Downloadable from "./pages/PRIVATE/Downloadable/Downloadable";
import Home from "./pages/PRIVATE/Home/Home";
import Search from "./pages/PUBLIC/Search/Search";
import DetailsPage from "./pages/PUBLIC/Search/DetailsPage/DetailsPage";
import Profile from "./pages/PRIVATE/Profile/Profile";
import DetailsDash from "./pages/PRIVATE/Dashboard/DetailsDash/DetailsDash";
import DashboardAdmin from "./pages/ADMIN/Dashboard/DashboardAdmin";
import AddUser from "./pages/ADMIN/AddUser/AddUser";
import UserList from "./pages/ADMIN/UserList/UserList";
import DetailsAdminDash from "./pages/ADMIN/Dashboard/DetailsAdminDash/DetailsAdminDash";

function App() {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Search></Search>}></Route>
          </Routes>

          <Routes>
            <Route path="/landing" element={<Landing></Landing>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route
              path="/dashboardadmin"
              element={<DashboardAdmin></DashboardAdmin>}
            ></Route>
            <Route
              path="/dashboardadmindetail/:id"
              element={<DetailsAdminDash></DetailsAdminDash>}
            ></Route>
            <Route path="/adduser" element={<AddUser></AddUser>}></Route>
            <Route path="/userlist" element={<UserList></UserList>}></Route>
            <Route path="/service" element={<Services></Services>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/detailsPage/:id" element={<DetailsPage />} />
            <Route path="/detailsDashPage/:id" element={<DetailsDash />} />
            <Route path="/logout" element={<Search />} />
            <Route
              path="/download"
              element={<Downloadable></Downloadable>}
            ></Route>
            <Route path="/submit" element={<Submit></Submit>}></Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
