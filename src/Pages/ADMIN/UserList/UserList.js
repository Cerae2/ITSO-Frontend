import React, { useState, useEffect } from "react";
import Navbar from "../../../Navbar";
import "./userliist.css";
import { Button, Typography } from "@mui/material";
import userlistData from "./../../../components/JSON/userlist.json";
import nothing from "./../../../assets/nothing.png";

function UserList(props) {
  const [selectedCampus, setSelectedCampus] = useState("Cagayan de Oro");
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(17);
  const handleCampusChange = (campus) => {
    setSelectedCampus(campus);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUserList = userlistData.filter(
    (user) => user["School Campus"] === selectedCampus
  );

  const totalPages = Math.ceil(filteredUserList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleUserList = filteredUserList.slice(startIndex, endIndex);

  useEffect(() => {
    const handleResize = () => {
      setButtonWidth(window.innerWidth <= 600 ? 10 : 17);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="nav-bar-cont">
        <Navbar></Navbar>
      </div>
      <div className="userlist-cont">
        <div className="btn-cont-userlist">
          {[
            "USTP Cagayan de Oro",
            "USTP Claveria",
            "USTP Balubal",
            "USTP Jasaan",
            "USTP Oroquieta",
            "USTP Panaon",
            "USTP Villanueva",
          ].map((campus) => (
            <Button
              key={campus}
              style={{
                fontSize: buttonWidth,
                backgroundColor:
                  selectedCampus === campus ? "#FFC000" : "#201b51",
                color: selectedCampus === campus ? "#201b51" : "#FFC000",
              }}
              onClick={() => handleCampusChange(campus)}
            >
              {campus}
            </Button>
          ))}
        </div>
        <div className="table-cont-userlist">
          {visibleUserList.length > 0 ? (
            <>
              <table className="userlist-table">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Birth Date</th>
                  <th>Campus</th>
                  <th>College</th>
                  <th>Email</th>
                  <th>Contact No.</th>
                </tr>
                {visibleUserList.map((index) => (
                  <tr key={index.id}>
                    <td>{index.id}</td>
                    <td>
                      {index["First Name"] +
                        " " +
                        index["Middle Name"] +
                        " " +
                        index["Last Name"]}
                    </td>
                    <td>{index["Birth Date"]}</td>
                    <td>{index["School Campus"]}</td>
                    <td>{index.College}</td>
                    <td>{index.Email}</td>
                    <td>{index["Contact no"]}</td>
                  </tr>
                ))}
              </table>
              <div className="pagination userlist-page">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <Typography variant="body1" color="textSecondary">
              <div className="nothing-con">
                <img className="nothing-img" src={nothing} alt="Nothing" />
                <p className="nothing-p">No user registered in this campus.</p>
              </div>
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default UserList;
