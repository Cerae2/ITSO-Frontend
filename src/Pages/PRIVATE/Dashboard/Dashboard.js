import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../Navbar";
import "./dashboard.css";
// import inventionData from "./../../../components/JSON/inventions.json";
import { Link } from "react-router-dom";
import CheckBox from "../../../components/Checkbox";
import empty from "./../../../assets/empty_state.png";

function Dashboard(props) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [inventionData, setInventionData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    axios.get('uploadforms/forms/',{
      params: {
        select_invention: false,
        is_admin: false
      },
    headers: {
      Authorization:  `Token ${authToken}`,
      "Content-Type": 'application/json'
    }
    }).then((response) => {
      console.log(response.data)
      setInventionData(response.data)
    })
  }, [])

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

  const filteredData = inventionData.filter((invention) => {
    const statusFilter =
      selectedStatus.length === 0 || selectedStatus.includes(invention.Status);

    const searchTermFilter =
      invention.invention_title.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) 
      // invention.Inventors.some((author) =>
      //   author.toLowerCase().includes(searchTerm.toLowerCase())
      // );

    return statusFilter && searchTermFilter;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="dash-container">
          <div className="dash-sub">
            <div className="dash-input-container">
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  className="dash-input"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
              </div>

              <div className="dash-checklist-con">
                <CheckBox
                  checked={selectedStatus.includes("Pending")}
                  onChange={(checked) => handleStatusChange("Pending", checked)}
                  label={"Pending"}
                ></CheckBox>
                <CheckBox
                  checked={selectedStatus.includes("Approved")}
                  onChange={(checked) =>
                    handleStatusChange("Approved", checked)
                  }
                  label={"Approved"}
                ></CheckBox>
                <CheckBox
                  checked={selectedStatus.includes("Under Review")}
                  onChange={(checked) =>
                    handleStatusChange("Under Review", checked)
                  }
                  label={"Under Review"}
                ></CheckBox>
                <CheckBox
                  checked={selectedStatus.includes("Rejected")}
                  onChange={(checked) =>
                    handleStatusChange("Rejected", checked)
                  }
                  label={"Rejected"}
                ></CheckBox>
              </div>
            </div>
            {slicedData.length === 0 ? (
              <div className="empty-state">
                <img src={empty} alt="Empty State" />
                <p>No matching inventions found.</p>
              </div>
            ) : (
              slicedData.map((index) => (
                <div className="inventory-dash-con">
                  <div className="inventory-subcon">
                    <table>
                      <tr>
                        <td className="dash-title">Inventions Title</td>
                        <td className="dash-data title">
                          <Link
                            to={`/detailsDashPage/${index.id}`}
                            style={{
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            <p className="link-dash">
                              {index.invention_title}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="dash-title">Status</td>
                        <td className="dash-data">{index.upload_status}</td>
                      </tr>
                      <tr>
                        <td className="dash-title">{index.form_type}</td>
                        <td className="dash-data">
                          Intelectual Property (IP) Type
                        </td>
                      </tr>
                      <tr>
                        <td className="dash-title">Authors</td>
                        <td className="dash-data">{index.authors}</td>
                      </tr>
                      <tr>
                        <td className="dash-title">Department</td>
                        <td className="dash-data">{index.department_type}</td>
                      </tr>
                      <tr>
                        <td className="dash-title">Campus</td>
                        <td className="dash-data">{index.school_campus}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              ))
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
    </>
  );
}

export default Dashboard;
