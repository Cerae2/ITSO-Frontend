import React, { useState } from "react";
import bg from "./../../../assets/building.jpg";
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

  const handleLogin = () => {
    // Simulate authentication logic
    const userRole = login(username, password);

    console.log("User role after login:", userRole);

    if (userRole) {
      // Set a token or identifier in local storage
      localStorage.setItem("userToken", userRole.role);

      if (userRole.role === "admin") {
        navigate("/dashboardadmin");
      } else if (userRole.role === "user") {
        navigate("/dashboard");
      }
    } else {
      // Show an alert for wrong username or password
      alert("Invalid username or password. Please try again.");
    }
  };

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40vh",
                alignItems: "center",
              }}
            >
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
            <div style={{ width: "35vh" }}>
              <Button
                style={{
                  border: "1px solid #FFC000",
                  color: "white",
                  fontSize: 15,
                  width: "100%",
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
