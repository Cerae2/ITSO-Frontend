import React, { useState, useEffect } from "react";
import Header from "../../../components/header/Header";
import "./search.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import inventionData from "./../../../components/JSON/inventions.json";
import CheckBox from "../../../components/Checkbox";
import empty from "./../../../assets/empty_state.png";

function Search(props) {
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCampusChange = (campus, checked) => {
    if (checked) {
      setSelectedCampuses([...selectedCampuses, campus]);
    } else {
      const newSelectedCampuses = selectedCampuses.filter((c) => c !== campus);
      setSelectedCampuses(newSelectedCampuses);
    }
  };

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const newSelectedCategories = selectedCategories.filter(
        (c) => c !== category
      );
      setSelectedCategories(newSelectedCategories);
    }
  };

  const handleResetFilters = () => {
    setSelectedCampuses([]);
    setSelectedCategories([]);
    setSearchTerm("");
  };

  const filteredData = inventionData.filter((invention) => {
    const campusFilter =
      selectedCampuses.length === 0 ||
      selectedCampuses.includes(invention.Campus);

    const categoryFilter =
      selectedCategories.length === 0 ||
      selectedCategories.includes(invention.Category);

    const searchTermFilter =
      invention.Title_of_Invention.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

    console.log(
      `Invention: ${invention.Title_of_Invention}, Campus: ${invention.Campus}, Category: ${invention.Category}, Campus Filter: ${campusFilter}, Category Filter: ${categoryFilter}, Search Term Filter: ${searchTermFilter}`
    );

    return campusFilter && categoryFilter && searchTermFilter;
  });

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
              key={selectedCampuses.includes("USTP Alubijid")}
              label={"USTP Alubijid"}
              checked={selectedCampuses.includes("USTP Alubijid")}
              onChange={(checked) =>
                handleCampusChange("USTP Alubijid", checked)
              }
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Cagayan de Oro")}
              label={"USTP Cagayan de Oro"}
              onChange={(checked) =>
                handleCampusChange("USTP Cagayan de Oro", checked)
              }
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Claveria")}
              label={"USTP Claveria"}
              onChange={(checked) =>
                handleCampusChange("USTP Claveria", checked)
              }
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Balubal")}
              label={"USTP Balubal"}
              onChange={(checked) =>
                handleCampusChange("USTP Balubal", checked)
              }
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Jasaan")}
              label={"USTP Jasaan"}
              onChange={(checked) => handleCampusChange("USTP Jasaan", checked)}
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Oroquieta")}
              label={"USTP Oroquieta"}
              onChange={(checked) =>
                handleCampusChange("USTP Oroquieta", checked)
              }
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Panaon")}
              label={"USTP Panaon"}
              onChange={(checked) => handleCampusChange("USTP Panaon", checked)}
            />
            <CheckBox
              checked={selectedCampuses.includes("USTP Vallanueva")}
              label={"USTP Vallanueva"}
              onChange={(checked) =>
                handleCampusChange("USTP Vallanueva", checked)
              }
            />
          </div>

          <div className="filter-subcotainer categories">
            <h2 className="category-label">Categories</h2>
            <CheckBox
              checked={selectedCategories.includes("Patent")}
              label={"Patent"}
              onChange={(checked) => handleCategoryChange("Patent", checked)}
            />
            <CheckBox
              checked={selectedCategories.includes("Industrial Design")}
              label={"Industrial Design"}
              onChange={(checked) =>
                handleCategoryChange("Industrial Design", checked)
              }
            />
            <CheckBox
              checked={selectedCategories.includes("Copyright")}
              label={"Copyright"}
              onChange={(checked) => handleCategoryChange("Copyright", checked)}
            />
            <CheckBox
              checked={selectedCategories.includes("Utility Model")}
              label={"Utility Model"}
              onChange={(checked) =>
                handleCategoryChange("Utility Model", checked)
              }
            />
          </div>
        </div>
        <div className="archive-container">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <img src={empty} alt="Empty State" />
              <p>No matching inventions found.</p>
            </div>
          ) : (
            filteredData.map((invention) => (
              <>
                <div className="container-data">
                  <button className="title-btn">
                    <h1 className="title-css">
                      {invention.Title_of_Invention}
                    </h1>
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
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
