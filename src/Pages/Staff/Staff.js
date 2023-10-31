import React from 'react';
import myImage2 from '../pictures/ustp_logo.jpg';
import "./Staff.css";

function Staff() {

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
      </div>
)
};
export default Staff;