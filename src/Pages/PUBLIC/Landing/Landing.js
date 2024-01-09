import React, { useState, useEffect } from "react";
import bg from "./../../../assets/building.jpg";
import axios from "../../plugins/axios";
import "./landing.css";
import logo from "./../../../assets/logo-white.png";
import { Button } from "@mui/material";
import InputField from "../../../components/LoginComponent/InputField";
import PasswordField from "../../../components/LoginComponent/PasswordField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../../AuthContext";


function Landing(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const [buttonWidth, setButtonWidth] = useState("100%");

  // ... (existing code)

const handleLogin = async () => {
  try {
    const response = await axios.post('accounts/token/login/', {
      username: username,
      password: password,
    });

    console.log("Login API response:", response);

    if (response && response.data) {
      const userRole = response.data;
      console.log("User role after login:", userRole);

      if (userRole) {
        localStorage.setItem("userToken", userRole.role);
        let destination = "/dashboard"; // Default destination

        if (userRole.role === "admin") {
          destination = "/dashboardadmin";
        }

        console.log("Navigating to:", destination);
        navigate(destination);
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } else {
      console.error("Invalid response format:", response);
      alert("Login failed. Unexpected response received.");
    }
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
    alert("Login failed. Please check your credentials and try again.");
  }
};

// ... (rest of your code)

  
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
                onClick={handleLogin}
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