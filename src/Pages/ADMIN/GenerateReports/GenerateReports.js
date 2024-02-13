import React, { useState, useEffect } from "react";
import Navbar from "../../../Navbar";
import empty from "./../../../assets/empty_state.png";
import { Link } from "react-router-dom";
import "./generatereps.css";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";


function GenerateReports(props) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(["Approved"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inventionData, setInventionData] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axios
      .get("uploadforms/forms/", {
        params: {
          select_invention: false,
          is_admin: true,
        },
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setInventionData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invention data:", error);
      });

    // Fetch campus data
    axios
      .get("http://localhost:8000/api/v1/accounts/campuses/")
      .then((response) => {
        const campuses = response.data.campuses.filter(Boolean); // Filters out falsy values, including null
        setCampuses(campuses);
        console.log('Campuses:', campuses);
      })
      .catch((error) => {
        console.error("Error fetching campuses:", error);
      });
  }, []);

  const handleStatusChange = (status, checked) => {
    if (checked) {
      setSelectedStatus([...selectedStatus, status]);
    } else {
      const newSelectedStatus = selectedStatus.filter((c) => c !== status);
      setSelectedStatus(newSelectedStatus);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCampusChange = (campus) => {
    // Set selected campus
    setSelectedCampus(campus);
  
    // Encode the campus name before appending it to the URL
    const encodedCampus = encodeURIComponent(campus.name);
  
    // Fetch departments for the selected campus
    axios
      .get(`http://localhost:8000/api/v1/accounts/departments/by_campus/?campus=${encodedCampus}`)
      .then((response) => {
        const { departments } = response.data;
        setDepartments(departments);
  
        // Log the selected campus and the departments retrieved
        console.log('Selected Campus:', campus);
        console.log('Departments:', departments);
        
        // Reset selected department when a new campus is selected
        setSelectedDepartment(null);
      })
      .catch((error) => {
        console.error(`Error fetching departments for ${campus.name}:`, error);
      });
  };

  const handleDepartmentChange = (department) => {
    // Set the selected department
    setSelectedDepartment(department);
  };


  
  

  const campusMenu = (
    <Menu style={{ width:  250, color: "black" }}>
      {campuses.filter(Boolean).map((campus, index) => (
        <Menu.Item key={index}>
          <a onClick={() => handleCampusChange({ id: index, name: campus })}>{campus}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const departmentMenu = (
    <Menu style={{ width:  250, color: "black" }}>
      {departments.map((department, index) => (
        <Menu.Item key={index}>
          <a onClick={() => handleDepartmentChange(department)}>{department}</a>
        </Menu.Item>
      ))}
    </Menu>
  );



  const filteredData = inventionData.filter((invention) => {
    const statusFilter =
      selectedStatus.length ===  0 ||
      selectedStatus.includes(invention.upload_status);
  
    const searchTermFilter = invention.invention_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    const campusFilter = !selectedCampus || invention.school_campus === selectedCampus.name;
  
    const departmentFilter = !selectedDepartment || invention.department_type === selectedDepartment;
  
    // Check if the upload was made within the selected year
  
    // Log relevant data for debugging
    console.log('Invention:', invention);
    console.log('Selected Campus:', selectedCampus);
    console.log('Selected Department:', selectedDepartment);
    console.log('Campus Filter:', campusFilter);
    console.log('Department Filter:', departmentFilter);
  
    return statusFilter && searchTermFilter && campusFilter && departmentFilter;
  });
  

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar></Navbar>
      <div className="dash-container">
        <div className="dash-sub">
          <div className="dash-input-container">
            <div className="dashadmin-search-filter">
              <input
                className="dash-input"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
            </div>

            <div style={{ position: "relative" }}>

              <Dropdown overlay={campusMenu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                 
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  Campus <DownOutlined />
                </a>
              </Dropdown>

              <Dropdown overlay={departmentMenu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  Department<DownOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
          {slicedData.length === 0 ? (
            <div className="empty-state">
              <img src={empty} alt="Empty State" />
              <p>No matching inventions found.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Invention Title</th>
                  <th>Status</th>
                  <th>Intelectual Property (IP) Type</th>
                  <th>Authors</th>
                  <th>Department</th>
                  <th>Campus</th>
                </tr>
              </thead>
              <tbody>
                {slicedData.map((index) => (
                  <tr key={index.id}>
                    <td>
                      <Link
                        to={`/dashboardadmindetail/${index.id}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        {index.invention_title}
                      </Link>
                    </td>
                    <td>{index.upload_status}</td>
                    <td>Intelectual Property (IP) Type</td>
                    <td>{index.authors}</td>
                    <td>{index.department_type}</td>
                    <td>{index.school_campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={currentPage === i ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateReports;
