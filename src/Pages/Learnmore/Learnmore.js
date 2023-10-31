import React from 'react';
import myImage2 from '../pictures/ustp_logo.jpg';
import "./Learnmore.css";
import { Link } from 'react-router-dom';


function Learnmore() {

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
        <div className="LmContainer">
        {/* Add content for the "Learnmore" container here */}
        <h2>Learn More About Us</h2>
        <div className="yellowContainer">
        <div className="buttonContainer">
        <Link to="/School">
            <button>School</button>
            </Link>
            <Link to="/Staff">
            <button>Staff</button>
            </Link>
            <Link to="/Patent">
            <button>Patent</button>
            </Link>
            <Link to="/Policy">
            <button>Policy statement</button>
            </Link>
            <Link to="/AboutUs">
            <button>About Us</button>
            </Link>
            {/* Add more buttons as needed */}
          </div>

        </div>
      
      
      </div>
    </div>
  );
}

export default Learnmore;
