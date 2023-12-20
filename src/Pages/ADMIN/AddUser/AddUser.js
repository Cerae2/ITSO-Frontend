import React, { useState } from "react";
import Navbar from "../../../Navbar";
import "./adduser.css";
import account from "./../../../assets/account.png";
import { Button, TextField } from "@mui/material";
import DatePickers from "../../../components/DatePickers";
import Selection from "../../../components/Selection";
import campusData from "./../../../components/JSON/campus.json";
import collegeData from "./../../../components/JSON/colleges.json";
import TextFieldComponet from "../../../components/TextFieldComponet";
import userData from "./../../../components/JSON/user.json";
import { PersonAdd, VerifiedUser } from "@mui/icons-material";

function AddUser(props) {
  const [college, setCollege] = useState("");
  const [campus, setCampus] = useState("");
  const [user, setUser] = useState("");

  const handleChangeCollege = (event) => {
    setCollege(event.target.value);
  };

  const handleChangeCampus = (event) => {
    setCampus(event.target.value);
  };

  const handleChangeUser = (event) => {
    setUser(event.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="add-user-cont">
        <div className="account-cont">
          <img className="account" src={account}></img>
        </div>
        <div className="input-cont-add">
          <div className="row0">
            <h2 style={{ fontSize: 30 }}>ADD USER</h2>
          </div>
          <div className="row1">
            <TextFieldComponet label={"First Name"}></TextFieldComponet>
            <TextFieldComponet label={"Middle Name"}></TextFieldComponet>
            <TextFieldComponet label={"Last Name"}></TextFieldComponet>
          </div>
          <div className="row2">
            <DatePickers></DatePickers>
            <Selection
              inputLabel={"School Campus"}
              valueSelect={campus}
              label={"School Campus"}
              onChange={handleChangeCampus}
              data={campusData}
              value={"value"}
              content={"label"}
            ></Selection>
            <Selection
              inputLabel={"College Department"}
              valueSelect={college}
              label={"College Department"}
              onChange={handleChangeCollege}
              data={collegeData}
              value={"value"}
              content={"label"}
            ></Selection>
          </div>
          <div className="row3">
            <TextFieldComponet label={"Email"}></TextFieldComponet>
            <TextFieldComponet label={"Contact No."}></TextFieldComponet>
            <Selection
              inputLabel={"User Type"}
              valueSelect={user}
              label={"User Type"}
              onChange={handleChangeUser}
              data={userData}
              value={"value"}
              content={"label"}
            ></Selection>
          </div>
          <div>
            <Button style={{ backgroundColor: "#00B050", color: "white" }}>
              <PersonAdd style={{ marginRight: 10 }}></PersonAdd> ADD USER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
