import React, { useState } from "react";
import Header from "../../../components/header/Header";
import "./search.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import inventionData from "./../../../components/JSON/inventions.json";
import CheckBox from "../../../components/Checkbox";
import empty from "./../../../assets/empty_state.png";

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getFilteredInventions = () => {
    return inventionData.filter(
      (invention) =>
        (invention.Title_of_Invention.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
          invention.Inventors.some((inventor) =>
            inventor.toLowerCase().includes(searchTerm.toLowerCase())
          )) &&
        (selectedCampuses.length === 0 ||
          selectedCampuses.includes(invention.Campus)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(invention.Category))
    );
  };

  const handleCheckboxChange = (label, isChecked) => {
    if (label.includes("USTP")) {
      if (isChecked) {
        setSelectedCampuses([...selectedCampuses, label]);
      } else {
        setSelectedCampuses(
          selectedCampuses.filter((campus) => campus !== label)
        );
      }
    } else {
      if (isChecked) {
        setSelectedCategories([...selectedCategories, label]);
      } else {
        setSelectedCategories(
          selectedCategories.filter((category) => category !== label)
        );
      }
    }
  };

  const filteredInventions = getFilteredInventions();

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
          flexDirection: "column",
          marginTop: "10vh",
        }}
      >
        <h1 className="search-message">Search our available Inventions</h1>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="patent-container">
        <div className="filter-cotainer">
          <div className="filter-subcotainer campus">
            <h2 className="category-label">Campuses</h2>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Alubijid", isChecked)
              }
              label={"USTP Alubijid"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Cagayan de Oro Campus", isChecked)
              }
              label={"USTP Cagayan de Oro Campus"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Claveria", isChecked)
              }
              label={"USTP Claveria"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Balubal", isChecked)
              }
              label={"USTP Balubal"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Jasaan", isChecked)
              }
              label={"USTP Jasaan"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Oroquieta", isChecked)
              }
              label={"USTP Oroquieta"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Panaon", isChecked)
              }
              label={"USTP Panaon"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("USTP Vallanueva", isChecked)
              }
              label={"USTP Vallanueva"}
            ></CheckBox>
          </div>
          <div className="filter-subcotainer categories">
            <h2 className="category-label">Categories</h2>
            <CheckBox
              label={"Patent"}
              onChange={(isChecked) =>
                handleCheckboxChange("Patent", isChecked)
              }
            />
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("Industrial Design", isChecked)
              }
              label={"Industrial Design"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("Copyright", isChecked)
              }
              label={"Copyright"}
            ></CheckBox>
            <CheckBox
              onChange={(isChecked) =>
                handleCheckboxChange("Utility Model", isChecked)
              }
              label={"Utility Model"}
            ></CheckBox>
          </div>
        </div>
        <div className="archive-container">
          {filteredInventions.length > 0 ? (
            filteredInventions.map((invention, index) => (
              <div className="container-data" key={index}>
                <button className="title-btn">
                  <h1 className="title-css">{invention.Title_of_Invention}</h1>
                </button>
                <div className="row-line">
                  <div className="title-sub-container inventors">
                    <p className="title-sub inventors">Inventors:</p>
                  </div>
                  <p className="title-main inventors">
                    {invention.Inventors.join(", ")}
                  </p>
                </div>
                <div className="row-line">
                  <div className="title-sub-container Summary">
                    <p className="title-sub Summary">Summary:</p>
                  </div>
                  <p className="title-main Summary">{invention.Summary}</p>
                </div>
                <div className="row-line">
                  <div className="title-sub-container Campus">
                    <p className="title-sub Campus">Campus:</p>
                  </div>
                  <p className="title-main Campus">{invention.Campus}</p>
                </div>
                <div className="row-line">
                  <div className="title-sub-container Category">
                    <p className="title-sub Category">Category:</p>
                  </div>
                  <p className="title-main Category">{invention.Category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-con">
              <p>No matching inventions found.</p>
              <img src={empty}></img>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
