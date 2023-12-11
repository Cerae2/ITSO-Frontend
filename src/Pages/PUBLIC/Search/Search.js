import React from "react";
import Header from "../../../components/header/Header";
import "./search.css";
import SearchBar from "../../../components/SearchBar/SearchBar";

function Search(props) {
  return (
    <>
      <Header />
      <section className="banner">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="290 30 1140 340"
        >
          <path
            fill="#FFC000"
            fill-opacity="0.3"
            d="M0,288L40,261.3C80,235,160,181,240,160C320,139,400,149,480,160C560,171,640,181,720,176C800,171,880,149,960,117.3C1040,85,1120,43,1200,37.3C1280,32,1360,64,1400,80L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </section>
      <div className="title-search">
        <div>
          <h1 className="invention-title">Available Inventions of USTP</h1>
          <p className="sub-title">
            Explore a myriad of innovative inventions within the University
            Science and Technology Park (USTP).
          </p>
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <SearchBar></SearchBar>
      </div>
    </>
  );
}

export default Search;
