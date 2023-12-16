import React from "react";
import bg from "./../../../assets/building.jpg";
import "./landing.css";
import logo from "./../../../assets/logo-white.png";
import { Button, TextField } from "@mui/material";
import InputField from "../../../components/LoginComponent/InputField";
import PasswordField from "../../../components/LoginComponent/PasswordField";
import Home from "../../PRIVATE/Home/Home";
import Header from "../../../components/header/Header";
import { useNavigate } from "react-router-dom";

function Landing(props) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="landing-container">
        <div className="bg-container">
          <img className="bg" src={bg}></img>
        </div>
        <div className="login-container">
          <div className="box-login">
            <div className="logo-container-land">
              <img className="logo-land" src={logo}></img>
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
              ></InputField>
              <PasswordField label={"Password"}></PasswordField>
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
