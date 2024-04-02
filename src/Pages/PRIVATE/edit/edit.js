import React, { useState } from "react";
import Navbar from "../../../Navbar";
import './edit.css'; // Import the CSS file

function Edit(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
};
    return (
      <div>
      <Navbar></Navbar>
      {/* Sidebar */}
      <div className="sidebar-container">
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
          <button className="profile-button">Account Settings</button>
          <button className="profile-button">Help</button>
        </div>
      </div>
    </div>
 );
}

export default Edit;