import React, { useState } from "react";
import Navbar from "../../../Navbar";
import "./adduser.css";
import account from "./../../../assets/account.png";
import campusData from "./../../../components/JSON/campus.json";
import collegeData from "./../../../components/JSON/colleges.json";
import userData from "./../../../components/JSON/user.json";
import { Button } from "@mui/material";
import DatePickers from "../../../components/DatePickers";
import Selection from "../../../components/Selection";
import TextFieldComponet from "../../../components/TextFieldComponet";
import axios from "axios";

function UserProfile(props) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [userType, setUserType] = useState("");
  const [campus, setCampus] = useState("");
  const [college, setCollege] = useState("");

  const handleChangeCampus = (event) => {
    setCampus(event.target.value);
  };

  const handleChangeCollege = (event) => {
    setCollege(event.target.value);
  };

  const handleAddUser = async () => {
    try {
      const userData = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        birth_date: birthdate,
        contact_number: contactNo,
        school_campus: campus,
        department_type: college,
        user_role: userType,
        // Add other fields as needed...
      };

      // Axios POST request to send user data to the backend
      const response = await axios.post(
        "http://localhost:8000/auth/register/",
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response.data); // Log the response data if needed
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-user-cont">
        <div className="account-cont">
          <img className="account" src={account} alt="account" />
        </div>
        <div className="input-cont-add">
          <div className="row0">
            <h2 style={{ fontSize: 30 }}>ADD USER</h2>
          </div>
          <div className="row1">
            <TextFieldComponet
              label={"First Name"}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextFieldComponet
              label={"Middle Name"}
              value={middleName}
              onChange={(event) => setMiddleName(event.target.value)}
            />
            <TextFieldComponet
              label={"Last Name"}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="row2">
            <DatePickers
            value={birthdate} //
            onChange={(date) => setBirthdate(date)} 
            />
            <Selection
              inputLabel={"School Campus"}
              valueSelect={campus}
              label={"School Campus"}
              onChange={handleChangeCampus}
              data={campusData}
              value={"value"}
              content={"label"}
            />
            <Selection
              inputLabel={"College Department"}
              valueSelect={college}
              label={"College Department"}
              onChange={handleChangeCollege}
              data={collegeData}
              value={"value"}
              content={"label"}
            />
          </div>
          <div className="row3">
            <TextFieldComponet
              label={"Email"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextFieldComponet
              label={"Contact No."}
              value={contactNo}
              onChange={(event) => setContactNo(event.target.value)}
            />
            <Selection
              inputLabel={"User Type"}
              valueSelect={userType}
              label={"User Type"}
              onChange={(event) => setUserType(event.target.value)}
              data={userData}
              value={"value"}
              content={"label"}
            />
          </div>
          <div>
            <Button
              style={{ backgroundColor: "#00B050", color: "white" }}
              onClick={handleAddUser}
            >
              ADD USER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
