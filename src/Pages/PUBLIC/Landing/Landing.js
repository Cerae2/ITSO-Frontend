import React, { useState, useEffect, getState } from "react";
import bg from "./../../../assets/building.jpg";
import axios from "../../plugins/axios";
import "./landing.css";
import logo from "./../../../assets/logo-white.png";
import { Button } from "@mui/material";
import InputField from "../../../components/LoginComponent/InputField";
import PasswordField from "../../../components/LoginComponent/PasswordField";
import { useNavigate } from "react-router-dom";
import { setLogin, setRole } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

function Landing(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [buttonWidth, setButtonWidth] = useState("100%");
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("accounts/token/login/", {
        username: username,
        password: password,
      });

      if (response && response.data && response.data.auth_token) {
        const userToken = response.data.auth_token;

        const userResponse = await axios.get("accounts/users/me/", {
          headers: { Authorization: `token ${userToken}` },
        });

        const userRole = userResponse.data.user_role;

        // Store token and role in local storage
        localStorage.setItem("authToken", userToken);
        localStorage.setItem("userRole", userRole);

        // Update Redux state with userToken and userRole
        dispatch(setLogin(userToken));
        dispatch(setRole(userRole));

        let destination = "/dashboard"; // Default destination

        if (userRole === "admin") {
          destination = "/dashboardadmin";
        }

        // Display alert with user's role
        alert(`Login successful. You are logged in as a ${userRole}.`);

        // Navigate to the destination
        navigate(destination);
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed. Please check your credentials and try again.");
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setButtonWidth(window.innerWidth <= 600 ? "77%" : "90%");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="landing-container">
        <div className="bg-container">
          <img className="bg" src={bg} alt="Background"></img>
        </div>
        <div className="login-container">
          <div className="box-login">
            <div className="logo-container-land">
              <img className="logo-land" src={logo} alt="Logo"></img>
            </div>
            <div className="login-container-text">
              <InputField
                colorInput={"white"}
                colorLabel={"white"}
                label={"Username"}
                onChange={(e) => setUsername(e.target.value)}
              />

              <PasswordField
                label={"Password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{}}>
              <Button
                style={{ fontSize: 12, color: "white", marginBottom: 20 }}
              >
                Forgot Password?
              </Button>
            </div>
            <div
              style={{
                width: "35vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  border: "1px solid #FFC000",
                  color: "white",
                  fontSize: 15,
                  width: buttonWidth,
                }}
                onClick={() => handleLogin(username, password)}
              >
                LOGIN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
