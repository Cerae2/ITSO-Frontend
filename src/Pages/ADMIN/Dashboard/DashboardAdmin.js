import React, { useState } from "react";
import Navbar from "../../../Navbar";
import empty from "./../../../assets/empty_state.png";
import CheckBox from "../../../components/Checkbox";
import { Link } from "react-router-dom";
import inventionData from "./../../../components/JSON/inventions.json";
import "./dashadmin.css";

function DashboardAdmin(props) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      invention.Title_of_Invention.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      invention.Inventors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return statusFilter && searchTermFilter;
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

            <div className="dash-checklist-con">
              <div>
                <CheckBox
                  checked={selectedStatus.includes("Pending")}
                  onChange={(checked) => handleStatusChange("Pending", checked)}
                  label={"Pending"}
                ></CheckBox>
              </div>
              <div>
                <CheckBox
                  checked={selectedStatus.includes("Approved")}
                  onChange={(checked) =>
                    handleStatusChange("Approved", checked)
                  }
                  label={"Approved"}
                ></CheckBox>
              </div>
              <div>
                <CheckBox
                  checked={selectedStatus.includes("Under Review")}
                  onChange={(checked) =>
                    handleStatusChange("Under Review", checked)
                  }
                  label={"Under Review"}
                ></CheckBox>
              </div>
              <div>
                <CheckBox
                  checked={selectedStatus.includes("Rejected")}
                  onChange={(checked) =>
                    handleStatusChange("Rejected", checked)
                  }
                  label={"Rejected"}
                ></CheckBox>
              </div>
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
                          to={`/dashboardadmindetail/${index.id}`}
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                          }}
                        >
                          <p className="link-dash">
                            {index.Title_of_Invention}
                          </p>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="dash-title">Status</td>
                      <td className="dash-data">{index.Status}</td>
                    </tr>
                    <tr>
                      <td className="dash-title">{index.Category}</td>
                      <td className="dash-data">
                        Intelectual Property (IP) Type
                      </td>
                    </tr>
                    <tr>
                      <td className="dash-title">Authors</td>
                      <td className="dash-data">{index.Inventors}</td>
                    </tr>
                    <tr>
                      <td className="dash-title">Department</td>
                      <td className="dash-data">{index.Department}</td>
                    </tr>
                    <tr>
                      <td className="dash-title">Campus</td>
                      <td className="dash-data">{index.Campus}</td>
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
  );
}

export default DashboardAdmin;
