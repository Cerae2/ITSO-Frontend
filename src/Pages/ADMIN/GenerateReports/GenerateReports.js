import React, { useState, useEffect } from "react";
import Navbar from "../../../Navbar";
import empty from "./../../../assets/empty_state.png";
import { Link } from "react-router-dom";
import "./generatereps.css";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import * as XLSX from 'xlsx';


function GenerateReports(props) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(["Granted"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inventionData, setInventionData] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [campusLabel, setCampusLabel] = useState("Campus");
  const [departmentLabel, setDepartmentLabel] = useState("Department");
  const [selectedYear, setSelectedYear] = useState("Year");

  

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

  const handleDownload = () => {
    // Check if there is any filtered data
    if (slicedData.length ===  0) {
      // Show an alert if no data is found
      alert("No Matching Invention Found. Please adjust your filters.");
    } else {
      // Create a new array from slicedData where each object has the 'summary' attribute removed
      const dataWithoutSummary = slicedData.map(item => {
        const { summary, ...rest } = item; // Destructure and exclude 'summary'
        return rest; // Return the rest of the object
      });
  
      // Convert the new array to a worksheet
      const ws = XLSX.utils.json_to_sheet(dataWithoutSummary);
  
      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
      // Write the workbook to a file
      XLSX.writeFile(wb, "Report.xlsx");
    }
  };
  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCampusChange = (campus) => {
    // Set selected campus
    setSelectedCampus(campus);
    // Update the campus label
    setCampusLabel(campus.name);
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
    // Update the department label
    setDepartmentLabel(department);
  };
  
  

  const yearMenu = (
    <Menu style={{ width:  250, color: "black" }}>
      {[...Array(21).keys()].map((_, i) => {
        const year = new Date().getFullYear() - i;
        return (
          <Menu.Item key={year}>
            <a onClick={() => setSelectedYear(year)}>{year}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  
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
  
  const departmentDropdownText = selectedDepartment ? selectedDepartment : "department";
  
  const dropdownDepartmentMenu = (
    <Dropdown overlay={departmentMenu} trigger={["click"]}>
      <a
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
        style={{ color: "black", marginLeft: "20px" }}
      >
        {departmentLabel} <DownOutlined />
      </a>
    </Dropdown>
  );

  const filteredData = inventionData.filter((invention) => {
    const statusFilter =
      selectedStatus.length === 0 ||
      selectedStatus.includes(invention.upload_status);

    const searchTermFilter = invention.invention_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const campusFilter = !selectedCampus || invention.school_campus === selectedCampus.name;
  
    const departmentFilter = !selectedDepartment || invention.department_type === selectedDepartment;

    const yearFilter = !selectedYear || selectedYear ==="Year" || new Date(invention.uploaded_at).getFullYear() === Number(selectedYear);

      // Log relevant data for debugging
  console.log('Invention:', invention);
  console.log('Selected Campus:', selectedCampus);
  console.log('Selected Department:', selectedDepartment);
  console.log('Campus Filter:', campusFilter);
  console.log('Department Filter:', departmentFilter);

    return statusFilter && searchTermFilter && campusFilter && departmentFilter && yearFilter;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar></Navbar>
      <div className="reports-container">
        <div className="reports-sub">
          <div className="repots-input-container">
     

            <div style={{ position: "relative" }}>

            <div className="submenu-dropdown">
            <div className="reports-search-filter">
                <input
                  className="reports-input"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
            </div>    
            <button className="downlaodButton" onClick={handleDownload}>
             Download
            </button>

              <Dropdown overlay={yearMenu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  {selectedYear} <DownOutlined />
                </a>
              </Dropdown>

              <Dropdown overlay={campusMenu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                 
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  {campusLabel} <DownOutlined />
                </a>
              </Dropdown>
              <Dropdown overlay={departmentMenu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  {departmentLabel}<DownOutlined />
                </a>
              </Dropdown>   

            </div>
          </div>
          </div>
          {slicedData.length === 0 ? (
            <div className="empty-state">
              <img src={empty} alt="Empty State" />
              <p>No matching inventions found.</p>
            </div>
          ) : (
          <div classname='reports'>
            <table classname="reports-table">
              <thead>
                <tr className="width-tr">
                  <th className="style-th">Invention Title</th>
                  <th className="style-th">Status</th>
                  <th className="style-th">Intelectual Property (IP) Type</th>
                  <th className="style-th">Authors</th>
                  <th className="style-th">Department</th>
                  <th className="style-th">Campus</th>
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
                    <td>{index.form_type}</td>
                    <td>{index.authors}</td>
                    <td>{index.department_type}</td>
                    <td>{index.school_campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
