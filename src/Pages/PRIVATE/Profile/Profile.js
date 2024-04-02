import React, { useState } from "react";
import Navbar from "../../../Navbar";
import { Link } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

function Profile(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contactNo, setContactNo] = useState("");
  

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
 };
 const handleFirstNameChange = (event) => {
  setFirstName(event.target.value);
};
const handleMiddleNameChange = (event) => {
  setMiddleName(event.target.value);
};
const handleEmailChange = (event) => {
  setEmail(event.target.value);
};
const handleBirthdateChange = (event) => {
  setBirthdate(event.target.value);
};






  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
};
    return (
     <div>
      <Navbar></Navbar>
      */
     /* <div className="sidebar-container">
        <label htmlFor="imageUpload" className="file-upload-label">Select Image</label>
        <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        {selectedImage ? (
            <img src={selectedImage} alt="Profile" className="profile-image" />
        ) : (
            <label htmlFor="imageUpload" className="profile-image-label">
             
            </label>
        )}
         <div className="buttons-container">
         <button className="profile-button">Edit Profile</button>
         <a href="/edit" className="profile-button">
          <button type="button">Account Settings</button>
          </a>
          <button className="profile-button">Help</button>
        </div>
       </div>
        <div class="flex-container">
       < div class="profile-content">
          <h3>My Information</h3>
          <div className="textfield-container">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <label htmlFor="MiddleName">Middle Name:</label>
          <input
            type="text"
            id="MiddleName"
            value={MiddleName}
            onChange={handleMiddleNameChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onchange={handleEmailChange}
            />
          
        </div>
      </div>
    </div>
    </div>
 );
}

export default Profile;