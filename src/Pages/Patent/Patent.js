import React from 'react';
import myImage2 from '../pictures/ustp_logo.jpg';
import "./Patent.css";

function Patent() {

return (
    <div className="frontpageStyle">
      <div className="textContainerStyle">
        <h1>University of Science and Technology of Southern Mindanao</h1>
      </div>
      <div className="logoStyle">
        <img
          src={myImage2}
          alt="School Logo"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="SchoolContainer">
       <h1>Patent/Intellectual Property</h1>
        </div>
      <div className="whiteContainer">
       <p>diri ibutang ang about sa patent </p>
      </div>
      </div>
)
};
export default Patent;