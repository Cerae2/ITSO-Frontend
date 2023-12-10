import React from "react";
import logo from "./../../../assets/logo-blue.jpg";
import bg from "./../../../assets/building.jpg";

function Home(props) {
  return (
    <div className="home-container">
      <div className="header-container-home">
        <img className="logo-blue" src={logo}></img>
        <div className="title-container-home">
          <p className="uni-title">UNIVERSITY OF SCIENCE AND TECHNOLOGY</p>
          <p className="uni-title">OF SOUTHERN PHILIPPINES</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
