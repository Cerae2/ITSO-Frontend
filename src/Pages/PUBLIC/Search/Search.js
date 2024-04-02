import React, { useState, useEffect } from "react";
import Header from "../../../components/header/Header";
import "./search.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CheckBox from "../../../components/Checkbox";
import empty from "./../../../assets/empty_state.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../../components/footer/footer";
import tpco from "../../../assets/tpco.png";
import dost from "../../../assets/dost.jpg";
import dostlogo from "../../../assets/dostlogo.jpg";
import oro from "../../../assets/oro.jpg";
import orobest from "../../../assets/orobest.png";
import dti from "../../../assets/dti.jpg";
import rti from "../../../assets/rti.jpg";
import usaid from "../../../assets/usaid.jpg";
import food from "../../../assets/food.jpg";


function Search(props) {
 const [selectedCategories, setSelectedCategories] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [inventionData, setInventionData] = useState([]);
 const navigate = useNavigate();
 const [showFilingInfo, setShowFilingInfo] = useState({
  "Filing Number": false,
  "Filing Date": false,
  "Publication Number": false,
  "Publication Date": false,
  "Technology": false,
  "Registration Number": false,
  "Application Type": false,
  "IP Type": false,
 });
 const [selectedOptions, setSelectedOptions] = useState({
  "IP Type": "",
 });
 

 useEffect(() => {
    axios.get('uploadforms/forms/', {
      params: {
        select_invention: false,
        is_admin: true
      },
    }).then((response) => {
      const filteredData = response.data.filter(item => item.upload_status === 'Granted');
      setInventionData(filteredData);
    });
 }, []);

 

 
 const handleCategoryChange = (category, checked) => {
  if (checked) {
     setSelectedCategories([...selectedCategories, category]);
     if (category === "IP Type") {
       setSelectedOptions(prevState => ({ ...prevState, [category]: "" }));
     }
  } else {
     const newSelectedCategories = selectedCategories.filter(
       (c) => c !== category
     );
     setSelectedCategories(newSelectedCategories);
     if ( category === "IP Type") {
       setSelectedOptions(prevState => ({ ...prevState, [category]: "" }));
     }
  }
 };

 const handleResetFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
 };

 const filteredData = inventionData.filter((invention) => {
    const categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(invention.form_type);
    const searchTermFilter = invention.invention_title.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryFilter && searchTermFilter;
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
          <h1 className="invention-title">Secure exclusive rights to your inventions</h1>
          <h2 className="sub-title">
            Apply Now!
          </h2>
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
    <div className="TPCO-container">
    <img className="tpco" src={tpco}></img></div>
    <div className="aboutus-container"><h1>About us</h1></div>
    <p className="aboutus-text">The Technology Promotions and Commercialization Office (TPCO) serves 
    as the interface between the talent and technology housed in the academic institute, the industry, 
    and the community; fostering new relationships and partnerships resulting in life-changing innovations, 
    enhanced productivity and ingenious discoveries that amends the human condition. The TPCO ambitiously aspires 
    to be in the innovation map, visibly interfacing with stakeholders and creating a significant mark in fostering 
    innovations not just in the academe but in the whole innovation community. 
    At the TPCO, we contribute towards nurturing an empowered innovation ecosystem that promotes entrepreneurship 
    and commercialization of technologies to contribute to the economic and social development of the community it serves. 
    As part of the university’s commitment in delivering its Strategic Directional Areas, the TPCO was established and approved 
    by the Board of Regents in May 2020 amidst the challenges of the COVID-19 pandemic in the country. 
    The office was officially launched to the public in August 2020 and is strategically poised right at 
    the forefront of the university making it accessible for stakeholders.</p>  

    <div className="ourpartner-container"><h1>Our Partners</h1></div>
    <p className="ourpartner-text">We thrive on partnerships and collaboration to advance our mission and to also help build 
      the innovation ecosystem in our region.</p>
      <div className="main-container">
   
        <div className="dost-container">
            <a href="https://region10.dost.gov.ph/about-us" target="_blank" rel="noopener noreferrer">
                <img className="dost" src={dost}></img>
            </a>
        </div>
        <div className="dostlogo-container">
            <a href="https://pcieerd.dost.gov.ph/" target="_blank" rel="noopener noreferrer">
                <img className="dostlogo" src={dostlogo}></img>
            </a>
        </div>
        <div className="oro-container">
            <a href="https://issuu.com/orobestinnovation/docs/final_2022_oro_chamber_annual_report/s/18035663" target="_blank" rel="noopener noreferrer">
                <img className="oro" src={oro}></img>
            </a>
        </div>
        <div className="orobest-container">
            <a href="https://www.facebook.com/profile.php?id=100064762540373" target="_blank" rel="noopener noreferrer">
                <img className="orobest" src={orobest}></img>
            </a>
        </div>
   
    
        <div className="dti-container">
            <a href="https://www.facebook.com/DTI.Region10/" target="_blank" rel="noopener noreferrer">
                <img className="dti" src={dti}>
                </img>
            </a>
        </div>
        
        <div className="rti-container">
            <a href="https://www.rti.org/" target="_blank" rel="noopener noreferrer">
                <img className="rti" src={rti}></img>
            </a>
        </div>
        <div className="food-container">
            <a href="https://www.facebook.com/nmficustpcdo/" target="_blank" rel="noopener noreferrer">
                <img className="food" src={food}></img>
            </a>
        </div>
        <div className="usaid-container">
            <a href="https://www.usaid.gov/" target="_blank" rel="noopener noreferrer">
                <img className="usaid" src={usaid}></img>
            </a>
        </div>
    </div>

        <h1 id="search-message" className="search-message">Search our available Technologies</h1>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="patent-container">
        <div className="filter-cotainer">
          <div className="filter-subcotainer campus">
          <h2 className="category-label">Select Categories</h2>
{['Title', 'Authors', 'Filing Date', 'Publication Date', 'Publication No.', 'Registration Date', 'Registration No', 'IP Type'].map((category, index) => (
 <div key={index}>
    <CheckBox
      label={category}
      checked={selectedCategories.includes(category)}
      onChange={(checked) => {
        handleCategoryChange(category, checked);
        setShowFilingInfo(prevState => ({ ...prevState, [category]: checked }));
      }}
    />
    {showFilingInfo[category] && (
      <div style={{ marginLeft: '10px' }}>
        <label htmlFor={category.replace(/\s+/g, '')}>{category}:</label>
        {category === 'IP Type' ? (
          <select
            id={category.replace(/\s+/g, '')}
            name={category}
            onChange={(e) => setSelectedOptions({ ...selectedOptions, [category]: e.target.value })}
          >
            <option value="">Select IP Type</option>
            <option value="Patent">Patent</option>
            <option value="Industrial Design">Industrial Design</option>
            <option value="Utility Model">Utility Model</option>
            <option value="Trademark">Trademark</option>
            <option value="Copyright">Copyright</option>
            {/* Add more options as needed */}
          </select>
        ) : (
          <input
            type={category === 'Filing Date' || category === 'Publication Date' || category === 'Registration Date' ? "date" : "text"}
            id={category.replace(/\s+/g, '')}
            placeholder={`Enter ${category}`}
            name={category}
          />
        )}
      </div>
    )}
 </div>
))}     
        </div>
        
    
            </div>
        <div className="archive-container">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <img src={empty} alt="Empty State" />
              <p>No matching technologies found.</p>
            </div>
          ) : (
            filteredData.map((invention) => (
              <>
                <div className="container-data" >
                  <Link
                    to={`/detailsPage/${invention.id}`}
                    className="title-btn"
                  >
                    <h1 className="title-css">
                      {invention.invention_title}
                    </h1>
                  </Link>
                  <div className="row-line">
                    <div className="title-sub-container inventors">
                      <p className="title-sub inventors">Inventors:</p>
                    </div>
                    <p className="title-main inventors">
                      {invention.authors}
                    </p>
                  </div>
                  <div className="row-line" >
                    <div className="title-sub-container Summary" >
                      <p className="title-sub Summary">Summary:</p>
                    </div>
                    <p className="title-main Summary" style={{wordBreak:'break-word'}}>{invention.summary}</p>
                  </div>
                  <div className="row-line">
                    <div className="title-sub-container Campus">
                      <p className="title-sub Campus">Campus:</p>
                    </div>
                    <p className="title-main Campus">{invention.school_campus}</p>
                  </div>
                  <div className="row-line">
                    <div className="title-sub-container Category">
                      <p className="title-sub Category">Category:</p>
                    </div>
                    <p className="title-main Category">{invention.form_type}</p>
                    
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Search;
