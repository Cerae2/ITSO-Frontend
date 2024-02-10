import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Pages/PRIVATE/Dashboard/Dashboard";
import Landing from "./Pages/PUBLIC/Landing/Landing";
import Services from "./Pages/PRIVATE/Services/Services";
import Submit from "./Pages/PRIVATE/Submit/Submit";
import Downloadable from "./Pages/PRIVATE/Downloadable/Downloadable";
import Home from "./Pages/PRIVATE/Home/Home";
import Search from "./Pages/PUBLIC/Search/Search";
import DetailsPage from "./Pages/PUBLIC/Search/DetailsPage/DetailsPage";
import Profile from "./Pages/PRIVATE/Profile/Profile";
import DetailsDash from "./Pages/PRIVATE/Dashboard/DetailsDash/DetailsDash";
import DashboardAdmin from "./Pages/ADMIN/Dashboard/DashboardAdmin";
import AddUser from "./Pages/ADMIN/AddUser/AddUser";
import UserList from "./Pages/ADMIN/UserList/UserList";
import DetailsAdminDash from "./Pages/ADMIN/Dashboard/DetailsAdminDash/DetailsAdminDash";


function App() {
  // const isAuthenticated = useSelector((state) => state.auth.setIsLoggedIn);
  // const Token = useSelector((state) => state.auth.token);

  const personalInfo = useSelector(
    (state) => state.personalInfo.data 
  );

  const userRole = personalInfo?.user_role;
    
  return (
    <div className="container">
      
       
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
  );
}

export default App;
